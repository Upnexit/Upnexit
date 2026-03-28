import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GMAIL_USER = Deno.env.get('GMAIL_USER');
    const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD');
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      throw new Error('Gmail credentials not configured');
    }

    const { name, email, phone, message, service } = await req.json();

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#16a34a,#15803d);padding:30px 24px;border-radius:12px 12px 0 0;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">📩 নতুন কনসালটেশন রিকোয়েস্ট</h1>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:12px 16px;font-weight:600;color:#374151;background:#f9fafb;border-radius:8px 0 0 0;width:100px;">বিষয়</td><td style="padding:12px 16px;color:#1f2937;background:#f9fafb;border-radius:0 8px 0 0;">${service}</td></tr>
            <tr><td style="padding:12px 16px;font-weight:600;color:#374151;">নাম</td><td style="padding:12px 16px;color:#1f2937;">${name}</td></tr>
            <tr><td style="padding:12px 16px;font-weight:600;color:#374151;background:#f9fafb;">ইমেইল</td><td style="padding:12px 16px;color:#1f2937;background:#f9fafb;">${email}</td></tr>
            <tr><td style="padding:12px 16px;font-weight:600;color:#374151;">ফোন</td><td style="padding:12px 16px;color:#1f2937;">${phone || 'দেওয়া হয়নি'}</td></tr>
          </table>
          <div style="margin-top:20px;padding:18px;background:#f0fdf4;border-radius:10px;border-left:4px solid #16a34a;">
            <p style="font-weight:600;color:#374151;margin:0 0 8px;font-size:14px;">বার্তা:</p>
            <p style="margin:0;white-space:pre-wrap;color:#1f2937;line-height:1.6;font-size:14px;">${message}</p>
          </div>
        </div>
        <div style="background:#f9fafb;padding:16px 24px;border-radius:0 0 12px 12px;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="color:#9ca3af;font-size:11px;margin:0;">UpnexIT Consultation System — © ${new Date().getFullYear()}</p>
        </div>
      </div>
    `;

    const client = new SmtpClient();
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: GMAIL_USER,
      password: GMAIL_APP_PASSWORD,
    });

    await client.send({
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: `নতুন কনসালটেশন রিকোয়েস্ট: ${service}`,
      content: "This email requires HTML support.",
      html: html,
      headers: {
        "Reply-To": email,
      },
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email send error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured');

    const { name, email, phone, message, service } = await req.json();

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#16a34a;border-bottom:2px solid #16a34a;padding-bottom:10px;">📩 নতুন কনসালটেশন রিকোয়েস্ট</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;font-weight:bold;color:#555;">বিষয়:</td><td style="padding:8px;">${service}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;color:#555;">নাম:</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">ইমেইল:</td><td style="padding:8px;">${email}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;color:#555;">ফোন:</td><td style="padding:8px;">${phone || 'দেওয়া হয়নি'}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f0fdf4;border-radius:8px;">
          <p style="font-weight:bold;color:#555;margin:0 0 8px;">বার্তা:</p>
          <p style="margin:0;white-space:pre-wrap;">${message}</p>
        </div>
        <p style="margin-top:20px;color:#999;font-size:12px;">— UpnexIT Consultation System</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'UpnexIT <onboarding@resend.dev>',
        to: ['upnex360@gmail.com'],
        subject: `নতুন কনসালটেশন রিকোয়েস্ট: ${service}`,
        html,
        reply_to: email,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);

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

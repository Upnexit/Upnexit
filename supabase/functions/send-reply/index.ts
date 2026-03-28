import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
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
    // Validate JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const userId = claimsData.claims.sub;
    const { data: roleData } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Forbidden: admin only' }), { status: 403, headers: corsHeaders });
    }

    const GMAIL_USER = Deno.env.get('GMAIL_USER');
    const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD');
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      throw new Error('Gmail credentials not configured');
    }

    const { to, subject, body, demoLink } = await req.json();

    if (!to || !body) {
      return new Response(JSON.stringify({ error: 'Missing required fields: to, body' }), { status: 400, headers: corsHeaders });
    }

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#16a34a,#15803d);padding:30px 24px;border-radius:12px 12px 0 0;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">UpnexIT</h1>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px;">আপনার ডিজিটাল সমাধানের অংশীদার</p>
        </div>
        <div style="padding:28px 24px;background:#ffffff;">
          <p style="margin:0 0 20px;white-space:pre-wrap;line-height:1.7;font-size:15px;color:#1f2937;">${body}</p>
          ${demoLink ? `
          <div style="text-align:center;margin:28px 0;">
            <a href="${demoLink}" style="display:inline-block;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;box-shadow:0 4px 14px rgba(22,163,74,0.3);">
              🔗 ডেমো দেখুন
            </a>
            <p style="margin-top:10px;color:#9ca3af;font-size:12px;">${demoLink}</p>
          </div>
          ` : ''}
        </div>
        <div style="background:#f9fafb;padding:20px 24px;border-radius:0 0 12px 12px;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="color:#6b7280;font-size:12px;margin:0;">
            © ${new Date().getFullYear()} UpnexIT — Software Solutions<br/>
            📧 ${GMAIL_USER}
          </p>
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
      to: to,
      subject: subject || 'UpnexIT থেকে বার্তা',
      content: "This email requires HTML support.",
      html: html,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Reply send error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

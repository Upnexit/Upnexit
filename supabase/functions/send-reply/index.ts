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

    const { to, subject, body, demoLink } = await req.json();

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="text-align:center;margin-bottom:20px;">
          <h2 style="color:#16a34a;margin:0;">UpnexIT</h2>
          <p style="color:#888;margin:4px 0;">Software Solutions</p>
        </div>
        <div style="padding:16px;background:#f9fafb;border-radius:12px;margin-bottom:16px;">
          <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${body}</p>
        </div>
        ${demoLink ? `
        <div style="text-align:center;margin:24px 0;">
          <a href="${demoLink}" style="display:inline-block;background:#16a34a;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">
            🔗 ডেমো দেখুন
          </a>
          <p style="margin-top:8px;color:#888;font-size:13px;">${demoLink}</p>
        </div>
        ` : ''}
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
        <p style="color:#999;font-size:12px;text-align:center;">
          UpnexIT — আপনার ডিজিটাল সমাধানের অংশীদার<br/>
          📧 upnex360@gmail.com
        </p>
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
        to: [to],
        subject: subject || 'UpnexIT থেকে বার্তা',
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);

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

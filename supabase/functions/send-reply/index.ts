import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6.9.10";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const { data: roleData } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Forbidden: admin only' }), { status: 403, headers: corsHeaders });
    }

    const GMAIL_USER = Deno.env.get('GMAIL_USER');
    const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD');
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) throw new Error('Gmail credentials not configured');

    const { to, subject, body, demoLink } = await req.json();
    if (!to || !body) {
      return new Response(JSON.stringify({ error: 'Missing required fields: to, body' }), { status: 400, headers: corsHeaders });
    }

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#16a34a 0%,#0d9488 50%,#0891b2 100%);padding:36px 32px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:800;letter-spacing:-0.5px;">UpnexIT</h1>
          <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:13px;font-weight:500;">আপনার ডিজিটাল ট্রান্সফর্মেশন পার্টনার</p>
        </div>
        
        <!-- Body -->
        <div style="padding:32px;">
          <p style="margin:0 0 24px;white-space:pre-wrap;line-height:1.8;font-size:15px;color:#1f2937;">${body}</p>
          
          ${demoLink ? `
          <div style="text-align:center;margin:32px 0;">
            <div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:14px;padding:24px;">
              <p style="margin:0 0 16px;font-size:14px;font-weight:600;color:#166534;">🎯 আপনার ডেমো প্রস্তুত!</p>
              <a href="${demoLink}" style="display:inline-block;background:linear-gradient(135deg,#16a34a,#0d9488);color:#fff;padding:14px 40px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 4px 16px rgba(22,163,74,0.35);letter-spacing:0.3px;">ডেমো দেখুন →</a>
              <p style="margin-top:12px;color:#6b7280;font-size:11px;word-break:break-all;">${demoLink}</p>
            </div>
          </div>` : ''}
        </div>
        
        <!-- Divider -->
        <div style="margin:0 32px;border-top:1px solid #e5e7eb;"></div>
        
        <!-- Footer -->
        <div style="padding:24px 32px;text-align:center;">
          <p style="color:#6b7280;font-size:12px;margin:0 0 4px;font-weight:600;">UpnexIT — Professional Software Solutions</p>
          <p style="color:#9ca3af;font-size:11px;margin:0;">📧 ${GMAIL_USER} | 🌐 upnexit.com</p>
          <p style="color:#d1d5db;font-size:10px;margin:12px 0 0;">© ${new Date().getFullYear()} UpnexIT. All rights reserved.</p>
        </div>
      </div>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });

    await transporter.sendMail({
      from: `UpnexIT <${GMAIL_USER}>`,
      to,
      subject: subject || 'UpnexIT থেকে বার্তা',
      html,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Reply send error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

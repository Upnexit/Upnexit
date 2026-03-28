import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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
    const GMAIL_USER = Deno.env.get('GMAIL_USER');
    const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD');
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) throw new Error('Gmail credentials not configured');

    const { name, email, service, plan, institution } = await req.json();
    if (!email || !name) {
      return new Response(JSON.stringify({ error: 'Missing name or email' }), { status: 400, headers: corsHeaders });
    }

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#16a34a 0%,#0d9488 50%,#0891b2 100%);padding:40px 32px;text-align:center;">
          <div style="width:64px;height:64px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:32px;">✅</span>
          </div>
          <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:800;">অর্ডার কনফার্মেশন</h1>
          <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px;">আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে</p>
        </div>
        
        <!-- Greeting -->
        <div style="padding:32px 32px 0;">
          <p style="font-size:16px;color:#1f2937;margin:0 0 8px;font-weight:700;">প্রিয় ${name},</p>
          <p style="font-size:14px;color:#4b5563;line-height:1.7;margin:0 0 24px;">
            UpnexIT-এ অর্ডার করার জন্য আপনাকে আন্তরিক ধন্যবাদ! আমরা আপনার অর্ডারটি পেয়েছি এবং আমাদের টিম এখনই কাজ শুরু করবে।
          </p>
        </div>
        
        <!-- Order Details -->
        <div style="margin:0 32px 24px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;overflow:hidden;">
          <div style="background:#dcfce7;padding:14px 20px;border-bottom:1px solid #bbf7d0;">
            <p style="margin:0;font-size:13px;font-weight:700;color:#166534;">📦 অর্ডারের বিবরণ</p>
          </div>
          <div style="padding:20px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:600;width:120px;">সার্ভিস</td>
                <td style="padding:10px 0;font-size:13px;color:#1f2937;font-weight:700;">${service || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:600;border-top:1px solid #dcfce7;">প্ল্যান</td>
                <td style="padding:10px 0;font-size:13px;color:#1f2937;font-weight:700;border-top:1px solid #dcfce7;">
                  <span style="display:inline-block;padding:3px 12px;border-radius:20px;font-size:11px;font-weight:800;color:#fff;background:${plan?.toLowerCase() === 'gold' ? '#f59e0b' : '#3b82f6'};">${plan || 'N/A'}</span>
                </td>
              </tr>
              ${institution ? `
              <tr>
                <td style="padding:10px 0;font-size:13px;color:#6b7280;font-weight:600;border-top:1px solid #dcfce7;">প্রতিষ্ঠান</td>
                <td style="padding:10px 0;font-size:13px;color:#1f2937;font-weight:700;border-top:1px solid #dcfce7;">${institution}</td>
              </tr>` : ''}
            </table>
          </div>
        </div>
        
        <!-- Next Steps -->
        <div style="margin:0 32px 32px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;padding:20px;">
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#1e40af;">🚀 পরবর্তী ধাপসমূহ</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#374151;vertical-align:top;">
                <span style="display:inline-block;width:22px;height:22px;background:#16a34a;color:#fff;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;margin-right:8px;">১</span>
                আমাদের টিম আপনার অর্ডার রিভিউ করবে
              </td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#374151;vertical-align:top;">
                <span style="display:inline-block;width:22px;height:22px;background:#0d9488;color:#fff;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;margin-right:8px;">২</span>
                ২৪ ঘন্টার মধ্যে আপনাকে জানানো হবে
              </td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#374151;vertical-align:top;">
                <span style="display:inline-block;width:22px;height:22px;background:#0891b2;color:#fff;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;margin-right:8px;">৩</span>
                ডেভেলপমেন্ট শুরু হলে ডেমো লিংক পাঠানো হবে
              </td>
            </tr>
          </table>
        </div>
        
        <!-- CTA -->
        <div style="text-align:center;padding:0 32px 32px;">
          <a href="https://upnexit.lovable.app" style="display:inline-block;background:linear-gradient(135deg,#16a34a,#0d9488);color:#fff;padding:14px 40px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;box-shadow:0 4px 16px rgba(22,163,74,0.3);">আমাদের ওয়েবসাইট ভিজিট করুন</a>
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
      to: email,
      subject: `✅ অর্ডার কনফার্মেশন — ${service || 'UpnexIT'}`,
      html,
    });

    // Also notify admin
    await transporter.sendMail({
      from: `UpnexIT <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: email,
      subject: `📦 নতুন অর্ডার: ${service} | ${plan} — ${name}`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
          <div style="background:linear-gradient(135deg,#16a34a,#0d9488);padding:28px 24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:#ffffff;margin:0;font-size:20px;font-weight:700;">📦 নতুন অর্ডার এসেছে!</h1>
          </div>
          <div style="padding:24px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 14px;font-weight:600;color:#374151;background:#f9fafb;">নাম</td><td style="padding:10px 14px;color:#1f2937;background:#f9fafb;">${name}</td></tr>
              <tr><td style="padding:10px 14px;font-weight:600;color:#374151;">ইমেইল</td><td style="padding:10px 14px;color:#1f2937;">${email}</td></tr>
              <tr><td style="padding:10px 14px;font-weight:600;color:#374151;background:#f9fafb;">সার্ভিস</td><td style="padding:10px 14px;color:#1f2937;background:#f9fafb;">${service || 'N/A'}</td></tr>
              <tr><td style="padding:10px 14px;font-weight:600;color:#374151;">প্ল্যান</td><td style="padding:10px 14px;color:#1f2937;">${plan || 'N/A'}</td></tr>
              ${institution ? `<tr><td style="padding:10px 14px;font-weight:600;color:#374151;background:#f9fafb;">প্রতিষ্ঠান</td><td style="padding:10px 14px;color:#1f2937;background:#f9fafb;">${institution}</td></tr>` : ''}
            </table>
          </div>
          <div style="background:#f9fafb;padding:14px 24px;border-radius:0 0 12px 12px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="color:#9ca3af;font-size:11px;margin:0;">UpnexIT Order System — © ${new Date().getFullYear()}</p>
          </div>
        </div>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Order confirmation error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

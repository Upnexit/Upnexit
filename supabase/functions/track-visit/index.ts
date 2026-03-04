import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { page_path, visitor_id, referrer } = await req.json();

    // Get country from IP using free API
    let country = "Unknown";
    let country_code = "XX";
    let city = "";

    try {
      // Use cf headers if available (Cloudflare/Supabase edge)
      const cfCountry = req.headers.get("cf-ipcountry");
      if (cfCountry && cfCountry !== "XX") {
        country_code = cfCountry;
      }

      // Fallback: use ip-api for geo info
      const forwarded = req.headers.get("x-forwarded-for");
      const ip = forwarded ? forwarded.split(",")[0].trim() : "";

      if (ip && ip !== "127.0.0.1") {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city`);
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.country) country = geo.country;
          if (geo.countryCode) country_code = geo.countryCode;
          if (geo.city) city = geo.city;
        }
      }
    } catch {
      // Geo lookup failed, continue with defaults
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const user_agent = req.headers.get("user-agent") || "";

    await supabase.from("page_views").insert({
      page_path: page_path || "/",
      country,
      country_code,
      city,
      visitor_id: visitor_id || null,
      user_agent,
      referrer: referrer || null,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

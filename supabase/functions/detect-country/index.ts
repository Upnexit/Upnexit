import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let countryCode = "XX";

    // Try Cloudflare header first
    const cfCountry = req.headers.get("cf-ipcountry");
    if (cfCountry && cfCountry !== "XX") {
      countryCode = cfCountry;
    } else {
      // Fallback: use ip-api
      const forwarded = req.headers.get("x-forwarded-for");
      const ip = forwarded ? forwarded.split(",")[0].trim() : "";

      if (ip && ip !== "127.0.0.1") {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.countryCode) countryCode = geo.countryCode;
        }
      }
    }

    return new Response(JSON.stringify({ country_code: countryCode }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ country_code: "XX" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

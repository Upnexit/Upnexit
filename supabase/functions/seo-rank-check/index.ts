import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TARGET = 'upnexit.pro.bd';

async function checkRank(keyword: string): Promise<{ position: number | null; found_url: string | null }> {
  // Use DuckDuckGo HTML endpoint (no API key required)
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(keyword)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; UpnexSEOBot/1.0)',
        'Accept-Language': 'en-US,en;q=0.9,bn;q=0.8',
      },
    });
    const html = await res.text();
    // Extract result links
    const linkRegex = /<a[^>]+class="result__a"[^>]+href="([^"]+)"/g;
    let match;
    let position = 0;
    while ((match = linkRegex.exec(html)) !== null) {
      position++;
      let href = match[1];
      // DDG may wrap with /l/?uddg=
      try {
        const parsed = new URL(href, 'https://duckduckgo.com');
        const u = parsed.searchParams.get('uddg');
        if (u) href = decodeURIComponent(u);
      } catch { /* ignore */ }
      if (href.includes(TARGET)) {
        return { position, found_url: href };
      }
      if (position >= 50) break;
    }
  } catch (e) {
    console.error('rank check error', keyword, e);
  }
  return { position: null, found_url: null };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data: keywords, error } = await supabase
    .from('seo_keywords')
    .select('id, keyword')
    .eq('active', true);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const results: Array<{ keyword: string; position: number | null }> = [];
  for (const k of keywords ?? []) {
    const { position, found_url } = await checkRank(k.keyword);
    await supabase.from('seo_rank_history').insert({
      keyword_id: k.id,
      position,
      found_url,
      engine: 'duckduckgo',
    });
    results.push({ keyword: k.keyword, position });
    // Be polite – wait 1.5s between queries
    await new Promise((r) => setTimeout(r, 1500));
  }

  return new Response(JSON.stringify({ ok: true, count: results.length, results }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
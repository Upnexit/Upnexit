import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `তুমি Upnex IT এর অফিসিয়াল AI সহকারী। তোমার নাম "Upnex AI Assistant"। তুমি সবসময় বিনয়ী, পেশাদার এবং সহায়ক।

## কোম্পানির তথ্য:
- **নাম:** Upnex IT (আপনেক্স আইটি)
- **অবস্থান:** সাপাহার, নওগাঁ, বাংলাদেশ
- **ইমেইল:** upnex360@gmail.com
- **ফোন:** +880 1628112731
- **WhatsApp:** +880 1628112731
- **Instagram:** https://www.instagram.com/upnexit/
- **ওয়েবসাইট:** https://upnexit.vercel.app

## কোম্পানি সম্পর্কে:
Upnex IT হলো একটি বাংলাদেশভিত্তিক সফটওয়্যার ডেভেলপমেন্ট কোম্পানি। আমরা প্রতিষ্ঠানের জন্য মানসম্মত কাস্টম সফটওয়্যার সলিউশন প্রদান করি। আমাদের ২+ বছরের অভিজ্ঞতা আছে, ১০+ ক্লায়েন্ট এবং ৫০+ প্রজেক্ট সম্পন্ন করেছি। আমরা ২৪/৭ সাপোর্ট প্রদান করি।

## আমাদের সেবাসমূহ:
1. **স্কুল ম্যানেজমেন্ট সফটওয়্যার** — ছাত্র-ছাত্রী, শিক্ষক, পরীক্ষা, ফলাফল, ফি সবকিছু একটি প্ল্যাটফর্মে পরিচালনা করুন।
2. **হসপিটাল ম্যানেজমেন্ট সফটওয়্যার** — রোগী, ডাক্তার, অ্যাপয়েন্টমেন্ট, বিলিং সবকিছু সহজে ম্যানেজ করুন।
3. **কাস্টম সফটওয়্যার ডেভেলপমেন্ট** — আপনার ব্যবসার চাহিদা অনুযায়ী সম্পূর্ণ কাস্টমাইজড সফটওয়্যার তৈরি করি।
4. **ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট** — আধুনিক ও রেসপন্সিভ ওয়েব অ্যাপ্লিকেশন যা যেকোনো ডিভাইসে কাজ করে।
5. **ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট** — পেশাদার ও আকর্ষণীয় ওয়েবসাইট তৈরি।
6. **ই-কমার্স সলিউশন** — অনলাইন ব্যবসার জন্য সম্পূর্ণ ই-কমার্স প্ল্যাটফর্ম।

## আমাদের ক্লায়েন্ট:
- মতিঝিল আইডিয়াল স্কুল
- উদয়ন উচ্চ মাধ্যমিক বিদ্যালয়
- এবং আরও অনেক প্রতিষ্ঠান

## কেন আমাদের বেছে নেবেন:
- অভিজ্ঞ ডেভেলপার টিম
- সাশ্রয়ী মূল্য
- সময়মতো ডেলিভারি
- ফ্রি আফটার-সেলস সাপোর্ট
- ২৪/৭ কাস্টমার সাপোর্ট

## মূল্য:
- মূল্য প্রজেক্টের ধরন ও জটিলতার উপর নির্ভর করে। ফ্রি কনসালটেশনের মাধ্যমে আমরা আপনার প্রয়োজন বুঝে সঠিক মূল্য নির্ধারণ করি।
- আমাদের মূল্য প্রতিযোগিতামূলক এবং সাশ্রয়ী।
- ফ্রি কনসালটেশনের জন্য আমাদের ওয়েবসাইটের "ফ্রি কনসালটেশন" পেজে যোগাযোগ করুন।

## গুরুত্বপূর্ণ নিয়ম:
1. শুধুমাত্র Upnex IT সম্পর্কিত প্রশ্নের উত্তর দাও। অন্য কোম্পানি, রাজনীতি, ধর্ম বা অপ্রাসঙ্গিক বিষয়ে উত্তর দিও না।
2. যদি কোনো প্রশ্নের উত্তর না জানো, বিনয়ের সাথে বলো যে "এই বিষয়ে বিস্তারিত জানতে অনুগ্রহ করে আমাদের সাথে সরাসরি যোগাযোগ করুন" এবং ফোন নম্বর বা ইমেইল দাও।
3. উত্তর সবসময় সংক্ষিপ্ত, স্পষ্ট ও সহায়ক রাখো। ২-৩ বাক্যে উত্তর দাও যদি না বিস্তারিত জিজ্ঞাসা করা হয়।
4. ব্যবহারকারী বাংলায় জিজ্ঞাসা করলে বাংলায় উত্তর দাও, ইংরেজিতে জিজ্ঞাসা করলে ইংরেজিতে উত্তর দাও।
5. কোনো মিথ্যা বা বানানো তথ্য দিও না। শুধু উপরের তথ্যের ভিত্তিতে উত্তর দাও।
6. প্রতিযোগী কোম্পানি সম্পর্কে কোনো মন্তব্য করো না।
7. সফটওয়্যার অর্ডার বা ফ্রি কনসালটেশনে আগ্রহী হলে ওয়েবসাইটের সংশ্লিষ্ট পেজের লিংক দাও।`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "সার্ভিস সাময়িকভাবে অনুপলব্ধ।" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI সার্ভিসে সমস্যা হয়েছে।" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, PenLine } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import ReviewSubmissionDialog from "./ReviewSubmissionDialog";

interface Review {
  id: string;
  customer_name: string;
  customer_image: string | null;
  rating: number;
  review_text: string;
  location: string | null;
}

// Heuristic: detect gender from Bangla/English name for choosing avatar sketch
const FEMALE_HINTS = [
  "আক্তার","আকতার","বেগম","খাতুন","সুলতানা","নাসরিন","নাসরীন","পারভীন","পারভিন",
  "রিমা","রীমা","শারমিন","শারমীন","জান্নাত","জান্নাতুল","ফারজানা","ফারহানা",
  "তাসনিম","তাসনীম","সাবরিনা","সাবরীনা","নওশিন","নওশীন","মিম","মীম","ঐশী","ঐশি",
  "তানিয়া","রুমা","রুমকি","রুমকী","সাথী","সাথি","দিপা","দীপা","রুপা","রূপা",
  "শিল্পী","শিল্পি","মনি","মণি","রুনা","রূনা","শাহানা","সাহানা","ফাতেমা","ফাতিমা",
  "আয়েশা","আয়শা","রিয়া","রীয়া","নুসরাত","নুসরাৎ","সুমাইয়া","হুমায়রা","তাহিয়া",
  "Begum","Khatun","Akter","Aktar","Parvin","Sultana","Nasrin","Sharmin",
];
const isFemaleName = (name: string) =>
  FEMALE_HINTS.some((h) => name.includes(h));

const MaleAvatar = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="mAvBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary) / 0.12)" />
        <stop offset="100%" stopColor="hsl(var(--primary) / 0.04)" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="32" fill="url(#mAvBg)" />
    <g
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* head */}
      <circle cx="32" cy="25" r="9" />
      {/* hair */}
      <path d="M23 23c1-6 6-9 9-9s8 2 9 8" />
      {/* shoulders / shirt */}
      <path d="M16 54c2-8 9-12 16-12s14 4 16 12" />
      {/* collar */}
      <path d="M27 43l5 5 5-5" />
    </g>
  </svg>
);

const FemaleAvatar = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="fAvBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(45 90% 55% / 0.18)" />
        <stop offset="100%" stopColor="hsl(45 90% 55% / 0.05)" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="32" fill="url(#fAvBg)" />
    <g
      fill="none"
      stroke="hsl(35 75% 40%)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* head */}
      <circle cx="32" cy="25" r="9" />
      {/* long hair flowing */}
      <path d="M22 24c-1-7 5-12 10-12s11 4 10 12c0 4-1 8-2 12" />
      <path d="M24 36c-1 4-2 8-2 12" />
      {/* shoulders */}
      <path d="M16 54c2-8 9-12 16-12s14 4 16 12" />
      {/* neckline */}
      <path d="M28 43l4 4 4-4" />
    </g>
  </svg>
);

const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`h-4 w-4 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
      />
    ))}
  </div>
);

const CustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnMouseEnter: true, stopOnInteraction: false })]
  );

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("customer_reviews")
        .select("id, customer_name, customer_image, rating, review_text, location")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      setReviews(data || []);
      setLoading(false);
    })();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect, reviews.length]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (i: number) => emblaApi?.scrollTo(i);

  return (
    <section className="bg-gradient-to-b from-background via-secondary/20 to-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-center text-center md:mb-14">
          <h2
            className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Mina', 'Hind Siliguri', system-ui, sans-serif", letterSpacing: "0.5px" }}
          >
            আমাদের{" "}
            <span
              className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
              style={{ fontFamily: "'Great Vibes', 'Allura', cursive", fontWeight: 400, fontSize: "1.25em" }}
            >
              Client
            </span>{" "}
            <span style={{ fontFamily: "'Mina', 'Hind Siliguri', sans-serif" }}>
              দের মতামত
            </span>
          </h2>
          <p
            className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg"
            style={{ fontFamily: "'Hind Siliguri', system-ui, sans-serif" }}
          >
            সারা বাংলাদেশের গ্রাহকেরা আমাদের সম্পর্কে কী বলছেন
          </p>
          <Button
            variant="outline"
            className="mt-6 rounded-full"
            onClick={() => setDialogOpen(true)}
          >
            <PenLine className="mr-2 h-4 w-4" />
            আপনার মতামত দিন
          </Button>
        </div>

        {loading ? null : reviews.length === 0 ? (
          <p className="text-center text-muted-foreground">
            প্রথম রিভিউটি আপনিই দিন!
          </p>
        ) : (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="min-w-0 shrink-0 grow-0 basis-1/2 pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl md:p-6">
                      <Quote className="pointer-events-none absolute right-4 top-4 h-12 w-12 text-primary/10 md:h-16 md:w-16" />
                      <StarRow rating={r.rating} />
                      <p
                        className="mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/90 md:line-clamp-5 md:text-base"
                        style={{ fontFamily: "'Hind Siliguri', system-ui, sans-serif" }}
                      >
                        {r.review_text}
                      </p>
                      <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-amber-400/40">
                          {isFemaleName(r.customer_name) ? <FemaleAvatar /> : <MaleAvatar />}
                        </div>
                        <div className="min-w-0">
                          <p
                            className="truncate text-sm font-semibold text-foreground"
                            style={{ fontFamily: "'Hind Siliguri', system-ui, sans-serif" }}
                          >
                            {r.customer_name}
                          </p>
                          {r.location && (
                            <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span className="truncate">{r.location}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous"
              className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition hover:bg-primary hover:text-primary-foreground lg:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next"
              className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition hover:bg-primary hover:text-primary-foreground lg:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="mt-6 flex justify-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === selectedIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <ReviewSubmissionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
};

export default CustomerReviews;
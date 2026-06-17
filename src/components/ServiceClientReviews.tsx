import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  serviceReviews,
  serviceGradients,
  serviceLabels,
  type ServiceReviewKey,
} from '@/data/serviceReviews';

interface Props {
  serviceKey: ServiceReviewKey;
}

const MaleAvatar = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="sdmBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bfe3ff" />
        <stop offset="100%" stopColor="#7fb8e6" />
      </linearGradient>
      <linearGradient id="sdmSkin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f5d0a9" />
        <stop offset="100%" stopColor="#e8b483" />
      </linearGradient>
      <linearGradient id="sdmShirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#0f7a37" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="32" fill="url(#sdmBg)" />
    <path d="M8 60c2-10 11-16 24-16s22 6 24 16z" fill="url(#sdmShirt)" />
    <path d="M26 44l6 7 6-7-3-2-3 3-3-3z" fill="#ffffff" />
    <path d="M28 38h8v6h-8z" fill="url(#sdmSkin)" />
    <circle cx="32" cy="28" r="11" fill="url(#sdmSkin)" />
    <path d="M21 26c0-8 5-13 11-13s11 4 11 12c0 1-1 2-2 2-1-3-4-5-9-5s-8 2-9 5c-1 0-2-1-2-1z" fill="#2b1d12" />
    <circle cx="28" cy="29" r="1.4" fill="#1a1a1a" />
    <circle cx="36" cy="29" r="1.4" fill="#1a1a1a" />
    <path d="M29 35q3 2 6 0" stroke="#a44343" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

const FemaleAvatar = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="sdfBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe0ec" />
        <stop offset="100%" stopColor="#ffb3c7" />
      </linearGradient>
      <linearGradient id="sdfSkin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbdcbf" />
        <stop offset="100%" stopColor="#f2c098" />
      </linearGradient>
      <linearGradient id="sdfHair" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a1f12" />
        <stop offset="100%" stopColor="#1a0d07" />
      </linearGradient>
      <linearGradient id="sdfDress" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#9333ea" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="32" fill="url(#sdfBg)" />
    <path d="M16 58c0-18 6-30 16-30s16 12 16 30z" fill="url(#sdfHair)" />
    <path d="M10 60c2-10 12-16 22-16s20 6 22 16z" fill="url(#sdfDress)" />
    <path d="M28 38h8v6h-8z" fill="url(#sdfSkin)" />
    <circle cx="32" cy="28" r="11" fill="url(#sdfSkin)" />
    <path d="M20 26c1-9 6-14 12-14s12 5 12 14c0 1-1 2-2 2-2-4-5-6-7-6-1 2-3 3-5 3-3 0-6-2-7-3-1 1-2 2-3 4z" fill="url(#sdfHair)" />
    <circle cx="28" cy="29" r="1.5" fill="#2a1a0a" />
    <circle cx="36" cy="29" r="1.5" fill="#2a1a0a" />
    <path d="M29 35.5q3 2.5 6 0" stroke="#e11d74" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <circle cx="32" cy="20" r="0.9" fill="#dc2626" />
  </svg>
);

const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`h-4 w-4 ${n <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`}
      />
    ))}
  </div>
);

/**
 * Service-detail "Client Reviews" — mirrors the homepage CustomerReviews
 * carousel exactly, but limited to the 5 reviews for the current service.
 */
const ServiceClientReviews = ({ serviceKey }: Props) => {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';
  const data = serviceReviews[serviceKey];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4500, stopOnMouseEnter: true, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (!data || data.length === 0) return null;

  const reviews = data.slice(0, 5).map((r, i) => ({
    id: `${serviceKey}-${i}`,
    customer_name: r.name,
    rating: r.rating,
    review_text: isBn ? r.bn : r.en,
    location: r.location,
    company: r.company,
    female: !!r.female,
  }));

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (i: number) => emblaApi?.scrollTo(i);

  const gradient = serviceGradients[serviceKey];
  const label = isBn ? serviceLabels[serviceKey].bn : serviceLabels[serviceKey].en;

  return (
    <section className="bg-gradient-to-b from-background via-secondary/20 to-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-center text-center md:mb-14">
          <h2 className="bn-display bn-display-bold text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
            আমাদের{' '}
            <span
              className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
              style={{ fontFamily: "'Great Vibes', 'Allura', cursive", fontWeight: 400, fontSize: '1.25em', WebkitTextStroke: '0' }}
            >
              Client
            </span>{' '}
            <span className="bn-display">দের রিভিউ</span>
          </h2>
          <p className="bn-display mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            {isBn
              ? `আমাদের ${label} সেবার ব্যবহারকারী প্রতিষ্ঠানদের অভিজ্ঞতা`
              : `What our clients say about our ${label} service`}
          </p>
        </div>

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
                    <div
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md`}
                    >
                      <Briefcase className="h-3 w-3" />
                      {label}
                    </div>
                    <div className="mt-3">
                      <StarRow rating={r.rating} />
                    </div>
                    <p className="bn-display mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/90 md:line-clamp-5 md:text-base">
                      {r.review_text}
                    </p>
                    <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-amber-400/40">
                        {r.female ? <FemaleAvatar /> : <MaleAvatar />}
                      </div>
                      <div className="min-w-0">
                        <p className="bn-display truncate text-sm font-semibold text-foreground">
                          {r.customer_name}
                        </p>
                        <p className="truncate text-xs font-medium text-primary/80">
                          {r.company}
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
                  i === selectedIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceClientReviews;
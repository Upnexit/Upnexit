import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const ReviewCard = ({ review }: { review: any }) => (
  <div className="group h-full bg-card rounded-2xl border border-border p-5 md:p-6 flex flex-col items-center text-center shadow-soft hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
    {review.logo_url ? (
      <img
        src={review.logo_url}
        alt={review.company_name}
        loading="lazy"
        className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-xl mb-3 ring-2 ring-secondary/60 bg-white/60 p-1"
      />
    ) : (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center mb-3 ring-2 ring-secondary/60">
        <span className="text-2xl md:text-3xl font-bold text-primary">
          {review.company_name.charAt(0)}
        </span>
      </div>
    )}
    <h3 className="font-semibold text-sm md:text-base text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
      {review.company_name}
    </h3>
    <div className="flex gap-0.5 mt-auto">
      {Array.from({ length: 5 }).map((_, si) => (
        <Star
          key={si}
          className={`h-3.5 w-3.5 md:h-4 md:w-4 ${
            si < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  </div>
);

const ClientReviewsSection = () => {
  const { lang } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false })]
  );

  const { data: reviews = [] } = useQuery({
    queryKey: ['client-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_reviews')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

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
  }, [emblaApi, onSelect, reviews.length]);

  if (reviews.length === 0) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-background via-secondary/15 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
            {lang === 'bn' ? 'আপনেক্স আইটি' : 'Upnex It'}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mt-1">
            {lang === 'bn'
              ? 'সফটওয়্যার ব্যবহারকারী প্রতিষ্ঠান সমূহ'
              : 'Software Using Institutions'}
          </p>
          <div className="flex flex-col items-center mt-2 gap-[3px]">
            <span className="block w-48 sm:w-64 md:w-80 h-[3px] rounded-full bg-accent" />
            <span className="block w-36 sm:w-48 md:w-60 h-[2px] rounded-full bg-accent/60" />
          </div>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-0 shrink-0 grow-0 basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous"
            className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition hover:bg-primary hover:text-primary-foreground lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
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
                onClick={() => emblaApi?.scrollTo(i)}
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

export default ClientReviewsSection;
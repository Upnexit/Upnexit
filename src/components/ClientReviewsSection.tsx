import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }: { review: any }) => (
  <div className="bg-background rounded-2xl border border-border p-4 md:p-6 flex flex-col items-center text-center shadow-soft hover:shadow-card transition-all min-w-[calc(50%-8px)] md:min-w-[calc(25%-18px)] shrink-0">
    {review.logo_url ? (
      <img
        src={review.logo_url}
        alt={review.company_name}
        className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-xl mb-3"
      />
    ) : (
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
        <span className="text-xl md:text-2xl font-bold text-primary">
          {review.company_name.charAt(0)}
        </span>
      </div>
    )}
    <h3 className="font-semibold text-sm md:text-base text-foreground mb-2 line-clamp-1">
      {review.company_name}
    </h3>
    <div className="flex gap-0.5">
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

  if (reviews.length === 0) return null;

  // Duplicate for seamless infinite loop
  const duplicated = [...reviews, ...reviews];

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
          {/* Decorative yellow underlines like reference */}
          <div className="flex flex-col items-center mt-2 gap-[3px]">
            <span className="block w-48 sm:w-64 md:w-80 h-[3px] rounded-full bg-accent" />
            <span className="block w-36 sm:w-48 md:w-60 h-[2px] rounded-full bg-accent/60" />
          </div>
        </motion.div>
      </div>

      {/* Marquee slider - full width overflow hidden */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4 md:gap-6 px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: reviews.length * 4,
              ease: 'linear',
            },
          }}
        >
          {duplicated.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientReviewsSection;

import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const ClientReviewsSection = () => {
  const { lang } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);

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

  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 4;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const nextPage = useCallback(() => {
    setCurrentPage((p) => (p + 1) % Math.max(totalPages, 1));
  }, [totalPages]);

  useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(nextPage, 4000);
    return () => clearInterval(interval);
  }, [totalPages, nextPage]);

  const visibleReviews = reviews.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  if (reviews.length === 0) return null;

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {lang === 'bn' ? 'আমাদের সার্ভিসে সন্তুষ্ট' : 'Satisfied With Our Service'}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            {lang === 'bn'
              ? 'যারা আমাদের উপর বিশ্বাস রেখেছেন'
              : 'Companies that trust us'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {visibleReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background rounded-2xl border border-border p-4 md:p-6 flex flex-col items-center text-center shadow-soft hover:shadow-card transition-all"
            >
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
                      si < review.rating
                        ? 'text-accent fill-accent'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentPage ? 'bg-primary w-6' : 'bg-border'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientReviewsSection;

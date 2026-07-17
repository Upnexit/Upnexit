import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Layers } from 'lucide-react';

// Map service slug → category values used in portfolio_items.category
const CATEGORY_MAP: Record<string, string[]> = {
  school:   ['School ERP', 'School Management', 'School Software'],
  hospital: ['Hospital Management', 'Hospital', 'Healthcare'],
  custom:   ['Custom Software', 'Custom'],
  web:      ['Web Application', 'Web App', 'Website'],
  graphics: ['Graphic Design', 'Graphics'],
  boosting: ['Digital Marketing', 'Boosting', 'Marketing'],
};

interface Props { slug: string; headerLabel?: string; }

const ServicePortfolio = ({ slug, headerLabel }: Props) => {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';
  const categories = CATEGORY_MAP[slug] || [];

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['service-portfolio', slug],
    queryFn: async () => {
      let q = supabase
        .from('portfolio_items')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (categories.length) q = q.in('category', categories);
      const { data, error } = await q;
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading || !items.length) return null;

  return (
    <section className="py-8 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-7 sm:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary mb-3 sm:mb-5">
            <Layers className="h-3 w-3" />
            {isBn ? 'আমাদের প্রজেক্টসমূহ' : 'Our Projects'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1.5 sm:mb-3">
            {isBn ? 'আমাদের কমপ্লিট করা' : 'Recently Completed'}{' '}
            <span className="text-gradient">
              {headerLabel || (isBn ? 'রানিং প্রজেক্ট' : 'Live Projects')}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
            {isBn
              ? 'নিচের প্রজেক্টগুলো বর্তমানে সফলভাবে চালু আছে — লাইভ লিংকে ক্লিক করে দেখুন'
              : 'These live projects are running successfully — click the live link to visit'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group bg-background rounded-2xl sm:rounded-3xl border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {item.cover_image ? (
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Sparkles className="h-8 w-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {item.category && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background/95 text-primary shadow-md">
                    {item.category}
                  </span>
                )}
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-sm sm:text-base text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
                {item.client_name && (
                  <p className="text-[11px] sm:text-xs text-muted-foreground mb-2">
                    {isBn ? 'ক্লায়েন্ট: ' : 'Client: '}
                    <span className="font-semibold text-foreground/80">{item.client_name}</span>
                  </p>
                )}
                {item.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-snug line-clamp-2 mb-3">
                    {item.description}
                  </p>
                )}

                {Array.isArray(item.technologies) && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.technologies.slice(0, 4).map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-muted text-foreground/70 border border-border/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {item.live_url && (
                  <a
                    href={item.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-1.5 h-10 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary font-bold text-xs sm:text-sm transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {isBn ? 'লাইভ প্রজেক্ট দেখুন' : 'Visit Live Project'}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePortfolio;
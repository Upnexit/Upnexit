import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const { lang } = useLanguage();

  const { data: items, isLoading } = useQuery({
    queryKey: ['portfolio-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="পোর্টফোলিও | Upnex It - আমাদের সফল প্রজেক্টসমূহ"
        description="Upnex It এর সফলভাবে সম্পন্ন করা প্রজেক্টসমূহ দেখুন - School Management, Hospital Management, Custom Software এবং Web Application।"
        canonical="https://upnexit.pro.bd/portfolio"
        keywords="software portfolio bangladesh, upnex it projects, school software project, hospital software project, web development portfolio"
      />
      <Navbar />

      <section className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {lang === "bn" ? 'আমাদের পোর্টফোলিও' : 'Our Portfolio'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {lang === "bn"
                ? 'আমাদের সফলভাবে সম্পন্ন করা কিছু প্রজেক্ট দেখুন'
                : 'See some of our successfully completed projects'}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="rounded-2xl bg-card border border-border animate-pulse h-96" />
              ))}
            </div>
          ) : items && items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {item.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {item.category && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mb-3">
                        <Layers className="h-3 w-3" />{item.category}
                      </span>
                    )}
                    <h2 className="text-xl font-bold text-foreground mb-2">{item.title}</h2>
                    {item.client_name && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {lang === "bn" ? 'ক্লায়েন্ট:' : 'Client:'} {item.client_name}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
                    )}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.technologies.map(tech => (
                          <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">
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
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {lang === "bn" ? 'লাইভ দেখুন' : 'View Live'}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {lang === "bn" ? 'শীঘ্রই প্রজেক্ট আসছে...' : 'Projects coming soon...'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;

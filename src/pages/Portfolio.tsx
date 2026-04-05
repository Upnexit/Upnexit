import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, Layers, FolderOpen, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Portfolio = () => {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  const categories = items
    ? [...new Set(items.map(i => i.category).filter(Boolean))]
    : [];

  const filteredItems = activeCategory
    ? items?.filter(i => i.category === activeCategory)
    : items;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="পোর্টফোলিও | Upnex It - আমাদের সফল প্রজেক্টসমূহ"
        description="Upnex It এর সফলভাবে সম্পন্ন করা প্রজেক্টসমূহ দেখুন - School Management ERP, Hospital Management System, Custom Software এবং Web Application।"
        canonical="https://upnexit.pro.bd/portfolio"
        keywords="software portfolio bangladesh, upnex it projects, school software project, hospital software project, web development portfolio, কাস্টম সফটওয়্যার প্রজেক্ট, সফটওয়্যার পোর্টফোলিও বাংলাদেশ"
      />
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Upnex It Portfolio",
            "url": "https://upnexit.pro.bd/portfolio",
            "description": "Successfully completed software projects by Upnex It",
            "publisher": {
              "@type": "Organization",
              "name": "Upnex It",
              "url": "https://upnexit.pro.bd"
            }
          })
        }}
      />
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-24 pb-2 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 via-primary/5 to-accent/5 border border-accent/10 p-8 md:p-12 mb-10"
          >
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <FolderOpen className="h-4 w-4" />
                {lang === 'bn' ? 'আমাদের কাজ' : 'Our Work'}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tight">
                {lang === 'bn' ? 'আমাদের পোর্টফোলিও' : 'Our Portfolio'}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                {lang === 'bn'
                  ? 'আমাদের সফলভাবে সম্পন্ন করা প্রজেক্টগুলো দেখুন এবং আমাদের দক্ষতা সম্পর্কে জানুন'
                  : 'Explore our successfully completed projects and learn about our expertise'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="px-4 pb-6">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !activeCategory
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {lang === 'bn' ? 'সবগুলো' : 'All'}
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-2xl bg-card border border-border animate-pulse h-96" />
              ))}
            </div>
          ) : filteredItems && filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  {item.cover_image ? (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <Code2 className="h-16 w-16 text-primary/20" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {item.category && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                          <Layers className="h-3 w-3" />{item.category}
                        </span>
                      )}
                      {item.client_name && (
                        <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                          {item.client_name}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h2>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{item.description}</p>
                    )}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.technologies.map(tech => (
                          <span key={tech} className="text-[10px] px-2.5 py-1 rounded-lg bg-muted text-muted-foreground font-semibold">
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
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline group-hover:gap-2.5 transition-all"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {lang === 'bn' ? 'লাইভ দেখুন' : 'View Live'}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FolderOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {lang === 'bn' ? 'শীঘ্রই প্রজেক্ট আসছে...' : 'Projects coming soon...'}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;

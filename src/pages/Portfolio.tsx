import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, Layers, FolderOpen, Code2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import InternalLinks from '@/components/InternalLinks';

const Portfolio = () => {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: items, isLoading } = useQuery({
    queryKey: ['portfolio-items'],
    queryFn: async () => {
      const { data, error } = await supabase.from('portfolio_items').select('*').eq('is_active', true).order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  const categories = items ? [...new Set(items.map(i => i.category).filter(Boolean))] : [];
  const filteredItems = activeCategory ? items?.filter(i => i.category === activeCategory) : items;

  return (
    <div className="min-h-screen">
      <SEOHead
        title="পোর্টফোলিও | Upnex It - আমাদের সফল প্রজেক্টসমূহ"
        description="Upnex It এর সফলভাবে সম্পন্ন করা প্রজেক্টসমূহ দেখুন।"
        canonical="https://upnexit.pro.bd/portfolio"
        keywords="software portfolio bangladesh, upnex it projects, school software project, hospital software project"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Upnex It Portfolio",
            "url": "https://upnexit.pro.bd/portfolio",
            "description": "Successfully completed software projects by Upnex It",
            "publisher": { "@type": "Organization", "name": "Upnex It", "url": "https://upnexit.pro.bd" }
          })
        }}
      />
      {items && items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Upnex It Projects",
              "itemListElement": items.map((it, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "CreativeWork",
                  "name": it.title,
                  "description": it.description || it.title,
                  "image": it.cover_image || "https://upnexit.pro.bd/og-image.jpg",
                  "url": it.live_url || "https://upnexit.pro.bd/portfolio",
                  "creator": { "@type": "Organization", "name": "Upnex It", "url": "https://upnexit.pro.bd" },
                  "keywords": (it.technologies || []).join(', '),
                  ...(it.category ? { "genre": it.category } : {}),
                }
              }))
            })
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upnexit.pro.bd" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://upnexit.pro.bd/portfolio" },
            ]
          })
        }}
      />
      <Navbar />

      {/* Hero Banner with texture */}
      <section className="relative pt-24 pb-4 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 via-primary/5 to-accent/5 border border-accent/10 p-8 md:p-14 mb-10"
          >
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-0 right-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

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
                !activeCategory ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {lang === 'bn' ? 'সবগুলো' : 'All'}
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      <section className="relative pb-20 px-4">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(45deg, hsl(var(--primary)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--primary)) 25%, transparent 25%)',
          backgroundSize: '60px 60px',
        }} />

        <div className="max-w-6xl mx-auto relative z-10">
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
                  className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {item.cover_image ? (
                    <div className="aspect-video overflow-hidden bg-muted relative">
                      <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                        <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">{item.client_name}</span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h2>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{item.description}</p>
                    )}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.technologies.map(tech => (
                          <span key={tech} className="text-[10px] px-2.5 py-1 rounded-lg bg-muted text-muted-foreground font-semibold">{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      {item.live_url && (
                        <a href={item.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline group-hover:gap-2.5 transition-all">
                          <ExternalLink className="h-4 w-4" />
                          {lang === 'bn' ? 'লাইভ দেখুন' : 'View Live'}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <FolderOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">{lang === 'bn' ? 'শীঘ্রই প্রজেক্ট আসছে...' : 'Projects coming soon...'}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/10 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
              {lang === 'bn' ? 'আপনার প্রজেক্ট শুরু করুন' : 'Start Your Project'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {lang === 'bn' ? 'আপনার ব্যবসার জন্য কাস্টম সফটওয়্যার তৈরি করতে আজই আমাদের সাথে যোগাযোগ করুন' : 'Contact us today to build custom software for your business'}
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
              {lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks exclude="/portfolio" />
      <Footer />
    </div>
  );
};

export default Portfolio;

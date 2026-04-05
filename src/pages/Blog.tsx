import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, ArrowRight, Tag, BookOpen, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Blog = () => {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ব্লগ | Upnex It - সফটওয়্যার টিপস, গাইড ও আপডেট"
        description="Upnex It এর ব্লগে পড়ুন সফটওয়্যার ডেভেলপমেন্ট, স্কুল ম্যানেজমেন্ট ERP, হসপিটাল ম্যানেজমেন্ট সিস্টেম এবং ওয়েব টেকনোলজি সম্পর্কিত বাংলা আর্টিকেল ও গাইড।"
        canonical="https://upnexit.pro.bd/blog"
        keywords="software blog bangladesh, সফটওয়্যার ব্লগ, school management tips, hospital software guide, web development bangladesh, upnex it blog, সফটওয়্যার গাইড বাংলা, ERP blog bangladesh, tech blog bd"
      />
      {/* JSON-LD Blog Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": lang === 'bn' ? "Upnex It ব্লগ" : "Upnex It Blog",
            "url": "https://upnexit.pro.bd/blog",
            "description": "Software development tips, guides and updates from Upnex It",
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
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border border-primary/10 p-8 md:p-12 mb-10"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <BookOpen className="h-4 w-4" />
                {lang === 'bn' ? 'জ্ঞান ও আপডেট' : 'Knowledge & Updates'}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tight">
                {lang === 'bn' ? 'আমাদের ব্লগ' : 'Our Blog'}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mb-6">
                {lang === 'bn'
                  ? 'সফটওয়্যার ডেভেলপমেন্ট, টেকনোলজি এবং ব্যবসায়িক সমাধান সম্পর্কিত আর্টিকেল ও গাইড'
                  : 'Articles and guides about software development, technology and business solutions'}
              </p>

              {/* Search */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={lang === 'bn' ? 'আর্টিকেল খুঁজুন...' : 'Search articles...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-2xl bg-card border border-border animate-pulse h-80" />
              ))}
            </div>
          ) : filteredPosts && filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full rounded-2xl bg-card border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    {post.cover_image ? (
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary/30" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                              <Tag className="h-2.5 w-2.5" />{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {post.published_at ? new Date(post.published_at).toLocaleDateString('bn-BD') : ''}
                        </span>
                        <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          {lang === 'bn' ? 'পড়ুন' : 'Read'}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {searchQuery
                  ? (lang === 'bn' ? 'কোনো আর্টিকেল পাওয়া যায়নি' : 'No articles found')
                  : (lang === 'bn' ? 'শীঘ্রই আর্টিকেল আসছে...' : 'Articles coming soon...')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

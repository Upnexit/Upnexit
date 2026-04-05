import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowLeft, Tag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      if (error) throw error;
      return data;
    },
  });

  // Estimate reading time
  const readingTime = post ? Math.max(1, Math.ceil(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 px-4 max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-5 bg-muted rounded w-24" />
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-72 bg-muted rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">পোস্ট পাওয়া যায়নি</h1>
          <Link to="/blog" className="text-primary hover:underline font-medium">← ব্লগে ফিরুন</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.title} | Upnex It Blog`}
        description={post.excerpt || post.title}
        canonical={`https://upnexit.pro.bd/blog/${post.slug}`}
        ogImage={post.cover_image || undefined}
        keywords={post.tags?.join(', ')}
        type="article"
      />
      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt || post.title,
            "image": post.cover_image || "https://upnexit.pro.bd/og-image.jpg",
            "author": { "@type": "Person", "name": post.author },
            "publisher": {
              "@type": "Organization",
              "name": "Upnex It",
              "logo": { "@type": "ImageObject", "url": "https://upnexit.pro.bd/logo.png" }
            },
            "datePublished": post.published_at,
            "dateModified": post.updated_at || post.published_at,
            "mainEntityOfPage": `https://upnexit.pro.bd/blog/${post.slug}`,
            "keywords": post.tags?.join(', ')
          })
        }}
      />
      <Navbar />

      <article className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4" /> ব্লগে ফিরুন
            </Link>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                    <Tag className="h-3 w-3" />{tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
              {post.published_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.published_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime} মিনিট পড়ার সময়
              </span>
            </div>

            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full rounded-2xl mb-10 shadow-lg border border-border/50"
              />
            )}

            <div
              className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-blockquote:border-primary/30 prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-xl prose-blockquote:py-1"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;

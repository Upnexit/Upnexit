import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 px-4 max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-64 bg-muted rounded-2xl" />
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
          <Link to="/blog" className="text-primary hover:underline">ব্লগে ফিরুন</Link>
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
      />
      <Navbar />

      <article className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" /> ব্লগে ফিরুন
            </Link>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                    <Tag className="h-3 w-3" />{tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
              {post.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.published_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
            </div>

            {post.cover_image && (
              <img src={post.cover_image} alt={post.title} className="w-full rounded-2xl mb-8 shadow-md" />
            )}

            <div
              className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary"
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

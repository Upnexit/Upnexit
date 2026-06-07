import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowLeft, Tag, Clock, Star, Send, MessageCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  const [commentForm, setCommentForm] = useState({ name: '', email: '', comment: '', rating: 5 });

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).eq('is_published', true).single();
      if (error) throw error;
      return data;
    },
  });

  const { data: comments } = useQuery({
    queryKey: ['blog-comments', post?.id],
    enabled: !!post?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', post!.id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const submitComment = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('blog_comments').insert({
        blog_post_id: post!.id,
        name: commentForm.name,
        email: commentForm.email,
        comment: commentForm.comment,
        rating: commentForm.rating,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('আপনার মন্তব্য জমা হয়েছে! অনুমোদনের পর প্রদর্শিত হবে।');
      setCommentForm({ name: '', email: '', comment: '', rating: 5 });
      queryClient.invalidateQueries({ queryKey: ['blog-comments', post?.id] });
    },
    onError: () => toast.error('মন্তব্য জমা দিতে সমস্যা হয়েছে'),
  });

  const readingTime = post ? Math.max(1, Math.ceil(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)) : 0;

  // Related posts
  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', post?.id],
    enabled: !!post,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, cover_image, published_at, excerpt')
        .eq('is_published', true)
        .neq('id', post!.id)
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-5 bg-muted rounded w-24" />
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-72 bg-muted rounded-2xl" />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `https://upnexit.pro.bd/blog/${post.slug}#article`,
            "headline": post.title,
            "name": post.title,
            "description": post.excerpt || post.title,
            "image": {
              "@type": "ImageObject",
              "url": post.cover_image || "https://upnexit.pro.bd/og-image.jpg",
              "width": 1200,
              "height": 630,
            },
            "author": {
              "@type": "Person",
              "name": post.author,
              "url": "https://upnexit.pro.bd/about/mehedi-hasan",
            },
            "publisher": {
              "@type": "Organization",
              "name": "Upnex It",
              "url": "https://upnexit.pro.bd",
              "logo": { "@type": "ImageObject", "url": "https://upnexit.pro.bd/logo.png" }
            },
            "datePublished": post.published_at,
            "dateModified": post.updated_at || post.published_at,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://upnexit.pro.bd/blog/${post.slug}`,
            },
            "url": `https://upnexit.pro.bd/blog/${post.slug}`,
            "keywords": post.tags?.join(', '),
            "articleSection": post.tags?.[0] || 'Software',
            "inLanguage": 'bn-BD',
            "wordCount": post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length : undefined,
            "isPartOf": { "@type": "Blog", "@id": "https://upnexit.pro.bd/blog#blog", "name": "Upnex It Blog" }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upnexit.pro.bd" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://upnexit.pro.bd/blog" },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://upnexit.pro.bd/blog/${post.slug}` },
            ]
          })
        }}
      />
      <Navbar />

      {/* Cover Image Hero */}
      {post.cover_image && (
        <div className="relative pt-20">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <img src={post.cover_image} alt={post.title} className="w-full aspect-[21/9] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-4 transition-colors font-medium">
                    <ArrowLeft className="h-4 w-4" /> ব্লগে ফিরুন
                  </Link>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                          <Tag className="h-3 w-3" />{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight max-w-3xl">
                    {post.title}
                  </h1>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <article className="relative pt-8 pb-12 px-4">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            {/* If no cover image, show title normally */}
            {!post.cover_image && (
              <>
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
              </>
            )}

            {/* Author & Meta Bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-10 p-4 rounded-2xl bg-card border border-border">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{post.author}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  {post.published_at && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.published_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {readingTime} মিনিট পড়ার সময়
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-blockquote:border-primary/30 prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-li:marker:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share & CTA */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/10 text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">আপনার প্রতিষ্ঠানের জন্যও সফটওয়্যার দরকার?</h3>
              <p className="text-sm text-muted-foreground mb-4">আজই আমাদের সাথে যোগাযোগ করুন এবং বিনামূল্যে পরামর্শ নিন</p>
              <Link to="/contact">
                <Button variant="hero" size="lg">যোগাযোগ করুন</Button>
              </Link>
            </div>

            {/* Comments Section */}
            <div className="mt-14">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                মন্তব্য ও রিভিউ
                {comments && comments.length > 0 && (
                  <span className="text-sm font-normal text-muted-foreground">({comments.length}টি)</span>
                )}
              </h3>

              {/* Comment Form */}
              <div className="p-6 rounded-2xl bg-card border border-border mb-8">
                <h4 className="font-semibold text-foreground mb-4">আপনার মতামত দিন</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      aria-label="আপনার নাম"
                      placeholder="আপনার নাম *"
                      value={commentForm.name}
                      onChange={e => setCommentForm(f => ({ ...f, name: e.target.value }))}
                    />
                    <Input
                      aria-label="আপনার ইমেইল"
                      placeholder="আপনার ইমেইল *"
                      type="email"
                      value={commentForm.email}
                      onChange={e => setCommentForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">রেটিং:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`${star} star${star > 1 ? 's' : ''}`}
                          onClick={() => setCommentForm(f => ({ ...f, rating: star }))}
                          className="transition-transform hover:scale-110"
                        >
                          <Star className={`h-5 w-5 ${star <= commentForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Textarea
                    aria-label="আপনার মন্তব্য"
                    placeholder="আপনার মন্তব্য লিখুন... *"
                    rows={4}
                    value={commentForm.comment}
                    onChange={e => setCommentForm(f => ({ ...f, comment: e.target.value }))}
                  />
                  <Button
                    onClick={() => submitComment.mutate()}
                    disabled={!commentForm.name || !commentForm.email || !commentForm.comment || submitComment.isPending}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {submitComment.isPending ? 'জমা হচ্ছে...' : 'মন্তব্য জমা দিন'}
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              {comments && comments.length > 0 && (
                <div className="space-y-4">
                  {comments.map((c: any) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl bg-card border border-border"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{c.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(c.created_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`h-3.5 w-3.5 ${s <= c.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/20'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-12">{c.comment}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="mt-14">
                <h3 className="text-xl font-bold text-foreground mb-6">আরও পড়ুন</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map(rp => (
                    <Link key={rp.id} to={`/blog/${rp.slug}`} className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all">
                      {rp.cover_image ? (
                        <div className="aspect-video overflow-hidden bg-muted">
                          <img src={rp.cover_image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-primary/20" />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">{rp.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;

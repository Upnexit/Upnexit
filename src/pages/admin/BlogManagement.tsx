import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string;
  tags: string[] | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string | null;
}

const defaultPost = { title: '', slug: '', excerpt: '', content: '', cover_image: '', author: 'Upnex It', tags: '', is_published: false };

const BlogManagement = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(defaultPost);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: form.excerpt || null,
        content: form.content,
        cover_image: form.cover_image || null,
        author: form.author || 'Upnex It',
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        is_published: form.is_published,
        published_at: form.is_published ? new Date().toISOString() : null,
      };
      if (editing) {
        const { error } = await supabase.from('blog_posts').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success(editing ? 'পোস্ট আপডেট হয়েছে' : 'পোস্ট তৈরি হয়েছে');
      setOpen(false);
      setEditing(null);
      setForm(defaultPost);
    },
    onError: () => toast.error('সমস্যা হয়েছে'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('পোস্ট মুছে ফেলা হয়েছে');
    },
  });

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      cover_image: post.cover_image || '',
      author: post.author,
      tags: post.tags?.join(', ') || '',
      is_published: post.is_published ?? false,
    });
    setOpen(true);
  };

  const openNew = () => {
    setEditing(null);
    setForm(defaultPost);
    setOpen(true);
  };

  return (
    <div>
      <AdminPageHeader
        title="ব্লগ ম্যানেজমেন্ট"
        subtitle="ব্লগ পোস্ট তৈরি ও পরিচালনা করুন"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="gap-1.5"><Plus className="h-4 w-4" /> নতুন পোস্ট</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'পোস্ট সম্পাদনা' : 'নতুন পোস্ট'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>শিরোনাম *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="পোস্টের শিরোনাম" />
              </div>
              <div>
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="auto-generated-from-title" />
              </div>
              <div>
                <Label>সংক্ষিপ্ত বিবরণ</Label>
                <Textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} placeholder="সংক্ষিপ্ত বিবরণ..." />
              </div>
              <div>
                <Label>কন্টেন্ট (HTML) *</Label>
                <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={10} placeholder="<p>আপনার কন্টেন্ট লিখুন...</p>" />
              </div>
              <div>
                <Label>কভার ইমেজ URL</Label>
                <Input value={form.cover_image} onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <Label>লেখক</Label>
                <Input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
              </div>
              <div>
                <Label>ট্যাগ (কমা দিয়ে আলাদা)</Label>
                <Input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="software, school, tips" />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_published} onCheckedChange={v => setForm(f => ({ ...f, is_published: v }))} />
                <Label>পাবলিশ করুন</Label>
              </div>
              <Button onClick={() => saveMutation.mutate()} disabled={!form.title || !form.content || saveMutation.isPending} className="w-full">
                {saveMutation.isPending ? 'সেভ হচ্ছে...' : editing ? 'আপডেট করুন' : 'তৈরি করুন'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {posts?.map(post => (
            <div key={post.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                  {post.is_published ? (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700"><Eye className="h-2.5 w-2.5" />Published</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700"><EyeOff className="h-2.5 w-2.5" />Draft</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">/{post.slug} • {post.author}</p>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <Button size="sm" variant="outline" onClick={() => openEdit(post)}><Pencil className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="destructive" onClick={() => { if (confirm('মুছে ফেলতে চান?')) deleteMutation.mutate(post.id); }}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
          {posts?.length === 0 && <p className="text-center text-muted-foreground py-8">কোনো পোস্ট নেই</p>}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;

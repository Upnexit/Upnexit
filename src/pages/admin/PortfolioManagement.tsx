import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  client_name: string | null;
  category: string | null;
  cover_image: string | null;
  screenshots: string[] | null;
  technologies: string[] | null;
  live_url: string | null;
  is_active: boolean | null;
  sort_order: number | null;
}

const defaultItem = { title: '', slug: '', description: '', client_name: '', category: '', cover_image: '', technologies: '', live_url: '', sort_order: 0, is_active: true };

const PortfolioManagement = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState(defaultItem);

  const { data: items, isLoading } = useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: async () => {
      const { data, error } = await supabase.from('portfolio_items').select('*').order('sort_order');
      if (error) throw error;
      return data as PortfolioItem[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: form.description || null,
        client_name: form.client_name || null,
        category: form.category || null,
        cover_image: form.cover_image || null,
        technologies: form.technologies ? form.technologies.split(',').map(t => t.trim()).filter(Boolean) : [],
        live_url: form.live_url || null,
        sort_order: form.sort_order,
        is_active: form.is_active,
      };
      if (editing) {
        const { error } = await supabase.from('portfolio_items').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('portfolio_items').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      toast.success(editing ? 'আপডেট হয়েছে' : 'তৈরি হয়েছে');
      setOpen(false);
      setEditing(null);
      setForm(defaultItem);
    },
    onError: () => toast.error('সমস্যা হয়েছে'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      toast.success('মুছে ফেলা হয়েছে');
    },
  });

  const openEdit = (item: PortfolioItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description || '',
      client_name: item.client_name || '',
      category: item.category || '',
      cover_image: item.cover_image || '',
      technologies: item.technologies?.join(', ') || '',
      live_url: item.live_url || '',
      sort_order: item.sort_order || 0,
      is_active: item.is_active ?? true,
    });
    setOpen(true);
  };

  const openNew = () => { setEditing(null); setForm(defaultItem); setOpen(true); };

  return (
    <div>
      <AdminPageHeader
        title="পোর্টফোলিও ম্যানেজমেন্ট"
        subtitle="প্রজেক্ট কেস স্টাডি পরিচালনা করুন"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="gap-1.5"><Plus className="h-4 w-4" /> নতুন প্রজেক্ট</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'প্রজেক্ট সম্পাদনা' : 'নতুন প্রজেক্ট'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>প্রজেক্ট নাম *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div><Label>Slug</Label><Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="auto-generated" /></div>
              <div><Label>বিবরণ</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
              <div><Label>ক্লায়েন্ট নাম</Label><Input value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} /></div>
              <div><Label>ক্যাটাগরি</Label><Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="School Software / Web App" /></div>
              <div><Label>কভার ইমেজ URL</Label><Input value={form.cover_image} onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))} /></div>
              <div><Label>টেকনোলজি (কমা দিয়ে)</Label><Input value={form.technologies} onChange={e => setForm(f => ({ ...f, technologies: e.target.value }))} placeholder="React, Node.js, PostgreSQL" /></div>
              <div><Label>লাইভ URL</Label><Input value={form.live_url} onChange={e => setForm(f => ({ ...f, live_url: e.target.value }))} /></div>
              <div><Label>সর্ট অর্ডার</Label><Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} /></div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={v => setForm(f => ({ ...f, is_active: v }))} />
                <Label>অ্যাক্টিভ</Label>
              </div>
              <Button onClick={() => saveMutation.mutate()} disabled={!form.title || saveMutation.isPending} className="w-full">
                {saveMutation.isPending ? 'সেভ হচ্ছে...' : editing ? 'আপডেট করুন' : 'তৈরি করুন'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[1, 2].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {items?.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.category} {item.client_name ? `• ${item.client_name}` : ''}</p>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <Button size="sm" variant="outline" onClick={() => openEdit(item)}><Pencil className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="destructive" onClick={() => { if (confirm('মুছে ফেলতে চান?')) deleteMutation.mutate(item.id); }}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
          {items?.length === 0 && <p className="text-center text-muted-foreground py-8">কোনো প্রজেক্ট নেই</p>}
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;

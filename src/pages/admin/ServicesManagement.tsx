import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const ServicesManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title_bn: '', title_en: '', description_bn: '', description_en: '', icon: 'Code2', is_active: true,
  });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*').order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editId) {
        const { error } = await supabase.from('services').update(form).eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert({ ...form, sort_order: services.length });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: '✅', description: 'সংরক্ষিত!' });
      resetForm();
    },
    onError: (err: any) => toast({ title: 'ত্রুটি', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('services').delete().eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: '✅', description: 'মুছে ফেলা হয়েছে!' });
    },
  });

  const resetForm = () => {
    setForm({ title_bn: '', title_en: '', description_bn: '', description_en: '', icon: 'Code2', is_active: true });
    setEditId(null);
    setOpen(false);
  };

  const startEdit = (s: any) => {
    setForm({
      title_bn: s.title_bn, title_en: s.title_en,
      description_bn: s.description_bn ?? '', description_en: s.description_en ?? '',
      icon: s.icon ?? 'Code2', is_active: s.is_active,
    });
    setEditId(s.id);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">সার্ভিস ম্যানেজমেন্ট</h1>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2"><Plus className="h-4 w-4" /> নতুন সার্ভিস</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? 'সার্ভিস সম্পাদনা' : 'নতুন সার্ভিস যোগ'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <Input placeholder="শিরোনাম (বাংলা)" value={form.title_bn} onChange={(e) => setForm({ ...form, title_bn: e.target.value })} required />
              <Input placeholder="Title (English)" value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} required />
              <Textarea placeholder="বিবরণ (বাংলা)" value={form.description_bn} onChange={(e) => setForm({ ...form, description_bn: e.target.value })} rows={3} />
              <Textarea placeholder="Description (English)" value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows={3} />
              <Input placeholder="আইকন নাম (যেমন: Code2, Monitor, Smartphone)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
              <div className="flex items-center gap-3">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <span className="text-sm">{form.is_active ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</span>
              </div>
              <Button type="submit" disabled={saveMutation.isPending} className="w-full">
                {saveMutation.isPending ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">লোড হচ্ছে...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">কোনো সার্ভিস নেই</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.id} className={`bg-background rounded-2xl border p-4 shadow-sm ${!s.is_active ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-foreground">{s.title_bn}</p>
                  <p className="text-xs text-muted-foreground">{s.title_en}</p>
                  {s.description_bn && <p className="text-sm text-muted-foreground mt-2">{s.description_bn}</p>}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(s)}><Edit2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(s.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;

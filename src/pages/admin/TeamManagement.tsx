import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit2, Upload, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  sort_order: number;
  is_founder: boolean;
}

const TeamManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', role: '', is_founder: false });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const uploadImage = async (file: File) => {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('team-photos').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('team-photos').getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = editId ? members.find(m => m.id === editId)?.image_url : null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      if (editId) {
        const { error } = await supabase.from('team_members').update({
          name: form.name,
          role: form.role,
          is_founder: form.is_founder,
          ...(imageUrl && { image_url: imageUrl }),
        }).eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('team_members').insert({
          name: form.name,
          role: form.role,
          is_founder: form.is_founder,
          image_url: imageUrl,
          sort_order: members.length,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: '✅', description: 'সফলভাবে সংরক্ষিত হয়েছে!' });
      resetForm();
    },
    onError: (err: any) => {
      toast({ title: 'ত্রুটি', description: err.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: '✅', description: 'মুছে ফেলা হয়েছে!' });
    },
  });

  const resetForm = () => {
    setForm({ name: '', role: '', is_founder: false });
    setImageFile(null);
    setEditId(null);
    setOpen(false);
  };

  const startEdit = (m: TeamMember) => {
    setForm({ name: m.name, role: m.role, is_founder: m.is_founder });
    setEditId(m.id);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">টিম ম্যানেজমেন্ট</h1>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2"><Plus className="h-4 w-4" /> নতুন সদস্য</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editId ? 'সদস্য সম্পাদনা' : 'নতুন সদস্য যোগ'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <Input placeholder="নাম" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input placeholder="পদবি (যেমন: সিইও, ডেভেলপার)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.is_founder} onChange={(e) => setForm({ ...form, is_founder: e.target.checked })} className="rounded" />
                ফাউন্ডার হিসেবে চিহ্নিত করুন
              </label>
              <div>
                <label className="block text-sm font-medium mb-2">ছবি</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} className="text-sm" />
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
      ) : members.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">কোনো টিম সদস্য নেই। উপরে "নতুন সদস্য" বাটনে ক্লিক করুন।</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <div key={m.id} className="bg-background rounded-2xl border border-border p-4 flex gap-4 items-center shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden shrink-0">
                {m.image_url ? (
                  <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-lg font-bold">
                    {m.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
                {m.is_founder && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Founder</span>}
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => startEdit(m)}><Edit2 className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(m.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamManagement;

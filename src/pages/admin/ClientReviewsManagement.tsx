import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Star, Save, Upload } from 'lucide-react';

const ClientReviewsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);
  const [newLogoPreview, setNewLogoPreview] = useState<string | null>(null);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['admin-client-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_reviews')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!newName.trim()) throw new Error('কোম্পানির নাম দিন');
      
      // Insert review first
      const { data: inserted, error } = await supabase.from('client_reviews').insert({
        company_name: newName.trim(),
        rating: newRating,
        sort_order: reviews.length,
      }).select().single();
      if (error) throw error;

      // Upload logo if provided
      if (newLogoFile && inserted) {
        const ext = newLogoFile.name.split('.').pop();
        const path = `client-logos/${inserted.id}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('team-photos')
          .upload(path, newLogoFile, { upsert: true });
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('team-photos').getPublicUrl(path);
          await supabase.from('client_reviews').update({ logo_url: publicUrl }).eq('id', inserted.id);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-client-reviews'] });
      setNewName('');
      setNewRating(5);
      setNewLogoFile(null);
      setNewLogoPreview(null);
      toast({ title: '✅', description: 'ক্লায়েন্ট যোগ হয়েছে!' });
    },
    onError: (err: any) => toast({ title: 'ত্রুটি', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('client_reviews').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-client-reviews'] });
      toast({ title: '🗑️', description: 'ক্লায়েন্ট মুছে ফেলা হয়েছে' });
    },
  });

  const updateRating = useMutation({
    mutationFn: async ({ id, rating }: { id: string; rating: number }) => {
      const { error } = await supabase.from('client_reviews').update({ rating }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-client-reviews'] }),
  });

  const uploadLogo = async (id: string, file: File) => {
    const ext = file.name.split('.').pop();
    const path = `client-logos/${id}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('team-photos')
      .upload(path, file, { upsert: true });
    if (uploadError) {
      toast({ title: 'ত্রুটি', description: uploadError.message, variant: 'destructive' });
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('team-photos').getPublicUrl(path);
    await supabase.from('client_reviews').update({ logo_url: publicUrl }).eq('id', id);
    queryClient.invalidateQueries({ queryKey: ['admin-client-reviews'] });
    toast({ title: '✅', description: 'লোগো আপলোড হয়েছে!' });
  };

  if (isLoading) return <div className="text-center py-12 text-muted-foreground">লোড হচ্ছে...</div>;

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-foreground mb-6">ক্লায়েন্ট রিভিউ ম্যানেজমেন্ট</h1>

      {/* Add new */}
      <div className="bg-background rounded-2xl border border-border p-4 md:p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-foreground mb-3">নতুন ক্লায়েন্ট যোগ করুন</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Logo upload preview */}
            <label className="shrink-0 cursor-pointer">
              {newLogoPreview ? (
                <img src={newLogoPreview} alt="Logo preview" className="w-11 h-11 rounded-xl object-contain border border-border" />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center border border-dashed border-primary/30 hover:bg-primary/15 transition-colors">
                  <Upload className="h-4 w-4 text-primary" />
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setNewLogoFile(f);
                  setNewLogoPreview(URL.createObjectURL(f));
                }
              }} />
            </label>
            <Input
              placeholder="কোম্পানির নাম"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="h-11 rounded-xl flex-1"
            />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setNewRating(s)}>
                  <Star className={`h-5 w-5 ${s <= newRating ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>
            <Button variant="hero" className="gap-2 w-full sm:w-auto" onClick={() => addMutation.mutate()} disabled={addMutation.isPending}>
              <Plus className="h-4 w-4" /> যোগ করুন
            </Button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="bg-background rounded-2xl border border-border p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Logo */}
            <div className="relative shrink-0">
              {review.logo_url ? (
                <img src={review.logo_url} alt={review.company_name} className="w-12 h-12 rounded-xl object-contain" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{review.company_name.charAt(0)}</span>
                </div>
              )}
              <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors">
                <Upload className="h-3 w-3 text-primary-foreground" />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadLogo(review.id, f);
                }} />
              </label>
            </div>

            {/* Name */}
            <span className="font-medium text-foreground flex-1 text-sm md:text-base">{review.company_name}</span>

            {/* Rating */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => updateRating.mutate({ id: review.id, rating: s })}>
                  <Star className={`h-4 w-4 ${s <= review.rating ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>

            {/* Delete */}
            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 shrink-0" onClick={() => deleteMutation.mutate(review.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-center text-muted-foreground py-8">কোনো ক্লায়েন্ট রিভিউ নেই</p>
        )}
      </div>
    </div>
  );
};

export default ClientReviewsManagement;

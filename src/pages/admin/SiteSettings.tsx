import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const settingsFields = [
  { key: 'company_name', label: 'কোম্পানির নাম' },
  { key: 'email', label: 'ইমেইল' },
  { key: 'phone', label: 'ফোন নম্বর' },
  { key: 'location_bn', label: 'ঠিকানা (বাংলা)' },
  { key: 'location_en', label: 'Address (English)' },
  { key: 'clients_count', label: 'ক্লায়েন্ট সংখ্যা (যেমন: 10+)' },
  { key: 'projects_count', label: 'প্রজেক্ট সংখ্যা (যেমন: 50+)' },
  { key: 'years_experience', label: 'অভিজ্ঞতা (যেমন: 2+)' },
  { key: 'youtube_video_id', label: 'YouTube Video ID' },
];

const SiteSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});

  const { data: settings = [], isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const map: Record<string, string> = {};
    settings.forEach((s) => { map[s.key] = s.value; });
    setValues(map);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      for (const [key, value] of Object.entries(values)) {
        const existing = settings.find((s) => s.key === key);
        if (existing) {
          await supabase.from('site_settings').update({ value }).eq('key', key);
        } else {
          await supabase.from('site_settings').insert({ key, value });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({ title: '✅', description: 'সেটিংস সংরক্ষিত!' });
    },
    onError: (err: any) => toast({ title: 'ত্রুটি', description: err.message, variant: 'destructive' }),
  });

  if (isLoading) return <div className="text-center py-12 text-muted-foreground">লোড হচ্ছে...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">ওয়েবসাইট সেটিংস</h1>
        <Button variant="hero" className="gap-2" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          <Save className="h-4 w-4" /> {saveMutation.isPending ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
        </Button>
      </div>

      <div className="bg-background rounded-2xl border border-border p-6 shadow-sm space-y-5 max-w-2xl">
        {settingsFields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
            <Input
              value={values[field.key] ?? ''}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="h-11 rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteSettings;

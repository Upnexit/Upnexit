import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save, Link2, User, Lock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const demoServices = [
  { key: 'school', label: 'School Management', icon: '🏫', color: 'bg-blue-500/10 text-blue-600' },
  { key: 'hospital', label: 'Hospital Management', icon: '🏥', color: 'bg-red-500/10 text-red-600' },
  { key: 'custom', label: 'Custom Software', icon: '⚙️', color: 'bg-purple-500/10 text-purple-600' },
  { key: 'web', label: 'Web Application', icon: '🌐', color: 'bg-primary/10 text-primary' },
];

const DemoLinksManagement = () => {
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
      const demoKeys = demoServices.flatMap(s => [
        `demo_url_${s.key}`, `demo_user_${s.key}`, `demo_pass_${s.key}`
      ]);
      for (const key of demoKeys) {
        const value = values[key] || '';
        const existing = settings.find((s) => s.key === key);
        if (existing) {
          await supabase.from('site_settings').update({ value }).eq('key', key);
        } else if (value) {
          await supabase.from('site_settings').insert({ key, value });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({ title: '✅', description: 'ডেমো লিংক সংরক্ষিত!' });
    },
    onError: (err: any) => toast({ title: 'ত্রুটি', description: err.message, variant: 'destructive' }),
  });

  if (isLoading) return <div className="text-center py-12 text-muted-foreground">লোড হচ্ছে...</div>;

  return (
    <div>
      <AdminPageHeader
        title="ডেমো লিংক ম্যানেজমেন্ট"
        subtitle="সার্ভিস ডেমো ক্রেডেনশিয়াল পরিচালনা"
        actions={
          <Button variant="hero" className="gap-2" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            <Save className="h-4 w-4" /> {saveMutation.isPending ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demoServices.map((service, i) => (
          <motion.div
            key={service.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-background rounded-2xl border border-border p-5 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className={`w-10 h-10 rounded-xl ${service.color} flex items-center justify-center text-lg`}>
                {service.icon}
              </span>
              <h3 className="font-bold text-foreground">{service.label}</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                  <ExternalLink className="h-3 w-3" /> ডেমো URL
                </label>
                <Input
                  value={values[`demo_url_${service.key}`] ?? ''}
                  onChange={(e) => setValues({ ...values, [`demo_url_${service.key}`]: e.target.value })}
                  placeholder="https://demo.example.com"
                  className="h-10 rounded-xl"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                  <User className="h-3 w-3" /> ইউজারনেম
                </label>
                <Input
                  value={values[`demo_user_${service.key}`] ?? ''}
                  onChange={(e) => setValues({ ...values, [`demo_user_${service.key}`]: e.target.value })}
                  placeholder="demo_user"
                  className="h-10 rounded-xl"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                  <Lock className="h-3 w-3" /> পাসওয়ার্ড
                </label>
                <Input
                  value={values[`demo_pass_${service.key}`] ?? ''}
                  onChange={(e) => setValues({ ...values, [`demo_pass_${service.key}`]: e.target.value })}
                  placeholder="demo_pass"
                  className="h-10 rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DemoLinksManagement;

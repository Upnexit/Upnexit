import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, Image as ImageIcon, Building2, Phone, BarChart3, Share2, Video, Radio, Loader2 } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { motion } from 'framer-motion';
import { useLogoUrl } from '@/hooks/useSiteSettings';

type FieldDef = { key: string; label: string; placeholder?: string; multiline?: boolean };

type Section = {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  gradient: string;
  fields: FieldDef[];
};

const sections: Section[] = [
  {
    id: 'company',
    title: 'কোম্পানি তথ্য',
    subtitle: 'মূল ব্র্যান্ড পরিচিতি — সাইট জুড়ে real-time আপডেট হবে',
    icon: Building2,
    gradient: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)',
    fields: [
      { key: 'company_name', label: 'কোম্পানির নাম', placeholder: 'Upnex It' },
      { key: 'tagline', label: 'ট্যাগলাইন / স্লোগান', placeholder: 'Bangladesh\'s leading software company' },
      { key: 'about_short', label: 'সংক্ষিপ্ত বিবরণ', placeholder: 'আমরা কাস্টম সফটওয়্যার তৈরি করি...', multiline: true },
    ],
  },
  {
    id: 'contact',
    title: 'যোগাযোগ তথ্য',
    subtitle: 'ইমেইল, ফোন, ঠিকানা — Footer, Contact, Schema-তে real-time',
    icon: Phone,
    gradient: 'linear-gradient(135deg, #f97316 0%, #f43f5e 100%)',
    fields: [
      { key: 'email', label: 'ইমেইল', placeholder: 'contact@upnexit.com' },
      { key: 'phone', label: 'ফোন নম্বর', placeholder: '+880 1XXX XXX XXX' },
      { key: 'whatsapp_number', label: 'WhatsApp নম্বর', placeholder: '+8801XXXXXXXXX' },
      { key: 'location_bn', label: 'ঠিকানা (বাংলা)', placeholder: 'সাপাহার, নওগাঁ, বাংলাদেশ' },
      { key: 'location_en', label: 'Address (English)', placeholder: 'Sapahar, Naogaon, Bangladesh' },
    ],
  },
  {
    id: 'stats',
    title: 'স্ট্যাটিস্টিক্স',
    subtitle: 'About / Hero সেকশনে দেখানো গণনাগুলো',
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    fields: [
      { key: 'clients_count', label: 'ক্লায়েন্ট সংখ্যা', placeholder: '10+' },
      { key: 'projects_count', label: 'প্রজেক্ট সংখ্যা', placeholder: '50+' },
      { key: 'years_experience', label: 'অভিজ্ঞতা (বছর)', placeholder: '2+' },
    ],
  },
  {
    id: 'social',
    title: 'সোশ্যাল মিডিয়া',
    subtitle: 'Footer ও Schema-তে ব্যবহৃত profile লিংক',
    icon: Share2,
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    fields: [
      { key: 'facebook_url', label: 'Facebook', placeholder: 'https://facebook.com/...' },
      { key: 'instagram_url', label: 'Instagram', placeholder: 'https://instagram.com/...' },
      { key: 'linkedin_url', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/...' },
      { key: 'youtube_url', label: 'YouTube চ্যানেল', placeholder: 'https://youtube.com/@...' },
    ],
  },
  {
    id: 'media',
    title: 'মিডিয়া',
    subtitle: 'হোমপেজের ভিডিও ও অন্যান্য মিডিয়া',
    icon: Video,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    fields: [
      { key: 'youtube_video_id', label: 'হোমপেজ YouTube Video ID', placeholder: 'GuXDGUQbawI' },
    ],
  },
];

const SiteSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const liveLogoUrl = useLogoUrl();
  const fileRef = useRef<HTMLInputElement>(null);

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
    settings.forEach((s: any) => { map[s.key] = s.value ?? ''; });
    setValues(map);
  }, [settings]);

  const upsert = async (key: string, value: string) => {
    const existing = settings.find((s: any) => s.key === key);
    if (existing) {
      await supabase.from('site_settings').update({ value }).eq('key', key);
    } else {
      await supabase.from('site_settings').insert({ key, value });
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      for (const [key, value] of Object.entries(values)) {
        await upsert(key, value);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      queryClient.invalidateQueries({ queryKey: ['site-settings-map'] });
      toast({ title: '✅ Realtime', description: 'সেটিংস live সাইটে আপডেট হয়েছে!' });
    },
    onError: (err: any) => toast({ title: 'ত্রুটি', description: err.message, variant: 'destructive' }),
  });

  const handleLogoUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ title: 'ত্রুটি', description: 'শুধু image ফাইল আপলোড করুন', variant: 'destructive' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'ত্রুটি', description: 'সর্বোচ্চ ৫ MB', variant: 'destructive' });
      return;
    }
    setUploadingLogo(true);
    try {
      const ext = file.name.split('.').pop() ?? 'png';
      const ts = Date.now();
      const path = `branding/logo-${ts}.${ext}`;
      const { error: upErr } = await supabase.storage.from('team-photos').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('team-photos').getPublicUrl(path);
      const url = data.publicUrl;
      // Persist both URL and a version stamp for cache-busting on every consumer
      await upsert('logo_url', url);
      await upsert('logo_version', String(ts));
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      queryClient.invalidateQueries({ queryKey: ['site-settings-map'] });
      setValues((v) => ({ ...v, logo_url: url, logo_version: String(ts) }));
      toast({ title: '✅ Logo আপডেট হয়েছে', description: 'পুরোনো logo automatically cache থেকে বাদ যাবে — সাইটে real-time প্রতিফলিত হবে।' });
    } catch (err: any) {
      toast({ title: 'ত্রুটি', description: err.message, variant: 'destructive' });
    } finally {
      setUploadingLogo(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="ওয়েবসাইট সেটিংস"
        subtitle="যেকোনো পরিবর্তন তৎক্ষণাৎ আপনার live ওয়েবসাইটে আপডেট হবে"
        actions={
          <>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60">
              <Radio className="h-3 w-3 text-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-700">Realtime Sync</span>
            </div>
            <Button variant="hero" className="gap-2" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saveMutation.isPending ? 'সংরক্ষণ হচ্ছে...' : 'সব সংরক্ষণ করুন'}
            </Button>
          </>
        }
      />

      {/* ── Logo / Branding Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden mb-5 shadow-md"
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
      >
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="relative p-5 md:p-6 text-white">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-9 w-9 rounded-xl bg-white/20 ring-1 ring-white/30 flex items-center justify-center">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">Logo ও ব্র্যান্ডিং</h2>
              <p className="text-[11px] text-white/80">নতুন logo আপলোড করলে পুরোনোটি cache থেকে স্বয়ংক্রিয়ভাবে বাদ যাবে এবং SEO meta + JSON-LD এও real-time আপডেট হবে।</p>
            </div>
          </div>
        </div>
        <div className="bg-background p-5 md:p-6 grid md:grid-cols-[auto,1fr] gap-5 items-center">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden shadow-inner">
              <img src={liveLogoUrl} alt="Current logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-0.5">বর্তমান Logo</p>
              <p>PNG / JPG / SVG — সর্বোচ্চ 5MB</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); e.target.value = ''; }}
            />
            <Button onClick={() => fileRef.current?.click()} disabled={uploadingLogo} className="gap-2" size="lg">
              {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {uploadingLogo ? 'আপলোড হচ্ছে...' : 'নতুন Logo আপলোড'}
            </Button>
          </div>
        </div>
      </motion.section>

      {/* ── Field Sections ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {sections.map((sec, i) => (
          <motion.section
            key={sec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * (i + 1) }}
            className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative p-4 md:p-5 text-white" style={{ background: sec.gradient }}>
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="relative flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-white/20 ring-1 ring-white/30 flex items-center justify-center">
                  <sec.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{sec.title}</h3>
                  <p className="text-[10px] text-white/80 leading-snug">{sec.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              {sec.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">{field.label}</label>
                  {field.multiline ? (
                    <Textarea
                      value={values[field.key] ?? ''}
                      placeholder={field.placeholder}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      className="rounded-xl text-sm min-h-[88px]"
                    />
                  ) : (
                    <Input
                      value={values[field.key] ?? ''}
                      placeholder={field.placeholder}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      className="h-10 rounded-xl text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="sticky bottom-4 mt-6 flex justify-end">
        <Button variant="hero" size="lg" className="gap-2 shadow-elevated" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saveMutation.isPending ? 'সংরক্ষণ হচ্ছে...' : 'সব পরিবর্তন সংরক্ষণ করুন'}
        </Button>
      </div>
    </div>
  );
};

export default SiteSettings;

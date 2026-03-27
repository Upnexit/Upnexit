import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ArrowLeft, ArrowRight, Building2, GraduationCap, ShoppingCart, Globe, Cpu, HelpCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { consultationFormSchema } from '@/lib/sanitize';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const serviceOptions = [
  { id: 'school', labelBn: 'স্কুল ম্যানেজমেন্ট সফটওয়্যার', labelEn: 'School Management Software', icon: GraduationCap, color: 'from-blue-500/20 to-blue-600/10 border-blue-300/40' },
  { id: 'hospital', labelBn: 'হসপিটাল ম্যানেজমেন্ট সফটওয়্যার', labelEn: 'Hospital Management Software', icon: Building2, color: 'from-rose-500/20 to-rose-600/10 border-rose-300/40' },
  { id: 'ecommerce', labelBn: 'ই-কমার্স ওয়েবসাইট', labelEn: 'E-Commerce Website', icon: ShoppingCart, color: 'from-amber-500/20 to-amber-600/10 border-amber-300/40' },
  { id: 'web', labelBn: 'ওয়েব অ্যাপ্লিকেশন', labelEn: 'Web Application', icon: Globe, color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-300/40' },
  { id: 'custom', labelBn: 'কাস্টম সফটওয়্যার', labelEn: 'Custom Software', icon: Cpu, color: 'from-violet-500/20 to-violet-600/10 border-violet-300/40' },
  { id: 'other', labelBn: 'অন্যান্য', labelEn: 'Other', icon: HelpCircle, color: 'from-slate-500/20 to-slate-600/10 border-slate-300/40' },
];

const Consultation = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?redirect=/consultation');
    }
  }, [user, authLoading, navigate]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = consultationFormSchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: '❌', description: parsed.error.errors[0]?.message || 'সঠিক তথ্য দিন', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const data = parsed.data;

    const serviceName = serviceOptions.find(s => s.id === selectedService);
    const subjectLabel = lang === 'bn' ? serviceName?.labelBn : serviceName?.labelEn;
    const fullMessage = `[${subjectLabel}]\n\n${data.message || ''}`;

    const { error } = await supabase.from('messages').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: fullMessage,
    });

    supabase.functions.invoke('send-notification', {
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        message: form.message.trim(),
        service: subjectLabel,
      },
    }).catch(console.error);

    setLoading(false);

    if (error) {
      toast({
        title: '❌',
        description: lang === 'bn' ? 'বার্তা পাঠাতে ব্যর্থ হয়েছে' : 'Failed to send message',
        variant: 'destructive',
      });
    } else {
      setSubmitted(true);
    }
  };

  const canProceedStep1 = selectedService !== '';
  const canProceedStep2 = form.name.trim() !== '' && form.email.trim() !== '';

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20 pb-32 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {lang === 'bn' ? 'ধন্যবাদ! 🎉' : 'Thank you! 🎉'}
            </h2>
            <p className="text-lg text-foreground mb-1">
              {lang === 'bn' ? 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে' : 'Your message has been sent successfully'}
            </p>
            <p className="text-muted-foreground mb-8">
              {lang === 'bn'
                ? 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।'
                : 'We will contact you shortly.'}
            </p>
            <Link to="/">
              <Button variant="hero" size="lg" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {lang === 'bn' ? 'হোমে ফিরুন' : 'Back to Home'}
              </Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-32 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10" style={{
          background: 'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 25%, hsl(46 80% 96%) 55%, hsl(145 45% 94%) 100%)'
        }} />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <MessageSquare className="h-4 w-4" />
              {lang === 'bn' ? '১০০% বিনামূল্যে' : '100% Free'}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-3">
              {lang === 'bn' ? 'ফ্রি কনসালটেশন' : 'Free Consultation'}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
              {lang === 'bn'
                ? 'আপনার প্রজেক্ট সম্পর্কে আমাদের জানান। আমরা আপনাকে সেরা সমাধান দেওয়ার চেষ্টা করব।'
                : 'Tell us about your project. We will try to provide you with the best solution.'}
            </p>
          </motion.div>

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (s === 1) setStep(1);
                    else if (s === 2 && canProceedStep1) setStep(2);
                    else if (s === 3 && canProceedStep1 && canProceedStep2) setStep(3);
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step >= s
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s}
                </button>
                {s < 3 && (
                  <div className={`w-12 sm:w-20 h-0.5 rounded-full transition-colors duration-300 ${
                    step > s ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-background/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-border shadow-lg"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                    {lang === 'bn' ? '🎯 আপনি কোন সেবা চান?' : '🎯 What service do you need?'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {lang === 'bn' ? 'একটি নির্বাচন করুন' : 'Select one option'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceOptions.map((service, i) => {
                      const Icon = service.icon;
                      const isSelected = selectedService === service.id;
                      return (
                        <motion.button
                          key={service.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          type="button"
                          onClick={() => setSelectedService(service.id)}
                          className={`group relative flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                            isSelected
                              ? `bg-gradient-to-br ${service.color} border-primary/40 ring-2 ring-primary/20 shadow-md`
                              : 'bg-muted/30 border-transparent hover:border-border hover:bg-muted/60'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'bg-primary text-primary-foreground shadow-md'
                              : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className={`font-semibold text-sm transition-colors ${
                            isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                          }`}>
                            {lang === 'bn' ? service.labelBn : service.labelEn}
                          </span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end mt-8">
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      className="gap-2 px-8"
                    >
                      {lang === 'bn' ? 'পরবর্তী' : 'Next'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Info */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                    {lang === 'bn' ? '👤 আপনার তথ্য দিন' : '👤 Your Information'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {lang === 'bn' ? 'আমরা আপনার সাথে যোগাযোগ করতে পারি' : 'So we can get in touch with you'}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <User className="h-4 w-4 text-primary" />
                        {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                      </label>
                      <Input
                        required
                        placeholder={lang === 'bn' ? 'নাম লিখুন' : 'Enter your name'}
                        className="bg-muted/40 border-border h-12 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Mail className="h-4 w-4 text-primary" />
                        {lang === 'bn' ? 'ইমেইল *' : 'Email *'}
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder={lang === 'bn' ? 'ইমেইল লিখুন' : 'Enter your email'}
                        className="bg-muted/40 border-border h-12 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Phone className="h-4 w-4 text-primary" />
                        {lang === 'bn' ? 'ফোন নম্বর (ঐচ্ছিক)' : 'Phone Number (optional)'}
                      </label>
                      <Input
                        placeholder={lang === 'bn' ? 'ফোন নম্বর লিখুন' : 'Enter phone number'}
                        className="bg-muted/40 border-border h-12 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" size="lg" onClick={() => setStep(1)} className="gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      {lang === 'bn' ? 'পূর্ববর্তী' : 'Previous'}
                    </Button>
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                      className="gap-2 px-8"
                    >
                      {lang === 'bn' ? 'পরবর্তী' : 'Next'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Message */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                    {lang === 'bn' ? '💬 আপনার প্রজেক্ট সম্পর্কে বলুন' : '💬 Tell us about your project'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {lang === 'bn' ? 'যত বেশি জানাবেন, তত ভালো সমাধান পাবেন' : 'The more you share, the better solution we can provide'}
                  </p>

                  {/* Selected summary */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {(() => {
                        const s = serviceOptions.find(o => o.id === selectedService);
                        const Icon = s?.icon || HelpCircle;
                        return <><Icon className="h-3 w-3" />{lang === 'bn' ? s?.labelBn : s?.labelEn}</>;
                      })()}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      <User className="h-3 w-3" />{form.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      <Mail className="h-3 w-3" />{form.email}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <Textarea
                      required
                      rows={6}
                      placeholder={lang === 'bn' ? 'আপনার প্রজেক্ট সম্পর্কে বিস্তারিত লিখুন...\n\nযেমন:\n• কী ধরনের ফিচার চান?\n• কতজন ইউজার ব্যবহার করবে?\n• কোনো রেফারেন্স ওয়েবসাইট আছে?' : 'Describe your project in detail...\n\nFor example:\n• What features do you need?\n• How many users will use it?\n• Any reference websites?'}
                      className="bg-muted/40 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none text-sm"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" size="lg" onClick={() => setStep(2)} type="button" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        {lang === 'bn' ? 'পূর্ববর্তী' : 'Previous'}
                      </Button>
                      <Button variant="hero" size="lg" type="submit" disabled={loading} className="gap-2 px-8">
                        <Send className="h-4 w-4" />
                        {loading
                          ? (lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...')
                          : (lang === 'bn' ? 'রিকোয়েস্ট পাঠান' : 'Send Request')}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              {lang === 'bn' ? '১০০% বিনামূল্যে' : '100% Free'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              {lang === 'bn' ? '২৪ ঘণ্টায় রেসপন্স' : '24h Response'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              {lang === 'bn' ? 'কোনো বাধ্যবাধকতা নেই' : 'No Obligation'}
            </span>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Consultation;

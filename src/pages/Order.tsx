import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle2, ArrowRight, ArrowLeft, User, Phone, Mail,
  Building2, Package, CreditCard, Shield, Clock, Headphones,
  GraduationCap, HeartPulse, Code, Globe, Sparkles
} from 'lucide-react';

const serviceInfo: Record<string, { icon: any; name_bn: string; name_en: string; color: string }> = {
  school: { icon: GraduationCap, name_bn: 'স্কুল ম্যানেজমেন্ট সফটওয়্যার', name_en: 'School Management Software', color: 'hsl(145, 63%, 42%)' },
  hospital: { icon: HeartPulse, name_bn: 'হসপিটাল ম্যানেজমেন্ট সফটওয়্যার', name_en: 'Hospital Management Software', color: 'hsl(0, 72%, 51%)' },
  custom: { icon: Code, name_bn: 'কাস্টম সফটওয়্যার', name_en: 'Custom Software', color: 'hsl(250, 60%, 50%)' },
  web: { icon: Globe, name_bn: 'ওয়েব অ্যাপ্লিকেশন', name_en: 'Web Application', color: 'hsl(200, 80%, 50%)' },
};

const Order = () => {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const service = searchParams.get('service') || 'school';
  const plan = searchParams.get('plan') || 'gold';
  const info = serviceInfo[service] || serviceInfo.school;
  const ServiceIcon = info.icon;

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    institution: '',
    address: '',
    details: '',
  });

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const canNext = () => {
    if (step === 1) return true;
    if (step === 2) return form.name && form.phone;
    return true;
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      toast({ title: isBn ? 'দয়া করে নাম ও ফোন নম্বর দিন' : 'Please provide name and phone', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from('messages').insert({
        name: form.name,
        email: form.email || `${form.phone}@order.com`,
        phone: form.phone,
        message: `[ORDER] Service: ${info.name_en} | Plan: ${plan.toUpperCase()} | Institution: ${form.institution} | Address: ${form.address} | Details: ${form.details}`,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({ title: isBn ? 'কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন' : 'Something went wrong', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: isBn ? 'প্যাকেজ নিশ্চিত' : 'Confirm Package', icon: Package },
    { num: 2, label: isBn ? 'তথ্য দিন' : 'Your Info', icon: User },
    { num: 3, label: isBn ? 'অর্ডার সম্পন্ন' : 'Complete', icon: CheckCircle2 },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 flex items-center justify-center px-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
              {isBn ? 'অর্ডার সফলভাবে সম্পন্ন!' : 'Order Placed Successfully!'}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8">
              {isBn ? 'আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।' : 'Our team will contact you very soon.'}
            </p>
            <Link to="/">
              <Button variant="hero" size="lg">{isBn ? 'হোমে ফিরুন' : 'Back to Home'}</Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero header */}
      <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-muted/40" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-bold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              {isBn ? 'অর্ডার ফর্ম' : 'Order Form'}
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-foreground mb-2">
              {isBn ? 'আপনার অর্ডার' : 'Place Your'}{' '}
              <span className="text-gradient">{isBn ? 'সম্পন্ন করুন' : 'Order'}</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              {isBn ? 'নিচের ফর্মটি পূরণ করে আপনার অর্ডার কনফার্ম করুন' : 'Fill in the form below to confirm your order'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center gap-0 max-w-lg mx-auto">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all ${step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <s.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-[10px] sm:text-xs font-bold hidden sm:inline">{s.label}</span>
                  <span className="text-[10px] font-bold sm:hidden">{s.num}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-6 sm:w-10 h-0.5 ${step > s.num ? 'bg-primary' : 'bg-border'} transition-all`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="pb-12 sm:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">

              {/* Step 1 - Package Confirmation */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="bg-background rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 shadow-elevated">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    {isBn ? 'আপনার নির্বাচিত প্যাকেজ' : 'Your Selected Package'}
                  </h3>

                  {/* Selected package card */}
                  <div className="rounded-xl sm:rounded-2xl border-2 border-primary/20 bg-primary/5 p-4 sm:p-6 mb-6">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center" style={{ background: info.color + '20' }}>
                        <ServiceIcon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: info.color }} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-lg text-foreground">{isBn ? info.name_bn : info.name_en}</h4>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-white ${plan === 'gold' ? 'bg-amber-500' : 'bg-blue-500'}`}>
                          {plan === 'gold' ? (isBn ? 'গোল্ড প্ল্যান' : 'Gold Plan') : (isBn ? 'সিলভার প্ল্যান' : 'Silver Plan')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { icon: Shield, text: isBn ? 'নিরাপদ' : 'Secure' },
                        { icon: Clock, text: isBn ? 'দ্রুত সেটআপ' : 'Fast Setup' },
                        { icon: Headphones, text: isBn ? 'সাপোর্ট' : 'Support' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                          <item.icon className="h-3 w-3 text-primary shrink-0" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="hero" size="lg" onClick={() => setStep(2)} className="text-sm px-8">
                      {isBn ? 'পরবর্তী' : 'Next'} <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 - Contact Info */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="bg-background rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 shadow-elevated">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    {isBn ? 'আপনার তথ্য দিন' : 'Your Information'}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 block">
                        {isBn ? 'আপনার নাম' : 'Your Name'} <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder={isBn ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter your full name'}
                          value={form.name} onChange={e => updateField('name', e.target.value)}
                          className="pl-10 h-11 sm:h-12 rounded-xl" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 block">
                        {isBn ? 'ফোন নম্বর' : 'Phone Number'} <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder={isBn ? '০১XXXXXXXXX' : '01XXXXXXXXX'}
                          value={form.phone} onChange={e => updateField('phone', e.target.value)}
                          className="pl-10 h-11 sm:h-12 rounded-xl" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 block">
                        {isBn ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder={isBn ? 'আপনার ইমেইল' : 'Your email'}
                          value={form.email} onChange={e => updateField('email', e.target.value)}
                          className="pl-10 h-11 sm:h-12 rounded-xl" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 block">
                        {isBn ? 'প্রতিষ্ঠানের নাম (ঐচ্ছিক)' : 'Institution Name (Optional)'}
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder={isBn ? 'প্রতিষ্ঠানের নাম লিখুন' : 'Institution name'}
                          value={form.institution} onChange={e => updateField('institution', e.target.value)}
                          className="pl-10 h-11 sm:h-12 rounded-xl" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 block">
                        {isBn ? 'ঠিকানা (ঐচ্ছিক)' : 'Address (Optional)'}
                      </label>
                      <Input placeholder={isBn ? 'আপনার ঠিকানা' : 'Your address'}
                        value={form.address} onChange={e => updateField('address', e.target.value)}
                        className="h-11 sm:h-12 rounded-xl" />
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 block">
                        {isBn ? 'অতিরিক্ত তথ্য (ঐচ্ছিক)' : 'Additional Details (Optional)'}
                      </label>
                      <Textarea placeholder={isBn ? 'আপনার কোনো বিশেষ চাহিদা থাকলে লিখুন' : 'Any special requirements'}
                        value={form.details} onChange={e => updateField('details', e.target.value)}
                        className="rounded-xl min-h-[80px]" />
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl">
                      <ArrowLeft className="h-4 w-4 mr-1" /> {isBn ? 'পেছনে' : 'Back'}
                    </Button>
                    <Button variant="hero" size="lg" onClick={() => { if (canNext()) setStep(3); }}
                      disabled={!form.name || !form.phone} className="text-sm px-8">
                      {isBn ? 'পরবর্তী' : 'Next'} <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 - Review & Confirm */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  className="bg-background rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 shadow-elevated">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    {isBn ? 'অর্ডার রিভিউ' : 'Order Review'}
                  </h3>

                  <div className="space-y-3 sm:space-y-4 mb-6">
                    {/* Package summary */}
                    <div className="rounded-xl bg-muted/50 border border-border p-4">
                      <p className="text-xs text-muted-foreground mb-1">{isBn ? 'প্যাকেজ' : 'Package'}</p>
                      <div className="flex items-center gap-2">
                        <ServiceIcon className="h-4 w-4" style={{ color: info.color }} />
                        <span className="font-bold text-sm text-foreground">{isBn ? info.name_bn : info.name_en}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold text-white ${plan === 'gold' ? 'bg-amber-500' : 'bg-blue-500'}`}>
                          {plan === 'gold' ? 'Gold' : 'Silver'}
                        </span>
                      </div>
                    </div>

                    {/* User info summary */}
                    <div className="rounded-xl bg-muted/50 border border-border p-4 space-y-2">
                      <p className="text-xs text-muted-foreground mb-1">{isBn ? 'আপনার তথ্য' : 'Your Info'}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-[10px] text-muted-foreground">{isBn ? 'নাম' : 'Name'}</span>
                          <p className="font-semibold text-foreground text-xs sm:text-sm">{form.name}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground">{isBn ? 'ফোন' : 'Phone'}</span>
                          <p className="font-semibold text-foreground text-xs sm:text-sm">{form.phone}</p>
                        </div>
                        {form.email && (
                          <div>
                            <span className="text-[10px] text-muted-foreground">{isBn ? 'ইমেইল' : 'Email'}</span>
                            <p className="font-semibold text-foreground text-xs sm:text-sm">{form.email}</p>
                          </div>
                        )}
                        {form.institution && (
                          <div>
                            <span className="text-[10px] text-muted-foreground">{isBn ? 'প্রতিষ্ঠান' : 'Institution'}</span>
                            <p className="font-semibold text-foreground text-xs sm:text-sm">{form.institution}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)} className="rounded-xl">
                      <ArrowLeft className="h-4 w-4 mr-1" /> {isBn ? 'পেছনে' : 'Back'}
                    </Button>
                    <Button variant="hero" size="lg" onClick={handleSubmit} disabled={submitting} className="text-sm px-8">
                      {submitting ? (isBn ? 'প্রসেসিং...' : 'Processing...') : (isBn ? 'অর্ডার কনফার্ম করুন' : 'Confirm Order')}
                      {!submitting && <CheckCircle2 className="h-4 w-4 ml-1" />}
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Order;

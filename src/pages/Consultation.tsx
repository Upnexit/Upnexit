import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const serviceOptions = [
  { id: 'school', labelBn: 'স্কুল ম্যানেজমেন্ট সফটওয়্যার', labelEn: 'School Management Software' },
  { id: 'hospital', labelBn: 'হসপিটাল ম্যানেজমেন্ট সফটওয়্যার', labelEn: 'Hospital Management Software' },
  { id: 'ecommerce', labelBn: 'ই-কমার্স ওয়েবসাইট', labelEn: 'E-Commerce Website' },
  { id: 'web', labelBn: 'ওয়েব অ্যাপ্লিকেশন', labelEn: 'Web Application' },
  { id: 'custom', labelBn: 'কাস্টম সফটওয়্যার', labelEn: 'Custom Software' },
  { id: 'other', labelBn: 'অন্যান্য', labelEn: 'Other' },
];

const Consultation = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      toast({
        title: lang === 'bn' ? '⚠️ বিষয় নির্বাচন করুন' : '⚠️ Select a subject',
        description: lang === 'bn' ? 'অনুগ্রহ করে একটি সেবা নির্বাচন করুন' : 'Please select a service type',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const serviceName = serviceOptions.find(s => s.id === selectedService);
    const subjectLabel = lang === 'bn' ? serviceName?.labelBn : serviceName?.labelEn;
    const fullMessage = `[${subjectLabel}]\n\n${form.message.trim()}`;

    const { error } = await supabase.from('messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: fullMessage,
    });

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
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {lang === 'bn' ? 'ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে' : 'Thank you! Your message has been sent'}
            </h2>
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
      <div className="min-h-screen pt-24 pb-32 px-4" style={{
        background: 'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 25%, hsl(46 80% 96%) 55%, hsl(145 45% 94%) 100%)'
      }}>
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4">
              {lang === 'bn' ? 'ফ্রি কনসালটেশন' : 'Free Consultation'}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
              {lang === 'bn'
                ? 'আপনার প্রজেক্ট সম্পর্কে আমাদের জানান। আমরা আপনাকে সেরা সমাধান দেওয়ার চেষ্টা করব।'
                : 'Tell us about your project. We will try to provide you with the best solution.'}
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-card space-y-6"
          >
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                {lang === 'bn' ? 'আপনি কোন সেবা চান? *' : 'What service do you need? *'}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {serviceOptions.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left ${
                      selectedService === service.id
                        ? 'bg-primary/10 border-primary/30 text-primary ring-2 ring-primary/20'
                        : 'bg-muted/50 border-border text-muted-foreground hover:border-primary/20 hover:bg-muted'
                    }`}
                  >
                    {lang === 'bn' ? service.labelBn : service.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                </label>
                <Input
                  required
                  placeholder={lang === 'bn' ? 'নাম লিখুন' : 'Enter your name'}
                  className="bg-muted/50 border-border h-12 rounded-xl focus:border-primary"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {lang === 'bn' ? 'ইমেইল *' : 'Email *'}
                </label>
                <Input
                  type="email"
                  required
                  placeholder={lang === 'bn' ? 'ইমেইল লিখুন' : 'Enter your email'}
                  className="bg-muted/50 border-border h-12 rounded-xl focus:border-primary"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {lang === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}
              </label>
              <Input
                placeholder={lang === 'bn' ? 'ফোন নম্বর লিখুন' : 'Enter phone number'}
                className="bg-muted/50 border-border h-12 rounded-xl focus:border-primary"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {lang === 'bn' ? 'আপনার বার্তা *' : 'Your Message *'}
              </label>
              <Textarea
                required
                rows={5}
                placeholder={lang === 'bn' ? 'আপনার প্রজেক্ট সম্পর্কে বিস্তারিত লিখুন...' : 'Describe your project in detail...'}
                className="bg-muted/50 border-border rounded-xl focus:border-primary resize-none"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <Button variant="hero" size="lg" type="submit" disabled={loading} className="gap-2 w-full">
              <Send className="h-4 w-4" />
              {loading
                ? (lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...')
                : (lang === 'bn' ? 'কনসালটেশন রিকোয়েস্ট পাঠান' : 'Send Consultation Request')}
            </Button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Consultation;

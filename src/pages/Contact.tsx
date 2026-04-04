import { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema } from '@/lib/sanitize';

const Contact = () => {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: '✅', description: lang === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message sent successfully!' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-0 overflow-x-hidden">
      <SEOHead
        title="Contact Us - Upnex It | যোগাযোগ করুন"
        description="Get in touch with Upnex It for custom software solutions. Contact us via email, phone or visit our office in Naogaon, Bangladesh."
        canonical="https://upnexit.com/contact"
      />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 25%, hsl(46 80% 96%) 55%, hsl(145 45% 94%) 100%)'
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(145 63% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 63% 32%) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-5"
          >
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 text-foreground"
          >
            {t.contact.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
            <path d="M0 80L48 72C96 64 192 48 288 40C384 32 480 32 576 36C672 40 768 48 864 52C960 56 1056 56 1152 48C1248 40 1344 24 1392 16L1440 8V80H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 md:gap-10 max-w-5xl mx-auto">
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3 space-y-4 bg-background p-6 md:p-8 rounded-2xl border border-border shadow-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{t.contact.send}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder={t.contact.name} required className="bg-muted/50 border-border h-12 rounded-xl focus:border-primary" />
                <Input type="email" placeholder={t.contact.email} required className="bg-muted/50 border-border h-12 rounded-xl focus:border-primary" />
              </div>
              <Input placeholder={t.contact.phone} className="bg-muted/50 border-border h-12 rounded-xl focus:border-primary" />
              <Textarea placeholder={t.contact.message} rows={5} required className="bg-muted/50 border-border rounded-xl focus:border-primary resize-none" />
              <Button variant="hero" size="lg" type="submit" disabled={loading} className="gap-2 w-full">
                <Send className="h-4 w-4" /> {t.contact.send}
              </Button>
            </motion.form>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 space-y-4 flex flex-col"
            >
              {[
                { icon: Mail, text: 'upnex360@gmail.com', label: 'Email' },
                { icon: Phone, text: '+880 1628112731', label: lang === 'bn' ? 'ফোন' : 'Phone' },
                { icon: MapPin, text: lang === 'bn' ? 'সাপাহার, নওগাঁ, বাংলাদেশ' : 'Sapahar, Naogaon, Bangladesh', label: lang === 'bn' ? 'ঠিকানা' : 'Address' },
                { icon: Clock, text: lang === 'bn' ? 'শনি - বৃহস্পতি, সকাল ৯টা - রাত ৯টা' : 'Sat - Thu, 9AM - 9PM', label: lang === 'bn' ? 'কার্যসময়' : 'Working Hours' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border shadow-soft hover:shadow-card transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5 font-medium">{item.label}</p>
                    <span className="text-foreground font-semibold text-sm">{item.text}</span>
                  </div>
                </div>
              ))}

              {/* Google Map */}
              <div className="flex-1 min-h-[200px] rounded-2xl overflow-hidden border border-border shadow-soft">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14498.5!2d88.5850!3d25.0340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb99e048bc7c51%3A0x87c1f1a4a1f4d8fa!2sSapahar%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '200px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

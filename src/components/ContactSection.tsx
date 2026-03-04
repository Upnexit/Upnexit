import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: '✅', description: 'বার্তা সফলভাবে পাঠানো হয়েছে!' });
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding bg-muted/40 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-muted-foreground text-sm md:text-base">{t.contact.subtitle}</p>
        </motion.div>

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
            <Textarea placeholder={t.contact.message} rows={4} required className="bg-muted/50 border-border rounded-xl focus:border-primary resize-none" />
            <Button variant="hero" size="lg" type="submit" disabled={loading} className="gap-2 w-full">
              <Send className="h-4 w-4" /> {t.contact.send}
            </Button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-4 flex flex-col justify-between"
          >
            {[
              { icon: Mail, text: 'info@techsoft.com.bd', label: 'Email' },
              { icon: Phone, text: '+880 1XXX-XXXXXX', label: 'Phone' },
              { icon: MapPin, text: 'সাপাহার, নওগাঁ, বাংলাদেশ', label: 'Address' },
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

            {/* Google Map - Sapahar, Naogaon */}
            <div className="flex-1 min-h-[160px] rounded-2xl overflow-hidden border border-border shadow-soft">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14498.5!2d88.5850!3d25.0340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb99e048bc7c51%3A0x87c1f1a4a1f4d8fa!2sSapahar%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '160px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location - Sapahar, Naogaon"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

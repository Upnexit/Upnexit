import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
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
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
            {t.contact.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-muted-foreground">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 bg-background p-8 rounded-2xl border border-border shadow-soft"
          >
            <Input placeholder={t.contact.name} required className="bg-muted/50 border-border h-12 rounded-xl" />
            <Input type="email" placeholder={t.contact.email} required className="bg-muted/50 border-border h-12 rounded-xl" />
            <Input placeholder={t.contact.phone} className="bg-muted/50 border-border h-12 rounded-xl" />
            <Textarea placeholder={t.contact.message} rows={5} required className="bg-muted/50 border-border rounded-xl" />
            <Button variant="hero" size="lg" type="submit" disabled={loading} className="gap-2 w-full">
              <Send className="h-4 w-4" /> {t.contact.send}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 flex flex-col justify-center"
          >
            {[
              { icon: Mail, text: 'info@techsoft.com.bd', label: 'Email' },
              { icon: Phone, text: '+880 1XXX-XXXXXX', label: 'Phone' },
              { icon: MapPin, text: 'ঢাকা, বাংলাদেশ', label: 'Address' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-background rounded-2xl border border-border shadow-soft hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

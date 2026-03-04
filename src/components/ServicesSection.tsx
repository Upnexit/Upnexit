import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Code, Globe } from 'lucide-react';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    { icon: GraduationCap, ...t.services.school, iconBg: 'bg-primary/10', iconColor: 'text-primary' },
    { icon: HeartPulse, ...t.services.hospital, iconBg: 'bg-destructive/10', iconColor: 'text-destructive' },
    { icon: Code, ...t.services.custom, iconBg: 'bg-secondary/30', iconColor: 'text-secondary-foreground' },
    { icon: Globe, ...t.services.web, iconBg: 'bg-primary/10', iconColor: 'text-primary' },
  ];

  return (
    <section id="services" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
            {t.services.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t.services.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center mb-5`}>
                <s.icon className={`h-7 w-7 ${s.iconColor}`} />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

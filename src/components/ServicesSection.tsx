import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Code, Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    { icon: GraduationCap, ...t.services.school, accent: 'bg-primary/8 text-primary border-primary/15', slug: 'school' },
    { icon: HeartPulse, ...t.services.hospital, accent: 'bg-destructive/8 text-destructive border-destructive/15', slug: 'hospital' },
    { icon: Code, ...t.services.custom, accent: 'bg-secondary/15 text-secondary-foreground border-secondary/20', slug: 'custom' },
    { icon: Globe, ...t.services.web, accent: 'bg-primary/8 text-primary border-primary/15', slug: 'web' },
  ];

  return (
    <section id="services" className="section-padding bg-muted/40 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/8 text-primary mb-5">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">{t.services.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {services.map((s, i) => (
            <Link to={`/services/${s.slug}`} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-background rounded-2xl p-6 md:p-7 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 cursor-pointer relative overflow-hidden h-full"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
                <div className={`w-14 h-14 rounded-2xl ${s.accent} border flex items-center justify-center mb-5`}>
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-3 text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

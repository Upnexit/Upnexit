import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Code, Globe } from 'lucide-react';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    { icon: GraduationCap, ...t.services.school, color: 'from-cyan-500/20 to-blue-500/20' },
    { icon: HeartPulse, ...t.services.hospital, color: 'from-rose-500/20 to-pink-500/20' },
    { icon: Code, ...t.services.custom, color: 'from-emerald-500/20 to-teal-500/20' },
    { icon: Globe, ...t.services.web, color: 'from-violet-500/20 to-purple-500/20' },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
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
              className="group gradient-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

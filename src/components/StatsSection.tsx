import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '150+', label: t.stats.clients },
    { value: '200+', label: t.stats.projects },
    { value: '8+', label: t.stats.years },
    { value: '✓', label: t.stats.support },
  ];

  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-2">{s.value}</div>
              <div className="text-sm text-primary-foreground/80 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

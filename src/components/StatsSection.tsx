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
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-4">
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
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

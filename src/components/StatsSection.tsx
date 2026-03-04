import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Users, FolderCheck, Clock, Headphones } from 'lucide-react';

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '150+', label: t.stats.clients, icon: Users },
    { value: '200+', label: t.stats.projects, icon: FolderCheck },
    { value: '8+', label: t.stats.years, icon: Clock },
    { value: '24/7', label: t.stats.support, icon: Headphones },
  ];

  return (
    <section className="section-padding gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs md:text-sm text-white/70 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

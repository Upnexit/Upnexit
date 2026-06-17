import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Users, FolderCheck, Clock, Headphones } from 'lucide-react';

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    {
      value: '10+',
      label: t.stats.clients,
      icon: Users,
      gradient: 'from-amber-400 via-orange-500 to-rose-500',
      glow: 'shadow-[0_10px_30px_-10px_rgba(249,115,22,0.55)]',
      ring: 'hover:border-amber-400/40',
    },
    {
      value: '50+',
      label: t.stats.projects,
      icon: FolderCheck,
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
      glow: 'shadow-[0_10px_30px_-10px_rgba(20,184,166,0.55)]',
      ring: 'hover:border-emerald-400/40',
    },
    {
      value: '2+',
      label: t.stats.years,
      icon: Clock,
      gradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
      glow: 'shadow-[0_10px_30px_-10px_rgba(139,92,246,0.55)]',
      ring: 'hover:border-violet-400/40',
    },
    {
      value: '24/7',
      label: t.stats.support,
      icon: Headphones,
      gradient: 'from-sky-400 via-blue-500 to-indigo-500',
      glow: 'shadow-[0_10px_30px_-10px_rgba(59,130,246,0.55)]',
      ring: 'hover:border-sky-400/40',
    },
  ];

  return (
    <section className="py-12 md:py-24 lg:py-28 gradient-hero relative overflow-hidden">
      {/* Subtle animated mesh overlay */}
      <span aria-hidden className="pointer-events-none absolute inset-0 hero-animated-gradient opacity-30" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 ${s.ring} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/10 cursor-default relative overflow-hidden`}
            >
              {/* Gradient sheen on hover */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-[0.10] transition-opacity duration-500`}
              />
              {/* Shimmer sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
              <div className="relative mb-4">
                <div
                  className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} ${s.glow} flex items-center justify-center mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]`}
                >
                  <s.icon className="h-7 w-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" strokeWidth={2.2} />
                  {/* Glossy highlight */}
                  <span aria-hidden className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-60 mix-blend-overlay" />
                </div>
                {/* Soft pulsing halo */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -inset-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-35 blur-2xl transition-opacity duration-700 w-20 h-20`}
                />
              </div>
              <div className="relative text-3xl md:text-4xl font-black text-white mb-1 drop-shadow-sm">{s.value}</div>
              <div className="relative text-xs md:text-sm text-white/85 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { GraduationCap, HeartPulse, Code, Globe, ArrowUpRight, Palette, Megaphone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: GraduationCap, ...t.services.school, slug: 'school',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      glow: 'shadow-[0_10px_30px_-10px_rgba(20,184,166,0.55)]',
      ring: 'hover:border-emerald-400/40',
    },
    {
      icon: HeartPulse, ...t.services.hospital, slug: 'hospital',
      gradient: 'from-rose-400 via-pink-500 to-red-500',
      glow: 'shadow-[0_10px_30px_-10px_rgba(244,63,94,0.55)]',
      ring: 'hover:border-rose-400/40',
    },
    {
      icon: Code, ...t.services.custom, slug: 'custom',
      gradient: 'from-indigo-500 via-violet-500 to-fuchsia-500',
      glow: 'shadow-[0_10px_30px_-10px_rgba(139,92,246,0.55)]',
      ring: 'hover:border-violet-400/40',
    },
    {
      icon: Globe, ...t.services.web, slug: 'web',
      gradient: 'from-sky-400 via-blue-500 to-indigo-600',
      glow: 'shadow-[0_10px_30px_-10px_rgba(59,130,246,0.55)]',
      ring: 'hover:border-sky-400/40',
    },
    {
      icon: Palette, ...t.services.graphics, slug: 'graphics', comingSoon: true,
      gradient: 'from-amber-400 via-orange-500 to-pink-500',
      glow: 'shadow-[0_10px_30px_-10px_rgba(249,115,22,0.55)]',
      ring: 'hover:border-amber-400/40',
    },
    {
      icon: Megaphone, ...t.services.boosting, slug: 'boosting', comingSoon: true,
      gradient: 'from-lime-400 via-green-500 to-emerald-600',
      glow: 'shadow-[0_10px_30px_-10px_rgba(34,197,94,0.55)]',
      ring: 'hover:border-lime-400/40',
    },
  ];

  return (
    <section id="services" className="section-padding relative bg-gradient-to-b from-background via-secondary/15 to-background">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => (
            <Link to={`/services/${s.slug}`} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group bg-background rounded-2xl p-6 md:p-7 border border-border ${s.ring} transition-all duration-500 hover:shadow-elevated hover:-translate-y-1 cursor-pointer relative overflow-hidden h-full`}
              >
                {/* Animated gradient sheen on hover */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}
                />
                {/* Shimmer sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                {(s as any).comingSoon && (
                  <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border border-secondary/40 shadow-sm">
                    <Clock className="h-3 w-3" /> {t.services.comingSoon}
                  </span>
                )}
                {!(s as any).comingSoon && <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>}
                <div className="relative mb-5">
                  <div
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} ${s.glow} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]`}
                  >
                    <s.icon className="h-7 w-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" strokeWidth={2.2} />
                    {/* Glossy highlight */}
                    <span aria-hidden className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-60 mix-blend-overlay" />
                  </div>
                  {/* Soft pulsing halo */}
                  <span
                    aria-hidden
                    className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700`}
                  />
                </div>
                <h3 className="relative font-bold text-base md:text-lg mb-3 text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, hsl(145 63% 97%) 0%, hsl(0 0% 100%) 30%, hsl(46 92% 97%) 60%, hsl(145 50% 95%) 100%)'
      }} />

      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[15%] w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.08), transparent 70%)' }}
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-32 left-[10%] w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(46 92% 55% / 0.1), transparent 70%)' }}
        />
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 left-[60%] w-48 h-48 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.06), transparent 70%)' }}
        />

        {/* Decorative dots pattern */}
        <div className="absolute top-28 left-8 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
          ))}
        </div>
        <div className="absolute bottom-28 right-12 grid grid-cols-3 gap-3 opacity-15">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-secondary" />
          ))}
        </div>

        {/* Subtle line accents */}
        <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-60 bg-gradient-to-b from-transparent via-secondary/8 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-28 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-primary/8 text-primary border border-primary/15 mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] mb-6 tracking-tight text-foreground"
          >
            {t.hero.title1}{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" className="gap-2 px-10 w-full sm:w-auto">
              {t.hero.cta1} <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="heroOutline" size="xl" className="px-10 gap-2 w-full sm:w-auto">
              <Play className="h-4 w-4" /> {t.hero.cta2}
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          >
            {[
              { num: '150+', label: lang === 'bn' ? 'ক্লায়েন্ট' : 'Clients' },
              { num: '200+', label: lang === 'bn' ? 'প্রজেক্ট' : 'Projects' },
              { num: '8+', label: lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-primary">{item.num}</span>
                <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 36C840 40 960 48 1080 50C1200 52 1320 48 1380 46L1440 44V80H0Z" fill="hsl(140 8% 96%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

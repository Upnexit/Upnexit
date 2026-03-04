import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full" style={{ background: 'hsl(145 63% 32% / 0.04)' }} />
        <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full" style={{ background: 'hsl(46 92% 55% / 0.06)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'hsl(145 63% 32% / 0.02)' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(hsl(145 63% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 63% 32%) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-28 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-primary/8 text-primary border border-primary/15 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] mb-6 tracking-tight"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {[
              { num: '150+', label: lang => lang === 'bn' ? 'ক্লায়েন্ট' : 'Clients' },
              { num: '200+', label: lang => lang === 'bn' ? 'প্রজেক্ট' : 'Projects' },
              { num: '8+', label: lang => lang === 'bn' ? 'বছর' : 'Years' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{item.num}</span>
                <span className="text-sm text-muted-foreground">{item.label('bn')}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 33.3C672 36.7 768 43.3 864 45C960 46.7 1056 43.3 1152 40C1248 36.7 1344 33.3 1392 31.7L1440 30V60H0Z" fill="hsl(140 8% 96%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

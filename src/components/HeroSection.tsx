import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Monitor, Server } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        {/* Grid dots */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(187 85% 53%) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            {t.hero.title1}{' '}
            <span className="text-gradient">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="hero" size="lg" className="gap-2">
              {t.hero.cta1} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="heroOutline" size="lg">
              {t.hero.cta2}
            </Button>
          </motion.div>

          {/* Mini icons row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-8 mt-16"
          >
            {[Code2, Monitor, Server].map((Icon, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground/60">
                <Icon className="h-5 w-5 text-primary/60" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

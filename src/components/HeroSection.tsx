import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Monitor, Server, Shield } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(145 63% 42%) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {t.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6"
            >
              {t.hero.title1}{' '}
              <span className="text-gradient">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" size="lg" className="gap-2 px-8">
                {t.hero.cta1} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="heroOutline" size="lg" className="px-8">
                {t.hero.cta2}
              </Button>
            </motion.div>
          </div>

          {/* Right side - visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="bg-background rounded-2xl border border-border shadow-card p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Code2, label: 'Custom Dev', color: 'bg-primary/10 text-primary' },
                    { icon: Monitor, label: 'Web Apps', color: 'bg-secondary/20 text-secondary-foreground' },
                    { icon: Server, label: 'Backend', color: 'bg-primary/10 text-primary' },
                    { icon: Shield, label: 'Security', color: 'bg-secondary/20 text-secondary-foreground' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex flex-col items-center gap-3 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex gap-2">
                  <div className="h-2 rounded-full bg-primary flex-[3]" />
                  <div className="h-2 rounded-full bg-secondary flex-[2]" />
                  <div className="h-2 rounded-full bg-primary/30 flex-[1]" />
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

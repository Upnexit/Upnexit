import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Github, Figma, Code2, FileCode, Braces, Database, Cpu, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const techBadges = [
  { Icon: Github, label: 'GitHub', color: '#24292e', className: 'top-[12%] left-[6%] hidden md:flex', delay: 0, dur: 7 },
  { Icon: Figma, label: 'Figma', color: '#a259ff', className: 'top-[22%] right-[5%] hidden md:flex', delay: 0.4, dur: 8 },
  { Icon: FileCode, label: 'HTML5', color: '#e34f26', className: 'top-[55%] left-[3%] hidden lg:flex', delay: 0.8, dur: 9 },
  { Icon: Braces, label: 'JavaScript', color: '#f7df1e', className: 'bottom-[18%] right-[7%] hidden md:flex', delay: 1.2, dur: 7.5 },
  { Icon: Code2, label: 'React', color: '#61dafb', className: 'top-[40%] right-[12%] hidden xl:flex', delay: 0.6, dur: 8.5 },
  { Icon: Palette, label: 'Tailwind', color: '#38bdf8', className: 'bottom-[28%] left-[10%] hidden lg:flex', delay: 1.0, dur: 8 },
  { Icon: Database, label: 'Supabase', color: '#3ecf8e', className: 'top-[68%] right-[3%] hidden lg:flex', delay: 1.4, dur: 9.5 },
  { Icon: Cpu, label: 'Node.js', color: '#539e43', className: 'top-[8%] right-[22%] hidden xl:flex', delay: 0.3, dur: 7 },
];

const FloatingTechBadges = () => (
  <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
    {techBadges.map(({ Icon, label, color, className, delay, dur }) => (
      <motion.div
        key={label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -14, 0], rotate: [0, 4, -4, 0] }}
        transition={{
          opacity: { duration: 0.8, delay },
          y: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay },
          rotate: { duration: dur * 1.6, repeat: Infinity, ease: 'easeInOut', delay },
        }}
        className={`absolute ${className} items-center gap-2 px-3 py-2 rounded-2xl bg-white/85 backdrop-blur-md border border-border shadow-elevated`}
        style={{ willChange: 'transform' }}
      >
        <Icon className="h-5 w-5" style={{ color }} strokeWidth={2.2} />
        <span className="text-xs font-bold text-foreground/80">{label}</span>
      </motion.div>
    ))}
  </div>
);

const HeroSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="home" className="relative min-h-[95svh] sm:min-h-[105svh] flex items-center overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 25%, hsl(46 80% 96%) 55%, hsl(145 45% 94%) 100%)'
      }} />

      {/* Grid texture overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(hsl(145 63% 32%) 1.5px, transparent 1.5px),
          linear-gradient(90deg, hsl(145 63% 32%) 1.5px, transparent 1.5px)
        `,
        backgroundSize: '48px 48px'
      }} />

      {/* Diagonal lines texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, hsl(145 63% 32%), hsl(145 63% 32%) 1px, transparent 1px, transparent 20px)',
      }} />

      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[15%] w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.1), transparent 70%)' }}
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-32 left-[10%] w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(46 92% 55% / 0.12), transparent 70%)' }}
        />
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 left-[60%] w-48 h-48 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.07), transparent 70%)' }}
        />

        {/* Decorative dots */}
        <div className="absolute top-28 left-8 grid grid-cols-5 gap-2.5 opacity-20">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
          ))}
        </div>
        <div className="absolute bottom-28 right-12 grid grid-cols-4 gap-2.5 opacity-15">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-secondary" />
          ))}
        </div>

        {/* Line accents */}
        <div className="absolute top-0 left-1/4 w-px h-48 bg-gradient-to-b from-transparent via-primary/12 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-64 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
      </div>

      {/* Floating tech-stack badges — hidden on small mobile to keep perf high */}
      <FloatingTechBadges />

      <div className="container mx-auto px-4 lg:px-8 pt-28 sm:pt-44 pb-20 sm:pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-sm font-extrabold bg-secondary/20 border border-secondary/30 mb-4 sm:mb-8 shadow-sm" style={{ color: 'hsl(40 95% 38%)', textShadow: '0 0 12px hsl(46 92% 55% / 0.3)' }}>
              {t.hero.badge}
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.08] mb-6 tracking-tight text-foreground">
            {t.hero.title1}{' '}
            <br />
            <span className="text-gradient">{t.hero.title2}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/consultation" className="w-full sm:w-auto">
              <Button variant="hero" size="xl" className="gap-2 px-10 w-full">
                {t.hero.cta1} <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="heroOutline"
              size="xl"
              className="px-10 gap-2 w-full sm:w-auto"
              onClick={() => {
                const videoEl = document.getElementById('video-section');
                if (videoEl) {
                  videoEl.scrollIntoView({ behavior: 'smooth' });
                  // Auto-play: swap iframe src to include autoplay
                  setTimeout(() => {
                    const iframe = videoEl.querySelector('iframe');
                    if (iframe) {
                      const src = iframe.src;
                      if (!src.includes('autoplay=1')) {
                        iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
                      }
                    }
                  }, 800);
                }
              }}
            >
              <Play className="h-4 w-4" /> {t.hero.cta2}
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 sm:mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-12"
          >
            {[
              { num: '10+', label: lang === 'bn' ? 'ক্লায়েন্ট' : 'Clients' },
              { num: '50+', label: lang === 'bn' ? 'প্রজেক্ট' : 'Projects' },
              { num: '2+', label: lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience' },
            ].map((item, i) => (
              <div key={i} className={`flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-3 ${i === 2 ? 'w-full sm:w-auto flex justify-center' : ''}`}>
                <span className="text-3xl sm:text-4xl font-black text-primary">{item.num}</span>
                <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave - more prominent */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L48 110C96 100 192 80 288 68C384 56 480 52 576 56C672 60 768 72 864 78C960 84 1056 84 1152 76C1248 68 1344 52 1392 44L1440 36V120H0Z" fill="hsl(140 8% 96%)" />
          <path d="M0 120L48 114C96 108 192 96 288 88C384 80 480 76 576 78C672 80 768 88 864 92C960 96 1056 96 1152 90C1248 84 1344 72 1392 66L1440 60V120H0Z" fill="hsl(140 8% 96% / 0.5)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

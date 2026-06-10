import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ---------- Original-color brand SVG logos ---------- */
const Logos = {
  GitHub: (
    <svg viewBox="0 0 24 24" fill="#181717"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  ),
  Figma: (
    <svg viewBox="0 0 38 57"><path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/><path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/><path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/><path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/><path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 256 256"><rect width="256" height="256" rx="24" fill="#3178c6"/><path fill="#fff" d="M150.5 200.5v25c4.1 2.1 8.9 3.7 14.5 4.7 5.6 1 11.5 1.6 17.7 1.6 6 0 11.8-.6 17.3-1.7 5.4-1.1 10.2-3 14.3-5.6s7.4-6 9.7-10.2c2.4-4.2 3.5-9.4 3.5-15.7 0-4.6-.7-8.6-2-12.1s-3.3-6.5-5.9-9.2c-2.5-2.7-5.6-5.1-9.2-7.2-3.5-2.2-7.5-4.2-12-6.1-3.3-1.3-6.2-2.7-8.8-4-2.6-1.3-4.8-2.7-6.6-4.1-1.8-1.4-3.2-2.9-4.2-4.5s-1.5-3.4-1.5-5.5c0-1.9.5-3.6 1.4-5.1.9-1.5 2.2-2.8 3.9-3.9 1.7-1.1 3.7-1.9 6.2-2.5s5.1-.9 8.1-.9c2.2 0 4.4.2 6.8.5s4.8.8 7.2 1.5c2.4.7 4.7 1.6 7 2.6 2.2 1.1 4.3 2.3 6.1 3.7v-23.4c-3.8-1.5-8-2.5-12.6-3.2-4.6-.7-9.7-1.1-15.6-1.1-5.9 0-11.6.6-17 1.9-5.4 1.3-10.1 3.3-14.2 6-4.1 2.7-7.3 6.2-9.7 10.3-2.4 4.2-3.6 9.2-3.6 15.1 0 7.6 2.2 14 6.5 19.4 4.4 5.3 11 9.8 19.8 13.5 3.5 1.4 6.7 2.8 9.7 4.2s5.6 2.8 7.8 4.3c2.2 1.5 3.9 3.2 5.1 5 1.2 1.8 1.9 4 1.9 6.4 0 1.8-.4 3.4-1.3 5-.9 1.5-2.2 2.9-3.9 4-1.7 1.1-3.9 2-6.5 2.6-2.6.6-5.6.9-9.1.9-6 0-11.9-1-17.8-3.1-5.8-2.1-11.2-5.2-16.1-9.4zM118 119.7h32.2V99H53v20.7h32V211h21V119.7z"/></svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 256 256"><rect width="256" height="256" fill="#f7df1e"/><path d="M67 218l19.6-11.9c3.8 6.7 7.2 12.4 15.5 12.4 7.9 0 12.9-3.1 12.9-15.1V122h24v82c0 25-14.6 36.3-36 36.3-19.3 0-30.5-10-36-22.3M152 215l19.6-11.4c5.2 8.5 11.9 14.7 23.8 14.7 10 0 16.4-5 16.4-11.9 0-8.3-6.6-11.2-17.7-16l-6-2.6c-17.5-7.4-29.1-16.8-29.1-36.6 0-18.2 13.9-32.1 35.6-32.1 15.4 0 26.5 5.4 34.5 19.4L210.4 152c-4.2-7.5-8.7-10.4-15.6-10.4-7 0-11.5 4.5-11.5 10.4 0 7.3 4.5 10.2 14.9 14.7l6 2.6c20.6 8.8 32.2 17.9 32.2 38.2 0 21.8-17.2 33.9-40.2 33.9-22.6 0-37.2-10.8-44.2-24.4" fill="#000"/></svg>
  ),
  React: (
    <svg viewBox="-11.5 -10.23174 23 20.46348"><circle r="2.05" fill="#61dafb"/><g fill="none" stroke="#61dafb" strokeWidth="1"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
  ),
  HTML5: (
    <svg viewBox="0 0 256 288"><path fill="#e34f26" d="M19 250.3L0 0h256l-19 250.2L127.9 288"/><path fill="#ef652a" d="M128 265.2l88-24.4 16-182H128"/><path fill="#ebebeb" d="M82 116h46V83H46l4 46h78v-33zm5 56l5 51 36 10v-34l-19-5-1-22H87z"/><path fill="#fff" d="M128 116v33h43l-4 45-39 11v34l72-20 13-149h-85zm0-66v33h82l3-33h-85z"/></svg>
  ),
  CSS3: (
    <svg viewBox="0 0 256 288"><path fill="#264de4" d="M19 250.3L0 0h256l-19 250.2L127.9 288"/><path fill="#2965f1" d="M128 265.2l88-24.4 16-182H128"/><path fill="#ebebeb" d="M75 152l3 33h50v-33H75zm-6-70l4 33h55V82H69z"/><path fill="#fff" d="M128 213l-37-10-3-26H72l4 47 52 14v-25zm-1-95v33h47l-5 50-42 11v34l72-20 14-141h-86z"/></svg>
  ),
  NodeJS: (
    <svg viewBox="0 0 256 289"><path fill="#83cd29" d="M128 288.5l-15-9c-2-2-1-2 0-3 5-2 6-2 10-5 1-1 1-1 0-2L102 257c-1 0-2 0-2 1l-19 11c-1 1-1 2 0 2l116 67c2 1 5 1 7 0l116-67c2-1 2-2 0-3L204 200c-1-1-3-1-4 0l-19 11c-1 0-1 1 0 2l22 13c1 1 1 2 0 3-5 2-6 3-10 5-1 1-1 1 0 2l21 12c1 1 1 2 0 3l-86 51-1-3z" opacity=".15"/><path fill="#404137" d="M128 288c-3 0-5-1-7-2L102 275c-3-2-2-3-1-3 4-1 5-2 9-4 1-1 1-1 2 0l15 9c1 1 1 1 2 0l59-35c1-1 1-1 1-2v-69c0-1 0-2-1-2l-59-35c-1-1-2-1-2 0l-58 35c-1 0-1 1-1 2v69c0 1 0 2 1 2l16 9c9 4 14-1 14-6V177c0-1 0-2 1-2h7c1 0 2 1 2 2v66c0 12-6 18-17 18-3 0-6 0-12-3l-15-8c-5-3-7-7-7-13v-69c0-6 2-10 7-13l59-34c4-3 11-3 15 0l59 34c5 3 7 7 7 13v69c0 6-2 10-7 13l-59 34c-2 2-5 2-7 2"/><path fill="#83cd29" d="M147 219c-26 0-31-12-31-22 0-1 1-2 2-2h8c1 0 2 1 2 2 1 9 4 13 19 13 11 0 17-3 17-9 0-4-2-7-19-9-15-1-24-5-24-17 0-12 10-19 26-19 18 0 27 7 28 21 0 1 0 1-1 2h-7c-1 0-1-1-2-2-2-9-7-12-19-12-13 0-15 5-15 8 0 4 2 6 18 8 16 2 25 5 25 17 0 13-10 20-29 20"/></svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 154 96"><path fill="#38bdf8" d="M77 0C56 0 43 11 38 32c8-11 17-15 28-12 6 1 10 6 16 11 9 9 19 19 41 19 21 0 34-10 39-31-7 11-17 15-28 12-6-1-10-6-16-11C109 11 99 0 77 0M38 48C18 48 5 58 0 79c8-10 17-15 28-12 6 1 11 6 16 11 9 9 19 19 41 19 21 0 34-10 39-31-7 11-17 15-28 12-7-2-11-6-17-11-9-9-19-19-41-19"/></svg>
  ),
  Supabase: (
    <svg viewBox="0 0 109 113"><path fill="#3ecf8e" d="M63 110c-3 4-9 1-9-3l-1-44h31c5 0 9 5 5 10z"/><path fill="#3ecf8e" d="M63 110c-3 4-9 1-9-3l-1-44h31c5 0 9 5 5 10z" fillOpacity=".2"/><path fill="#3ecf8e" d="M45 2c3-3 9 0 9 4v44H21c-5 0-9-5-5-10z"/></svg>
  ),
  TailwindAlt: null,
};

type LogoKey = keyof typeof Logos;

// 10 logos arranged in a rough circle around the hero headline.
const orbitLogos: Array<{ key: LogoKey; pos: string; size: string; delay: number; dur: number; rot: number }> = [
  // Circular orbit around the headline. Top logos sit high (just under the navbar) so they
  // don't push down onto the headline text. Slight overlap with the header is acceptable.
  // Top arc — high, well clear of headline
  { key: 'Figma',      pos: 'top-[14%] sm:top-[16%] left-[14%] sm:left-[22%]',  size: 'w-10 h-10 sm:w-12 sm:h-12', delay: 0.1, dur: 7.5, rot: -6 },
  { key: 'React',      pos: 'top-[14%] sm:top-[16%] right-[14%] sm:right-[22%]', size: 'w-11 h-11 sm:w-14 sm:h-14', delay: 0.3, dur: 8.5, rot: 0 },
  // Mid sides — flank the headline
  { key: 'GitHub',     pos: 'top-[34%] sm:top-[46%] left-[4%] sm:left-[6%]',   size: 'w-10 h-10 sm:w-12 sm:h-12', delay: 0.5, dur: 7.8, rot: 6 },
  { key: 'TypeScript', pos: 'top-[34%] sm:top-[46%] right-[4%] sm:right-[6%]', size: 'w-10 h-10 sm:w-12 sm:h-12', delay: 0.7, dur: 8.2, rot: 4 },
  // Bottom arc — above the wave
  { key: 'Tailwind',   pos: 'bottom-[18%] sm:bottom-[20%] left-[10%] sm:left-[16%]',  size: 'w-10 h-10 sm:w-12 sm:h-12', delay: 1.1, dur: 9.0, rot: -4 },
  { key: 'NodeJS',     pos: 'bottom-[18%] sm:bottom-[20%] right-[10%] sm:right-[16%]', size: 'w-10 h-10 sm:w-12 sm:h-12', delay: 0.9, dur: 7.6, rot: 5 },
];

const FloatingTechBadges = () => (
  <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
    {orbitLogos.map(({ key, pos, size, delay, dur, rot }) => (
      <motion.div
        key={key}
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -14, 0],
          rotate: [-rot, rot, -rot],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.2 + delay * 0.15, ease: 'easeOut' },
          scale: { duration: 0.8, delay: 0.2 + delay * 0.15, ease: [0.16, 1, 0.3, 1] },
          y: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay },
          rotate: { duration: dur * 1.5, repeat: Infinity, ease: 'easeInOut', delay },
        }}
        whileHover={{ scale: 1.15 }}
        className={`absolute ${pos} ${size} drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]`}
        style={{ willChange: 'transform', filter: 'saturate(1.15) contrast(1.05)' }}
      >
        <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full">{Logos[key]}</div>
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

      {/* Animated soft gradient wash */}
      <div className="absolute inset-0 hero-animated-gradient pointer-events-none" aria-hidden="true" />

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

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.12] mb-4 sm:mb-5 tracking-tight text-foreground">
            <span className="sr-only">Upnex It — Best Software Company in Bangladesh offering Custom Software, School Management, Hospital Management, ERP and Web Application development services.</span>
            <span className="bn-display bn-display-extrabold block pb-1">{t.hero.title1}</span>
            <span className="bn-display bn-display-bold text-gradient block -mt-1 sm:-mt-2">{t.hero.title2}</span>
          </h1>
          <h2 className="sr-only">Top-rated software development company in Bangladesh — Custom Software, School Management Software, Hospital Management Software, ERP Solutions and Web Development.</h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mt-2 sm:mt-3 mb-10 leading-relaxed"
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

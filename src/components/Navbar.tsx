import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-soft border-b border-primary/15' : 'bg-white/95 backdrop-blur-sm border-b border-border/60'}`}>
      <div className="container mx-auto flex h-18 items-center justify-between px-4 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center">
            <span className="text-primary-foreground font-black text-lg">T</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-foreground">Tech<span className="text-gradient">Soft</span></span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
          >
            <Globe className="h-4 w-4" />
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>
          <Button variant="hero" size="default" className="px-6">
            {t.hero.cta1}
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-1">
          <button onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} className="p-2.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-colors">
            <Globe className="h-5 w-5" />
          </button>
          <button onClick={() => setOpen(!open)} className="p-2.5 text-foreground rounded-lg hover:bg-muted transition-colors">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border/40"
          >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary py-3 px-4 rounded-lg hover:bg-primary/5 transition-all">
                  {l.label}
                </a>
              ))}
              <div className="pt-2">
                <Button variant="hero" size="default" className="w-full">
                  {t.hero.cta1}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

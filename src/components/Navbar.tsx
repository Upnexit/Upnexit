import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#home" className="text-xl font-bold text-gradient">TechSoft</a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe className="h-4 w-4" />
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>
          <Button variant="hero" size="sm">
            {t.hero.cta1}
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} className="p-2 text-muted-foreground">
            <Globe className="h-5 w-5" />
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 text-foreground">
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
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto flex flex-col gap-3 px-4 py-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-primary py-1">
                  {l.label}
                </a>
              ))}
              <Button variant="hero" size="sm" className="w-fit mt-2">
                {t.hero.cta1}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

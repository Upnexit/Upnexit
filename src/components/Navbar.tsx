import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, Home, Briefcase, Users, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { label: t.nav.home, href: '/', icon: Home },
    { label: t.nav.services, href: '/services', icon: Briefcase },
    { label: t.nav.about, href: '/about', icon: Users },
    { label: t.nav.contact, href: '/contact', icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-soft border-b border-primary/15' : 'bg-white/95 backdrop-blur-sm border-b border-border/60'}`}>
        <div className="container mx-auto flex h-18 items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center">
              <span className="text-primary-foreground font-black text-lg">T</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">Tech<span className="text-gradient">Soft</span></span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(l.href)
                    ? 'text-primary bg-primary/8 font-semibold'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                {l.label}
              </Link>
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
            <Link to="/contact">
              <Button variant="hero" size="default" className="px-6">
                {t.hero.cta1}
              </Button>
            </Link>
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

        {/* Mobile menu - full screen overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-x-0 top-[4.5rem] bottom-0 bg-background/98 backdrop-blur-xl z-40"
            >
              <div className="container mx-auto flex flex-col gap-2 px-4 py-6">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={l.href}
                      className={`flex items-center gap-4 text-base font-medium py-4 px-5 rounded-2xl transition-all ${
                        isActive(l.href)
                          ? 'text-primary bg-primary/8 font-semibold border border-primary/15'
                          : 'text-foreground hover:text-primary hover:bg-muted/60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive(l.href) ? 'bg-primary/15' : 'bg-muted'
                      }`}>
                        <l.icon className={`h-5 w-5 ${isActive(l.href) ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="pt-4"
                >
                  <Link to="/contact">
                    <Button variant="hero" size="lg" className="w-full">
                      {t.hero.cta1}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/60 shadow-elevated">
        <div className="flex items-center justify-around py-2 px-2">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all min-w-[60px] ${
                isActive(l.href)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all ${isActive(l.href) ? 'bg-primary/10' : ''}`}>
                <l.icon className="h-5 w-5" />
              </div>
              <span className={`text-[10px] font-medium ${isActive(l.href) ? 'font-bold' : ''}`}>{l.label}</span>
            </Link>
          ))}
        </div>
        {/* Safe area for iPhones */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </>
  );
};

export default Navbar;

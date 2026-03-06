import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, Globe, Home, Briefcase, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

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
        <div className="container mx-auto flex h-16 lg:h-20 items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Upnex It Logo" className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl object-contain" />
            <span className="text-xl lg:text-2xl font-extrabold tracking-tight text-foreground">Upnex <span className="text-gradient">It</span></span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`px-4 py-2.5 text-[15px] font-medium rounded-lg transition-all ${
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
            <Link to="/consultation">
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
            <button onClick={() => setOpen(true)} className="p-2.5 text-foreground rounded-lg hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[280px] p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col h-full">
            <div className="p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Upnex It Logo" className="w-8 h-8 rounded-xl object-contain" />
                <span className="text-lg font-extrabold tracking-tight text-foreground">Upnex <span className="text-gradient">It</span></span>
              </div>
            </div>

            <nav className="flex-1 p-3 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(l.href)
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive(l.href) ? 'bg-primary/15' : 'bg-muted'
                  }`}>
                    <l.icon className={`h-4 w-4 ${isActive(l.href) ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-border">
              <Link to="/consultation" onClick={() => setOpen(false)}>
                <Button variant="hero" size="lg" className="w-full">
                  {t.hero.cta1}
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Floating Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed inset-x-0 bottom-4 z-50 px-4">
        <div
          className="mx-auto w-full max-w-md rounded-[28px] p-1.5"
          style={{
            background: 'hsl(var(--foreground) / 0.06)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 40px hsl(150 10% 15% / 0.12), 0 0 0 1px hsl(var(--border) / 0.5)',
          }}
        >
          <div className="flex items-center justify-around rounded-[22px] py-1.5 px-1" style={{ background: 'hsl(var(--background) / 0.85)' }}>
            {links.map((l) => {
              const active = isActive(l.href);
              const englishLabels: Record<string, string> = {
                '/': 'Home',
                '/services': 'Services',
                '/about': 'About',
                '/contact': 'Contact',
              };
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className="relative flex flex-col items-center gap-0.5 py-1.5 px-3 flex-1"
                >
                  <motion.div
                    className="relative z-10 flex flex-col items-center gap-0.5 w-full"
                    whileTap={{ scale: 0.85 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {active && (
                      <motion.div
                        layoutId="bottomNavIndicator"
                        className="absolute -inset-x-1 -inset-y-1 rounded-2xl"
                        style={{ background: 'hsl(var(--primary) / 0.12)' }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                    <div className="relative z-10">
                      <motion.div
                        animate={active ? { y: -2, scale: 1.15 } : { y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <l.icon className={`h-[22px] w-[22px] transition-colors duration-200 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                      </motion.div>
                    </div>
                    <motion.span
                      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }}
                      className={`text-[9px] font-semibold relative z-10 ${active ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      {englishLabels[l.href]}
                    </motion.span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </>
  );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, Globe, Home, Briefcase, Users, MessageSquare, User, LogIn, LayoutDashboard, BookOpen, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { user } = useAuth();
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
    { label: lang === 'bn' ? 'পোর্টফোলিও' : 'Portfolio', href: '/portfolio', icon: FolderOpen },
    { label: lang === 'bn' ? 'ব্লগ' : 'Blog', href: '/blog', icon: BookOpen },
    { label: t.nav.about, href: '/about', icon: Users },
    { label: t.nav.contact, href: '/contact', icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Bottom nav: 2 left, center dashboard, 2 right
  const leftNav = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Services', href: '/services', icon: Briefcase },
  ];
  const rightNav = [
    { label: 'About', href: '/about', icon: Users },
    { label: 'Contact', href: '/contact', icon: MessageSquare },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-xl shadow-soft border-b border-primary/15' : 'bg-background border-b border-border/60'}`}>
        <div className="container mx-auto flex h-14 lg:h-16 items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Upnex It Logo" className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl object-contain" />
            <span className="text-xl lg:text-[22px] font-extrabold tracking-tight text-foreground">Upnex <span className="text-gradient">It</span></span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`px-4 py-2.5 text-base font-bold rounded-lg transition-all ${
                  isActive(l.href)
                    ? 'text-primary bg-primary/8'
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              aria-label={lang === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
            >
              <Globe className="h-4 w-4" />
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>
            {user ? (
              <Link to="/dashboard">
                <Button variant="outline" size="default" className="rounded-xl gap-1.5 px-4">
                  <User className="h-4 w-4" />
                  {lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="default" className="rounded-xl gap-1.5 px-4">
                  <LogIn className="h-4 w-4" />
                  {lang === 'bn' ? 'লগইন' : 'Login'}
                </Button>
              </Link>
            )}
            <Link to="/consultation">
              <Button variant="hero" size="default" className="px-6">
                {t.hero.cta1}
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex lg:hidden items-center gap-1">
            <button onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} aria-label={lang === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'} className="p-2.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-colors">
              <Globe className="h-5 w-5" />
            </button>
            <button onClick={() => setOpen(true)} aria-label="Open navigation menu" className="p-2.5 text-foreground rounded-lg hover:bg-muted transition-colors">
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

              {/* Dashboard link in sidebar */}
              <Link
                to={user ? '/dashboard' : '/login'}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive('/dashboard')
                    ? 'text-primary bg-primary/10 font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive('/dashboard') ? 'bg-primary/15' : 'bg-muted'
                }`}>
                  <LayoutDashboard className={`h-4 w-4 ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                {lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
              </Link>
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

      {/* Floating Mobile Bottom Navigation Bar with Center Dashboard Button */}
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
            {/* Left 2 items */}
            {leftNav.map((l) => {
              const active = isActive(l.href);
              return (
                <Link key={l.href} to={l.href} className="relative flex flex-col items-center gap-0.5 py-1.5 px-2 flex-1">
                  <motion.div className="relative z-10 flex flex-col items-center gap-0.5 w-full" whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    {active && (
                      <motion.div layoutId="bottomNavIndicator" className="absolute -inset-x-1 -inset-y-1 rounded-2xl" style={{ background: 'hsl(var(--primary) / 0.12)' }} transition={{ type: 'spring', stiffness: 350, damping: 25 }} />
                    )}
                    <div className="relative z-10">
                      <motion.div animate={active ? { y: -2, scale: 1.15 } : { y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                        <l.icon className={`h-[20px] w-[20px] transition-colors duration-200 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                      </motion.div>
                    </div>
                    <motion.span animate={active ? { opacity: 1 } : { opacity: 0.6 }} className={`text-[9px] font-semibold relative z-10 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                      {l.label}
                    </motion.span>
                  </motion.div>
                </Link>
              );
            })}

            {/* Center Dashboard Button - highlighted circle */}
            <Link
              to={user ? '/dashboard' : '/login'}
              className="relative flex items-center justify-center -mt-6 mx-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all ${
                  isActive('/dashboard')
                    ? 'gradient-accent'
                    : 'gradient-accent opacity-90 hover:opacity-100'
                }`}
                style={{
                  boxShadow: '0 4px 20px hsl(var(--primary) / 0.35), 0 0 0 3px hsl(var(--background) / 0.9)',
                }}
              >
                <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <span className="absolute -bottom-4 text-[8px] font-bold text-primary whitespace-nowrap">
                {user ? (lang === 'bn' ? 'প্যানেল' : 'Panel') : (lang === 'bn' ? 'লগইন' : 'Login')}
              </span>
            </Link>

            {/* Right 2 items */}
            {rightNav.map((l) => {
              const active = isActive(l.href);
              return (
                <Link key={l.href} to={l.href} className="relative flex flex-col items-center gap-0.5 py-1.5 px-2 flex-1">
                  <motion.div className="relative z-10 flex flex-col items-center gap-0.5 w-full" whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    {active && (
                      <motion.div layoutId="bottomNavIndicator" className="absolute -inset-x-1 -inset-y-1 rounded-2xl" style={{ background: 'hsl(var(--primary) / 0.12)' }} transition={{ type: 'spring', stiffness: 350, damping: 25 }} />
                    )}
                    <div className="relative z-10">
                      <motion.div animate={active ? { y: -2, scale: 1.15 } : { y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                        <l.icon className={`h-[20px] w-[20px] transition-colors duration-200 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                      </motion.div>
                    </div>
                    <motion.span animate={active ? { opacity: 1 } : { opacity: 0.6 }} className={`text-[9px] font-semibold relative z-10 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                      {l.label}
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

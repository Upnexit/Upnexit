import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, Globe, Home, Briefcase, Users, MessageSquare, User, LogIn, LayoutDashboard, BookOpen, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useLogoUrl, useSiteSettings } from '@/hooks/useSiteSettings';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const logoUrl = useLogoUrl();
  const { get } = useSiteSettings();
  const companyName = get('company_name', 'Upnex It');

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
    { label: lang === 'bn' ? 'হোম' : 'Home', href: '/', icon: Home, tint: 'hsl(150 65% 42%)' },
    { label: lang === 'bn' ? 'সেবা' : 'Services', href: '/services', icon: Briefcase, tint: 'hsl(200 80% 45%)' },
  ];
  const rightNav = [
    { label: lang === 'bn' ? 'আমরা' : 'About', href: '/about', icon: Users, tint: 'hsl(280 60% 55%)' },
    { label: lang === 'bn' ? 'যোগাযোগ' : 'Contact', href: '/contact', icon: MessageSquare, tint: 'hsl(20 85% 55%)' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-xl shadow-soft border-b border-primary/15' : 'bg-background border-b border-border/60'}`}>
        <div className="container mx-auto flex h-14 lg:h-16 items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={logoUrl}
              alt={`${companyName} Logo`}
              className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl object-contain bg-white p-0.5 ring-2 ring-secondary/80 shadow-[0_0_0_3px_hsl(46_92%_88%/0.5),0_4px_12px_-2px_hsl(46_92%_55%/0.45)]"
            />
            <span
              className="text-[30px] lg:text-[38px] leading-none tracking-wide text-foreground"
              style={{ fontFamily: '"Kaushan Script", "Brush Script MT", cursive', fontWeight: 700 }}
            >
              {companyName.split(' ')[0]}{' '}
              <span
                className="text-gradient"
                style={{ fontFamily: '"Kaushan Script", "Brush Script MT", cursive', fontWeight: 700 }}
              >
                {companyName.split(' ').slice(1).join(' ') || 'It'}
              </span>
            </span>
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
              <div className="flex items-center gap-2.5">
                <img
                  src={logoUrl}
                  alt={`${companyName} Logo`}
                  className="w-8 h-8 rounded-xl object-contain bg-white p-0.5 ring-2 ring-secondary/80 shadow-[0_0_0_2px_hsl(46_92%_88%/0.5)]"
                />
                <span
                  className="text-[28px] leading-none tracking-wide text-foreground"
                  style={{ fontFamily: '"Kaushan Script", "Brush Script MT", cursive', fontWeight: 700 }}
                >
                  {companyName.split(' ')[0]}{' '}
                  <span
                    className="text-gradient"
                    style={{ fontFamily: '"Kaushan Script", "Brush Script MT", cursive', fontWeight: 700 }}
                  >
                    {companyName.split(' ').slice(1).join(' ') || 'It'}
                  </span>
                </span>
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
      <div className="lg:hidden fixed inset-x-0 bottom-3 z-50 px-3">
        <div
          className="mx-auto w-full max-w-md rounded-[30px] p-[3px]"
          style={{
            background:
              'linear-gradient(135deg, hsl(150 65% 45% / 0.55) 0%, hsl(46 92% 60% / 0.55) 50%, hsl(150 65% 45% / 0.55) 100%)',
            boxShadow:
              '0 18px 50px -12px hsl(150 40% 20% / 0.35), 0 4px 14px -4px hsl(46 92% 45% / 0.25)',
          }}
        >
          <div
            className="relative flex items-end justify-around rounded-[27px] py-2 px-1"
            style={{
              background:
                'linear-gradient(180deg, hsl(0 0% 100% / 0.96) 0%, hsl(150 30% 98% / 0.96) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.9), inset 0 -1px 0 hsl(150 20% 90% / 0.6)',
            }}
          >
            {/* Left 2 items */}
            {leftNav.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className="relative flex flex-col items-center justify-center py-1 flex-1 min-w-0"
                >
                  <motion.div
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="relative flex flex-col items-center gap-1 w-full"
                  >
                    {active && (
                      <motion.div
                        layoutId="bottomNavIndicator"
                        className="absolute inset-x-2 -inset-y-1 rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${l.tint.replace(')', ' / 0.14)')}, ${l.tint.replace(')', ' / 0.06)')})`,
                          boxShadow: `inset 0 0 0 1px ${l.tint.replace(')', ' / 0.25)')}`,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <motion.div
                      animate={active ? { y: -3, scale: 1.12 } : { y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={
                        active
                          ? {
                              background: `linear-gradient(135deg, ${l.tint}, ${l.tint.replace(')', ' / 0.85)')})`,
                              boxShadow: `0 6px 14px -4px ${l.tint.replace(')', ' / 0.55)')}, inset 0 1px 0 hsl(0 0% 100% / 0.35)`,
                            }
                          : { background: 'hsl(150 15% 96%)' }
                      }
                    >
                      <l.icon
                        className="h-[18px] w-[18px] transition-colors duration-200"
                        style={{ color: active ? 'hsl(0 0% 100%)' : 'hsl(150 8% 40%)' }}
                        strokeWidth={active ? 2.4 : 2}
                      />
                    </motion.div>
                    <span
                      className="text-[10px] font-bold tracking-tight relative z-10 leading-none"
                      style={{ color: active ? l.tint : 'hsl(150 8% 45%)' }}
                    >
                      {l.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}

            {/* Center Dashboard Button */}
            <Link
              to={user ? '/dashboard' : '/login'}
              className="relative flex flex-col items-center justify-end -mt-7 mx-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="relative w-[58px] h-[58px] rounded-full flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, hsl(150 65% 45%) 0%, hsl(150 70% 38%) 60%, hsl(46 92% 55%) 100%)',
                  boxShadow:
                    '0 10px 28px -6px hsl(150 65% 35% / 0.55), 0 0 0 4px hsl(0 0% 100%), 0 0 0 5px hsl(46 92% 80% / 0.6)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.45), transparent 55%)',
                  }}
                />
                <LayoutDashboard className="h-[24px] w-[24px] text-white relative z-10" strokeWidth={2.2} />
              </motion.div>
              <span
                className="mt-1 text-[9px] font-extrabold tracking-tight leading-none"
                style={{ color: 'hsl(150 65% 30%)' }}
              >
                {user ? (lang === 'bn' ? 'প্যানেল' : 'Panel') : (lang === 'bn' ? 'লগইন' : 'Login')}
              </span>
            </Link>

            {/* Right 2 items */}
            {rightNav.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className="relative flex flex-col items-center justify-center py-1 flex-1 min-w-0"
                >
                  <motion.div
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="relative flex flex-col items-center gap-1 w-full"
                  >
                    {active && (
                      <motion.div
                        layoutId="bottomNavIndicator"
                        className="absolute inset-x-2 -inset-y-1 rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${l.tint.replace(')', ' / 0.14)')}, ${l.tint.replace(')', ' / 0.06)')})`,
                          boxShadow: `inset 0 0 0 1px ${l.tint.replace(')', ' / 0.25)')}`,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <motion.div
                      animate={active ? { y: -3, scale: 1.12 } : { y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={
                        active
                          ? {
                              background: `linear-gradient(135deg, ${l.tint}, ${l.tint.replace(')', ' / 0.85)')})`,
                              boxShadow: `0 6px 14px -4px ${l.tint.replace(')', ' / 0.55)')}, inset 0 1px 0 hsl(0 0% 100% / 0.35)`,
                            }
                          : { background: 'hsl(150 15% 96%)' }
                      }
                    >
                      <l.icon
                        className="h-[18px] w-[18px] transition-colors duration-200"
                        style={{ color: active ? 'hsl(0 0% 100%)' : 'hsl(150 8% 40%)' }}
                        strokeWidth={active ? 2.4 : 2}
                      />
                    </motion.div>
                    <span
                      className="text-[10px] font-bold tracking-tight relative z-10 leading-none"
                      style={{ color: active ? l.tint : 'hsl(150 8% 45%)' }}
                    >
                      {l.label}
                    </span>
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

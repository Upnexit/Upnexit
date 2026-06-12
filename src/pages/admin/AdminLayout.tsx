import { useEffect, useState, Suspense } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Users, MessageSquare, Settings, LayoutDashboard, Wrench, LogOut, ArrowLeft,
  Star, MessageCircle, ShoppingCart, Link2, ChevronRight, PanelLeftClose, PanelLeft,
  FileText, Briefcase, TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Each nav item gets a unique, professional gradient — used for active state,
// icon swatches, and mobile bottom-nav highlight.
const navItems = [
  { label: 'ড্যাশবোর্ড',       shortLabel: 'Home',      icon: LayoutDashboard, path: '/admin',            gradient: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)' },
  { label: 'অর্ডার সমূহ',       shortLabel: 'Orders',    icon: ShoppingCart,    path: '/admin/orders',     gradient: 'linear-gradient(135deg, #f97316 0%, #f43f5e 100%)' },
  { label: 'মেসেজ ইনবক্স',     shortLabel: 'Inbox',     icon: MessageSquare,   path: '/admin/messages',   gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' },
  { label: 'টিম ম্যানেজমেন্ট',  shortLabel: 'Team',      icon: Users,           path: '/admin/team',       gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)' },
  { label: 'সার্ভিস সমূহ',      shortLabel: 'Service',   icon: Wrench,          path: '/admin/services',   gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' },
  { label: 'ক্লায়েন্ট রিভিউ',   shortLabel: 'Review',    icon: Star,            path: '/admin/reviews',    gradient: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)' },
  { label: 'ডেমো লিংক',         shortLabel: 'Demo',      icon: Link2,           path: '/admin/demo-links', gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)' },
  { label: 'ব্লগ ম্যানেজমেন্ট',  shortLabel: 'Blog',      icon: FileText,        path: '/admin/blog',       gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' },
  { label: 'পোর্টফোলিও',        shortLabel: 'Portfolio', icon: Briefcase,       path: '/admin/portfolio',  gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' },
  { label: 'SEO র‍্যাঙ্কিং',    shortLabel: 'SEO',       icon: TrendingUp,      path: '/admin/seo',        gradient: 'linear-gradient(135deg, #84cc16 0%, #16a34a 100%)' },
  { label: 'চ্যাটবট সেটআপ',    shortLabel: 'Chatbot',   icon: MessageCircle,   path: '/admin/chatbot',    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)' },
  { label: 'সাইট সেটিংস',      shortLabel: 'Settings',  icon: Settings,        path: '/admin/settings',   gradient: 'linear-gradient(135deg, #64748b 0%, #334155 100%)' },
];

export type AdminNavItem = typeof navItems[number];
export { navItems };

const sections = [
  { title: 'প্রধান মেনু', items: navItems.slice(0, 3) },
  { title: 'কন্টেন্ট ম্যানেজমেন্ট', items: navItems.slice(3, 9) },
  { title: 'মার্কেটিং', items: navItems.slice(9, 10) },
  { title: 'কনফিগারেশন', items: navItems.slice(10) },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate('/admin/login');
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full" />
          <span className="text-xs text-muted-foreground">লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const sidebarW = collapsed ? 'w-[72px]' : 'w-[260px]';
  const mainML = collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]';

  return (
    <div className="min-h-screen bg-[hsl(140,8%,96%)] flex">
      {/* ──── Desktop Sidebar ──── */}
      <motion.aside
        layout
        className={`${sidebarW} flex-col fixed h-full z-50 hidden lg:flex overflow-hidden transition-all duration-300`}
        style={{
          background: 'linear-gradient(170deg, hsl(145,55%,28%) 0%, hsl(150,50%,22%) 40%, hsl(148,45%,18%) 100%)',
        }}
      >
        {/* Decorative glow overlays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, hsl(145,70%,65%), transparent 70%)' }} />
          <div className="absolute bottom-10 -left-10 w-40 h-40 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, hsl(170,60%,55%), transparent 70%)' }} />
        </div>

        {/* Brand */}
        <div className="relative px-4 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid hsla(145,40%,50%,0.15)' }}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="relative shrink-0">
              <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-xl shadow-md ring-1 ring-white/20" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-[hsl(148,45%,18%)]" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="overflow-hidden whitespace-nowrap">
                  <span className="font-bold text-white text-sm tracking-tight">Upnex IT</span>
                  <p className="text-[10px] text-white/50">Admin Panel</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setCollapsed(c => !c)}
            className="p-1.5 rounded-lg transition-colors text-white/50 hover:text-white/80 hover:bg-white/[0.08]"
          >
            {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="relative flex-1 px-2.5 py-3 space-y-4 overflow-y-auto">
          {sections.map((sec, si) => (
            <div key={si}>
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-3 pb-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30"
                  >
                    {sec.title}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="space-y-0.5">
                {sec.items.map(item => (
                  <SidebarNavItem key={item.path} item={item} currentPath={location.pathname} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="relative px-2.5 py-3 space-y-0.5" style={{ borderTop: '1px solid hsla(145,40%,50%,0.15)' }}>
          <SidebarFooterLink to="/" icon={ArrowLeft} label="ওয়েবসাইটে ফিরুন" collapsed={collapsed} />
          <button
            onClick={() => signOut()}
            className={`flex items-center gap-2.5 w-full rounded-xl text-[13px] font-medium transition-all duration-200 group
              ${collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'}
              text-red-300/80 hover:text-red-300 hover:bg-red-400/10`}
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <LogOut className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>লগআউট</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* ──── Mobile Top Header ──── */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3"
        style={{
          background: 'linear-gradient(135deg, hsla(145,55%,25%,0.97), hsla(150,50%,20%,0.97))',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg ring-1 ring-white/20" />
            <span className="font-bold text-sm text-white tracking-tight">Admin Panel</span>
          </div>
          <div className="flex items-center gap-1">
            <Link to="/" className="p-2 rounded-lg text-white/60 hover:text-white/90 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <button onClick={() => signOut()} className="p-2 rounded-lg text-red-300/80 hover:text-red-300 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ──── Mobile Bottom Nav ──── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1">
        <div
          className="rounded-2xl shadow-xl px-1 py-2 flex items-center justify-around overflow-x-auto"
          style={{
            background: 'linear-gradient(135deg, hsla(145,55%,22%,0.97), hsla(150,50%,18%,0.97))',
            backdropFilter: 'blur(16px)',
            border: '1px solid hsla(145,40%,50%,0.15)',
          }}
        >
          {navItems.slice(0, 7).map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl min-w-0">
                <div
                  className="p-1.5 rounded-lg transition-all"
                  style={active ? { background: item.gradient, boxShadow: '0 4px 12px hsla(0,0%,0%,0.25)' } : {}}
                >
                  <item.icon className="h-4 w-4" style={{ color: active ? 'white' : 'hsla(145,30%,80%,0.5)' }} />
                </div>
                <span className="text-[9px] font-medium leading-none" style={{ color: active ? 'white' : 'hsla(145,30%,80%,0.5)' }}>
                  {item.shortLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ──── Main content ──── */}
      <main className={`flex-1 ${mainML} pt-16 pb-24 lg:pt-0 lg:pb-0 transition-all duration-300`}>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-24">
                <div className="w-7 h-7 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

/* ──── Sidebar Nav Item with glass effect ──── */
const SidebarNavItem = ({ item, currentPath, collapsed }: { item: typeof navItems[0]; currentPath: string; collapsed: boolean }) => {
  const active = currentPath === item.path;
  return (
    <Link
      to={item.path}
      className={`relative flex items-center gap-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group
        ${collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'}`}
      style={
        active
          ? {
              background: item.gradient,
              color: 'white',
              boxShadow: '0 6px 20px hsla(0,0%,0%,0.25), inset 0 1px 0 hsla(0,0%,100%,0.2)',
            }
          : { color: 'hsla(145,30%,85%,0.75)' }
      }
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = item.gradient;
          e.currentTarget.style.opacity = '0.92';
          e.currentTarget.style.color = 'white';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.color = 'hsla(145,30%,85%,0.75)';
        }
      }}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active-pill"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-white/80"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}
      <item.icon className={`h-[17px] w-[17px] shrink-0 transition-transform duration-200 ${!active ? 'group-hover:scale-110' : ''}`} />
      <AnimatePresence>
        {!collapsed && (
          <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} className="flex-1 truncate">
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {!collapsed && active && <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />}
      {collapsed && (
        <div
          className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50"
          style={{ background: 'hsla(145,50%,22%,0.95)', backdropFilter: 'blur(8px)', border: '1px solid hsla(145,40%,50%,0.2)' }}
        >
          {item.label}
        </div>
      )}
    </Link>
  );
};

/* ──── Footer Link ──── */
const SidebarFooterLink = ({ to, icon: Icon, label, collapsed }: { to: string; icon: any; label: string; collapsed: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group
      ${collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'}
      text-white/50 hover:text-white/80`}
    onMouseEnter={(e) => { e.currentTarget.style.background = 'hsla(0,0%,100%,0.06)'; e.currentTarget.style.backdropFilter = 'blur(6px)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.backdropFilter = 'none'; }}
  >
    <Icon className="h-4 w-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
    <AnimatePresence>
      {!collapsed && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{label}</motion.span>
      )}
    </AnimatePresence>
  </Link>
);

export default AdminLayout;

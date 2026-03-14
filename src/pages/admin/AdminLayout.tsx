import { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Users, MessageSquare, Settings, LayoutDashboard, Wrench, LogOut, ArrowLeft, Star, MessageCircle, ShoppingCart, Link2, ChevronRight } from 'lucide-react';

const navItems = [
  { label: 'ড্যাশবোর্ড', shortLabel: 'Home', icon: LayoutDashboard, path: '/admin' },
  { label: 'অর্ডার সমূহ', shortLabel: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { label: 'মেসেজ ইনবক্স', shortLabel: 'Inbox', icon: MessageSquare, path: '/admin/messages' },
  { label: 'টিম ম্যানেজমেন্ট', shortLabel: 'Team', icon: Users, path: '/admin/team' },
  { label: 'সার্ভিস সমূহ', shortLabel: 'Service', icon: Wrench, path: '/admin/services' },
  { label: 'ক্লায়েন্ট রিভিউ', shortLabel: 'Review', icon: Star, path: '/admin/reviews' },
  { label: 'ডেমো লিংক', shortLabel: 'Demo', icon: Link2, path: '/admin/demo-links' },
  { label: 'চ্যাটবট সেটআপ', shortLabel: 'Chatbot', icon: MessageCircle, path: '/admin/chatbot' },
  { label: 'সাইট সেটিংস', shortLabel: 'Settings', icon: Settings, path: '/admin/settings' },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Desktop Sidebar */}
      <aside
        className="w-[270px] flex-col fixed h-full z-50 hidden lg:flex overflow-hidden"
        style={{
          background: 'linear-gradient(165deg, hsl(152, 60%, 12%) 0%, hsl(145, 55%, 9%) 40%, hsl(160, 50%, 13%) 70%, hsl(140, 45%, 10%) 100%)',
        }}
      >
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-[0.07] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(145, 70%, 50%), transparent 70%)' }} />
        <div className="absolute bottom-20 left-0 w-32 h-32 rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(170, 60%, 45%), transparent 70%)' }} />
        {/* Brand Header */}
        <div className="px-6 py-5 border-b" style={{ borderColor: 'hsla(145, 50%, 40%, 0.15)' }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-lg ring-2 ring-white/10" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2" style={{ borderColor: 'hsl(145, 63%, 10%)' }} />
            </div>
            <div>
              <span className="font-bold text-white text-[15px] tracking-tight">Upnex IT</span>
              <p className="text-[11px] font-medium" style={{ color: 'hsla(145, 60%, 65%, 0.7)' }}>Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'hsla(145, 40%, 55%, 0.5)' }}>
            প্রধান মেনু
          </p>
          {navItems.slice(0, 3).map((item) => <NavItem key={item.path} item={item} currentPath={location.pathname} />)}

          <div className="pt-4 pb-1">
            <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'hsla(145, 40%, 55%, 0.5)' }}>
              কন্টেন্ট ম্যানেজমেন্ট
            </p>
          </div>
          {navItems.slice(3, 7).map((item) => <NavItem key={item.path} item={item} currentPath={location.pathname} />)}

          <div className="pt-4 pb-1">
            <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'hsla(145, 40%, 55%, 0.5)' }}>
              কনফিগারেশন
            </p>
          </div>
          {navItems.slice(7).map((item) => <NavItem key={item.path} item={item} currentPath={location.pathname} />)}
        </nav>

        {/* Footer Actions */}
        <div className="px-3 py-3 space-y-1" style={{ borderTop: '1px solid hsla(145, 50%, 40%, 0.15)' }}>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group"
            style={{ color: 'hsla(145, 30%, 70%, 0.8)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'hsla(145, 40%, 30%, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <ArrowLeft className="h-[17px] w-[17px] group-hover:-translate-x-0.5 transition-transform" />
            ওয়েবসাইটে ফিরুন
          </Link>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 w-full group"
            style={{ color: 'hsl(0, 65%, 60%)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'hsla(0, 60%, 40%, 0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut className="h-[17px] w-[17px] group-hover:translate-x-0.5 transition-transform" />
            লগআউট
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3"
        style={{ background: 'hsla(145, 63%, 10%, 0.97)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg ring-1 ring-white/10" />
            <span className="font-bold text-sm text-white tracking-tight">Admin Panel</span>
          </div>
          <div className="flex items-center gap-1">
            <Link to="/" className="p-2 rounded-lg transition-colors" style={{ color: 'hsla(145, 30%, 70%, 0.8)' }}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <button onClick={() => signOut()} className="p-2 rounded-lg transition-colors" style={{ color: 'hsl(0, 65%, 60%)' }}>
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1">
        <div
          className="rounded-2xl shadow-xl px-1 py-2 flex items-center justify-around overflow-x-auto"
          style={{
            background: 'hsla(145, 63%, 10%, 0.97)',
            backdropFilter: 'blur(16px)',
            border: '1px solid hsla(145, 50%, 40%, 0.15)',
          }}
        >
          {navItems.slice(0, 7).map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-0"
              >
                <div
                  className="p-1.5 rounded-lg transition-all"
                  style={active ? { background: 'hsla(145, 55%, 40%, 0.35)' } : {}}
                >
                  <item.icon className="h-4 w-4" style={{ color: active ? 'hsl(145, 70%, 75%)' : 'hsla(145, 20%, 60%, 0.7)' }} />
                </div>
                <span
                  className="text-[9px] font-medium leading-none"
                  style={{ color: active ? 'white' : 'hsla(145, 20%, 60%, 0.7)' }}
                >{item.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-[270px] pt-16 pb-24 lg:pt-0 lg:pb-0">
        <div className="p-4 md:p-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

/* Reusable nav item */
const NavItem = ({ item, currentPath }: { item: typeof navItems[0]; currentPath: string }) => {
  const active = currentPath === item.path;
  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group relative ${active ? 'shadow-lg' : ''}`}
      style={
        active
          ? {
              background: 'linear-gradient(135deg, hsla(145, 55%, 35%, 0.5) 0%, hsla(145, 50%, 28%, 0.4) 100%)',
              color: 'white',
              boxShadow: '0 4px 15px -3px hsla(145, 60%, 25%, 0.3)',
            }
          : { color: 'hsla(145, 25%, 72%, 0.85)' }
      }
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = 'hsla(145, 40%, 30%, 0.2)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }}
    >
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
          style={{ background: 'hsl(145, 65%, 55%)' }}
        />
      )}
      <item.icon className={`h-[17px] w-[17px] transition-transform duration-200 ${active ? '' : 'group-hover:scale-110'}`} />
      <span className="flex-1">{item.label}</span>
      {active && <ChevronRight className="h-3.5 w-3.5 opacity-50" />}
    </Link>
  );
};

export default AdminLayout;

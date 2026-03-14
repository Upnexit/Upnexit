import { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Users, MessageSquare, Settings, LayoutDashboard, Wrench, LogOut, ArrowLeft, Star, MessageCircle, ShoppingCart, Link2 } from 'lucide-react';

const navItems = [
  { label: 'ড্যাশবোর্ড', shortLabel: 'Home', icon: LayoutDashboard, path: '/admin' },
  { label: 'অর্ডার', shortLabel: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { label: 'মেসেজ', shortLabel: 'Inbox', icon: MessageSquare, path: '/admin/messages' },
  { label: 'টিম', shortLabel: 'Team', icon: Users, path: '/admin/team' },
  { label: 'সার্ভিস', shortLabel: 'Service', icon: Wrench, path: '/admin/services' },
  { label: 'রিভিউ', shortLabel: 'Review', icon: Star, path: '/admin/reviews' },
  { label: 'ডেমো লিংক', shortLabel: 'Demo', icon: Link2, path: '/admin/demo-links' },
  { label: 'চ্যাটবট', shortLabel: 'Chatbot', icon: MessageCircle, path: '/admin/chatbot' },
  { label: 'সেটিংস', shortLabel: 'Settings', icon: Settings, path: '/admin/settings' },
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
      {/* Desktop Sidebar - Dark Green */}
      <aside className="w-64 flex flex-col fixed h-full z-50 hidden lg:flex" style={{ background: 'hsl(145, 63%, 12%)' }}>
        <div className="p-5 border-b" style={{ borderColor: 'hsla(145, 50%, 30%, 0.4)' }}>
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-xl shadow-md" />
            <div>
              <span className="font-bold text-white text-sm">Upnex It</span>
              <p className="text-[10px]" style={{ color: 'hsla(145, 60%, 70%, 0.8)' }}>Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'text-white shadow-md'
                    : 'hover:bg-white/5'
                }`}
                style={active 
                  ? { background: 'hsla(145, 60%, 35%, 0.5)', color: 'white' } 
                  : { color: 'hsla(145, 30%, 75%, 0.9)' }
                }
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 space-y-0.5" style={{ borderTop: '1px solid hsla(145, 50%, 30%, 0.3)' }}>
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
            style={{ color: 'hsla(145, 30%, 75%, 0.9)' }}
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
            ওয়েবসাইটে ফিরুন
          </Link>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all w-full hover:bg-red-500/10"
            style={{ color: 'hsl(0, 70%, 65%)' }}
          >
            <LogOut className="h-[18px] w-[18px]" />
            লগআউট
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3" style={{ background: 'hsla(145, 63%, 12%, 0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-sm text-white">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="p-2 rounded-lg transition-colors" style={{ color: 'hsla(145, 30%, 75%, 0.9)' }}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <button onClick={() => signOut()} className="p-2 rounded-lg transition-colors" style={{ color: 'hsl(0, 70%, 65%)' }}>
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1">
        <div className="rounded-2xl shadow-elevated px-1 py-2 flex items-center justify-around overflow-x-auto" style={{ background: 'hsla(145, 63%, 12%, 0.95)', backdropFilter: 'blur(12px)', border: '1px solid hsla(145, 50%, 30%, 0.3)' }}>
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
                  style={active ? { background: 'hsla(145, 60%, 35%, 0.5)' } : {}}
                >
                  <item.icon className="h-4 w-4" style={{ color: active ? 'white' : 'hsla(145, 30%, 65%, 0.8)' }} />
                </div>
                <span 
                  className="text-[9px] font-medium leading-none"
                  style={{ color: active ? 'white' : 'hsla(145, 30%, 65%, 0.8)' }}
                >{item.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-16 pb-24 lg:pt-0 lg:pb-0">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

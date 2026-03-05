import { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Users, MessageSquare, Settings, LayoutDashboard, Wrench, LogOut, ArrowLeft, Star, MessageCircle } from 'lucide-react';

const navItems = [
  { label: 'ড্যাশবোর্ড', shortLabel: 'Home', icon: LayoutDashboard, path: '/admin' },
  { label: 'টিম', shortLabel: 'Team', icon: Users, path: '/admin/team' },
  { label: 'মেসেজ', shortLabel: 'Inbox', icon: MessageSquare, path: '/admin/messages' },
  { label: 'সার্ভিস', shortLabel: 'Service', icon: Wrench, path: '/admin/services' },
  { label: 'রিভিউ', shortLabel: 'Review', icon: Star, path: '/admin/reviews' },
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
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-background border-r border-border flex flex-col fixed h-full z-50 hidden lg:flex">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-foreground">Upnex It Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
            <ArrowLeft className="h-5 w-5" />
            ওয়েবসাইটে ফিরুন
          </Link>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all w-full"
          >
            <LogOut className="h-5 w-5" />
            লগআউট
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-b border-border z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-sm text-foreground">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <button onClick={() => signOut()} className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1">
        <div className="bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-elevated px-2 py-2 flex items-center justify-around">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-0 ${
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-all ${active ? 'bg-primary/10' : ''}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-medium leading-none">{item.shortLabel}</span>
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

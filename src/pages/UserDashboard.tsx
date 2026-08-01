import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Package, MessageSquare, Bell, LogOut, Settings,
  ChevronRight, Clock, CheckCircle2, AlertCircle, Home,
  Edit2, Save, X, Phone, Mail, ShoppingBag, Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type TabKey = 'orders' | 'consultations' | 'profile' | 'notifications';

interface Profile {
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-background rounded-2xl border border-border p-4 sm:p-5 hover:shadow-card transition-all"
  >
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xl sm:text-2xl font-black text-foreground">{value}</p>
        <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  </motion.div>
);

const UserDashboard = () => {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<TabKey>('orders');
  const [profile, setProfile] = useState<Profile>({ full_name: null, phone: null, avatar_url: null });
  const [orders, setOrders] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: '', phone: '' });
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?redirect=/dashboard');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setDataLoading(true);
    const [profileRes, messagesRes, notifRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle(),
      supabase.from('messages').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    ]);
    if (profileRes.data) {
      setProfile(profileRes.data);
      setEditForm({ full_name: profileRes.data.full_name || '', phone: profileRes.data.phone || '' });
    }
    const msgs = messagesRes.data || [];
    setOrders(msgs.filter(m => m.message?.startsWith('[ORDER]')));
    setConsultations(msgs.filter(m => !m.message?.startsWith('[ORDER]')));
    setNotifications(notifRes.data || []);
    setDataLoading(false);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    const { error } = await supabase.from('profiles').update({
      full_name: editForm.full_name,
      phone: editForm.phone,
    }).eq('user_id', user.id);
    if (error) {
      toast({ title: isBn ? 'আপডেট ব্যর্থ' : 'Update failed', variant: 'destructive' });
    } else {
      setProfile(prev => ({ ...prev, full_name: editForm.full_name, phone: editForm.phone }));
      setEditingProfile(false);
      toast({ title: isBn ? '✅ প্রোফাইল আপডেট হয়েছে' : '✅ Profile updated' });
    }
  };

  const handleMarkRead = async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const tabs: { key: TabKey; label: string; icon: any; badge?: number }[] = [
    { key: 'orders', label: isBn ? 'অর্ডার' : 'Orders', icon: Package },
    { key: 'consultations', label: isBn ? 'কনসালটেশন' : 'Consults', icon: MessageSquare },
    { key: 'notifications', label: isBn ? 'নোটিফিকেশন' : 'Alerts', icon: Bell, badge: unreadCount },
    { key: 'profile', label: isBn ? 'প্রোফাইল' : 'Profile', icon: User },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  const displayName = profile.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || '';
  const avatarUrl = profile.avatar_url || user.user_metadata?.avatar_url;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 lg:pt-24 pb-28 lg:pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">

          {/* Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl lg:rounded-3xl border border-border mb-6 lg:mb-8"
          >
            {/* Gradient bg */}
            <div className="absolute inset-0 gradient-accent opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.3),transparent_60%)]" />

            <div className="relative p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-background/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-background/30 shrink-0">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-primary-foreground truncate">
                    {isBn ? 'স্বাগতম,' : 'Welcome,'} {displayName}
                  </h1>
                  <p className="text-xs sm:text-sm text-primary-foreground/90 mt-0.5 truncate">
                    {user.email}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                  <Link to="/" className="flex-1 sm:flex-none">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto rounded-xl gap-1.5 bg-background/15 border-background/30 text-primary-foreground hover:bg-background/25 backdrop-blur-sm">
                      <Home className="h-4 w-4" /> {isBn ? 'হোম' : 'Home'}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}
                    className="flex-1 sm:flex-none rounded-xl gap-1.5 bg-background/15 border-background/30 text-primary-foreground hover:bg-destructive/80 backdrop-blur-sm">
                    <LogOut className="h-4 w-4" /> {isBn ? 'লগআউট' : 'Logout'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
            <StatCard icon={Package} label={isBn ? 'মোট অর্ডার' : 'Total Orders'} value={orders.length} color="bg-primary/10 text-primary" />
            <StatCard icon={MessageSquare} label={isBn ? 'কনসালটেশন' : 'Consultations'} value={consultations.length} color="bg-accent/20 text-accent-foreground" />
            <StatCard icon={Bell} label={isBn ? 'অপঠিত' : 'Unread'} value={unreadCount} color="bg-destructive/10 text-destructive" />
            <StatCard icon={CheckCircle2} label={isBn ? 'সম্পন্ন' : 'Completed'} value={0} color="bg-secondary/20 text-secondary-foreground" />
          </div>

          {/* Tab Bar - horizontal scroll on mobile */}
          <div className="flex gap-1.5 sm:gap-2 mb-5 lg:mb-6 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {tab.label}
                {tab.badge ? (
                  <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[9px] sm:text-[10px] font-bold">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

              {/* Orders */}
              {activeTab === 'orders' && (
                <div className="space-y-3">
                  {dataLoading ? (
                    <LoadingSkeleton />
                  ) : orders.length === 0 ? (
                    <EmptyState icon={ShoppingBag} text={isBn ? 'কোনো অর্ডার নেই' : 'No orders yet'}
                      cta={isBn ? 'সেবা দেখুন' : 'Browse Services'} ctaLink="/services" />
                  ) : (
                    orders.map((order, i) => (
                      <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                        className="bg-background rounded-xl border border-border p-4 hover:shadow-card transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">Order</span>
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(order.created_at).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}
                              </span>
                            </div>
                            <p className="text-sm text-foreground font-medium line-clamp-2">
                              {order.message?.replace('[ORDER] ', '').split('|')[0]}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-amber-600 bg-amber-500/10 px-2 py-1 rounded-lg font-semibold shrink-0">
                            <AlertCircle className="h-3 w-3" />
                            <span className="hidden sm:inline">{isBn ? 'প্রক্রিয়াধীন' : 'Processing'}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Consultations */}
              {activeTab === 'consultations' && (
                <div className="space-y-3">
                  {dataLoading ? (
                    <LoadingSkeleton />
                  ) : consultations.length === 0 ? (
                    <EmptyState icon={Sparkles} text={isBn ? 'কোনো কনসালটেশন রিকোয়েস্ট নেই' : 'No consultation requests'}
                      cta={isBn ? 'ফ্রি কনসালটেশন নিন' : 'Get Free Consultation'} ctaLink="/consultation" />
                  ) : (
                    consultations.map((c, i) => (
                      <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                        className="bg-background rounded-xl border border-border p-4 hover:shadow-card transition-shadow">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-foreground text-[10px] font-bold">
                            {isBn ? 'কনসালটেশন' : 'CONSULTATION'}
                          </span>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(c.created_at).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}
                          </span>
                        </div>
                        <p className="text-sm text-foreground line-clamp-2">{c.message}</p>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="space-y-3">
                  {dataLoading ? (
                    <LoadingSkeleton />
                  ) : notifications.length === 0 ? (
                    <EmptyState icon={Bell} text={isBn ? 'কোনো নোটিফিকেশন নেই' : 'No notifications'} />
                  ) : (
                    notifications.map((n, i) => (
                      <motion.div key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                        onClick={() => !n.is_read && handleMarkRead(n.id)}
                        className={`bg-background rounded-xl border p-4 cursor-pointer transition-all hover:shadow-card ${
                          n.is_read ? 'border-border opacity-70' : 'border-primary/30 bg-primary/[0.02]'
                        }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.is_read ? 'bg-muted-foreground/30' : 'bg-primary animate-pulse'}`} />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-foreground">{n.title}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                            <span className="text-[10px] text-muted-foreground mt-1 inline-block">
                              {new Date(n.created_at).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Profile */}
              {activeTab === 'profile' && (
                <div className="bg-background rounded-2xl border border-border overflow-hidden">
                  {/* Profile header inside card */}
                  <div className="px-5 sm:px-6 lg:px-8 pt-5 sm:pt-6 lg:pt-8 pb-5 border-b border-border">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                        <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        {isBn ? 'প্রোফাইল সেটিংস' : 'Profile Settings'}
                      </h3>
                      {!editingProfile ? (
                        <Button variant="outline" size="sm" onClick={() => setEditingProfile(true)} className="rounded-xl gap-1.5">
                          <Edit2 className="h-3.5 w-3.5" /> {isBn ? 'এডিট' : 'Edit'}
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingProfile(false)} className="rounded-xl">
                            <X className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" onClick={handleSaveProfile} className="rounded-xl gap-1.5">
                            <Save className="h-3.5 w-3.5" /> {isBn ? 'সেভ' : 'Save'}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Avatar area */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20 shrink-0">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground truncate">{displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="px-5 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        {isBn ? 'পূর্ণ নাম' : 'Full Name'}
                      </label>
                      {editingProfile ? (
                        <Input value={editForm.full_name} onChange={e => setEditForm(p => ({ ...p, full_name: e.target.value }))}
                          className="h-10 sm:h-11 rounded-xl" />
                      ) : (
                        <p className="text-sm text-foreground bg-muted/40 rounded-xl px-4 py-2.5 sm:py-3">{profile.full_name || '—'}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        {isBn ? 'ইমেইল' : 'Email'}
                      </label>
                      <p className="text-sm text-foreground bg-muted/40 rounded-xl px-4 py-2.5 sm:py-3">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        {isBn ? 'ফোন' : 'Phone'}
                      </label>
                      {editingProfile ? (
                        <Input value={editForm.phone} onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))}
                          className="h-10 sm:h-11 rounded-xl" />
                      ) : (
                        <p className="text-sm text-foreground bg-muted/40 rounded-xl px-4 py-2.5 sm:py-3">{profile.phone || '—'}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
};

/* Reusable sub-components */
const LoadingSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map(i => (
      <div key={i} className="bg-muted/40 rounded-xl h-20 animate-pulse" />
    ))}
  </div>
);

const EmptyState = ({ icon: Icon, text, cta, ctaLink }: { icon: any; text: string; cta?: string; ctaLink?: string }) => (
  <div className="text-center py-14 sm:py-16 bg-muted/20 rounded-2xl border border-dashed border-border">
    <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
      <Icon className="h-7 w-7 text-muted-foreground/50" />
    </div>
    <p className="text-sm text-muted-foreground font-medium">{text}</p>
    {cta && ctaLink && (
      <Link to={ctaLink}>
        <Button variant="hero" size="sm" className="mt-4 rounded-xl">
          {cta} <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    )}
  </div>
);

export default UserDashboard;

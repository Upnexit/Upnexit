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
  Edit2, Save, X, Phone, Mail, Camera
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
    { key: 'orders', label: isBn ? 'অর্ডারসমূহ' : 'Orders', icon: Package },
    { key: 'consultations', label: isBn ? 'কনসালটেশন' : 'Consultations', icon: MessageSquare },
    { key: 'notifications', label: isBn ? 'নোটিফিকেশন' : 'Notifications', icon: Bell, badge: unreadCount },
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Welcome Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                {isBn ? 'স্বাগতম,' : 'Welcome,'} <span className="text-primary">{displayName}</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {isBn ? 'আপনার ড্যাশবোর্ড থেকে সবকিছু পরিচালনা করুন' : 'Manage everything from your dashboard'}
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/">
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
                  <Home className="h-4 w-4" /> {isBn ? 'হোম' : 'Home'}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-xl gap-1.5 text-destructive hover:text-destructive">
                <LogOut className="h-4 w-4" /> {isBn ? 'লগআউট' : 'Logout'}
              </Button>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.badge ? (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-3">
                  {dataLoading ? (
                    <div className="text-center py-12 text-muted-foreground">{isBn ? 'লোড হচ্ছে...' : 'Loading...'}</div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border">
                      <Package className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground font-medium">{isBn ? 'কোনো অর্ডার নেই' : 'No orders yet'}</p>
                      <Link to="/services">
                        <Button variant="hero" size="sm" className="mt-4 rounded-xl">
                          {isBn ? 'সেবা দেখুন' : 'Browse Services'} <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    orders.map((order, i) => (
                      <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-background rounded-xl border border-border p-4 sm:p-5 hover:shadow-card transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">ORDER</span>
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(order.created_at).toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}
                              </span>
                            </div>
                            <p className="text-sm text-foreground font-medium truncate">
                              {order.message?.replace('[ORDER] ', '').split('|')[0]}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg font-semibold">
                            <AlertCircle className="h-3 w-3" />
                            {isBn ? 'প্রক্রিয়াধীন' : 'Processing'}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Consultations Tab */}
              {activeTab === 'consultations' && (
                <div className="space-y-3">
                  {dataLoading ? (
                    <div className="text-center py-12 text-muted-foreground">{isBn ? 'লোড হচ্ছে...' : 'Loading...'}</div>
                  ) : consultations.length === 0 ? (
                    <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border">
                      <MessageSquare className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground font-medium">{isBn ? 'কোনো কনসালটেশন রিকোয়েস্ট নেই' : 'No consultation requests'}</p>
                      <Link to="/consultation">
                        <Button variant="hero" size="sm" className="mt-4 rounded-xl">
                          {isBn ? 'ফ্রি কনসালটেশন নিন' : 'Get Free Consultation'} <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    consultations.map((c, i) => (
                      <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-background rounded-xl border border-border p-4 sm:p-5 hover:shadow-card transition-shadow">
                        <div className="flex items-center gap-2 mb-1">
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

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-3">
                  {dataLoading ? (
                    <div className="text-center py-12 text-muted-foreground">{isBn ? 'লোড হচ্ছে...' : 'Loading...'}</div>
                  ) : notifications.length === 0 ? (
                    <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border">
                      <Bell className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground font-medium">{isBn ? 'কোনো নোটিফিকেশন নেই' : 'No notifications'}</p>
                    </div>
                  ) : (
                    notifications.map((n, i) => (
                      <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        onClick={() => !n.is_read && handleMarkRead(n.id)}
                        className={`bg-background rounded-xl border p-4 sm:p-5 cursor-pointer transition-all hover:shadow-card ${
                          n.is_read ? 'border-border opacity-70' : 'border-primary/30 bg-primary/[0.02]'
                        }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.is_read ? 'bg-muted-foreground/30' : 'bg-primary'}`} />
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

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-background rounded-2xl border border-border p-5 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      {isBn ? 'প্রোফাইল সেটিংস' : 'Profile Settings'}
                    </h3>
                    {!editingProfile ? (
                      <Button variant="outline" size="sm" onClick={() => setEditingProfile(true)} className="rounded-xl gap-1.5">
                        <Edit2 className="h-3.5 w-3.5" /> {isBn ? 'এডিট' : 'Edit'}
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingProfile(false)} className="rounded-xl gap-1">
                          <X className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" onClick={handleSaveProfile} className="rounded-xl gap-1.5">
                          <Save className="h-3.5 w-3.5" /> {isBn ? 'সেভ' : 'Save'}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                        {profile.avatar_url ? (
                          <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-8 w-8 text-primary" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        {isBn ? 'পূর্ণ নাম' : 'Full Name'}
                      </label>
                      {editingProfile ? (
                        <Input value={editForm.full_name} onChange={e => setEditForm(p => ({ ...p, full_name: e.target.value }))}
                          className="h-11 rounded-xl" />
                      ) : (
                        <p className="text-sm text-foreground bg-muted/40 rounded-xl px-4 py-3">{profile.full_name || '-'}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        {isBn ? 'ইমেইল' : 'Email'}
                      </label>
                      <p className="text-sm text-foreground bg-muted/40 rounded-xl px-4 py-3">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        {isBn ? 'ফোন' : 'Phone'}
                      </label>
                      {editingProfile ? (
                        <Input value={editForm.phone} onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))}
                          className="h-11 rounded-xl" />
                      ) : (
                        <p className="text-sm text-foreground bg-muted/40 rounded-xl px-4 py-3">{profile.phone || '-'}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;

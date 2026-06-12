import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Trash2, MailOpen, Send, X, ShoppingCart, Package, Building2, Calendar,
  Search, Filter, Eye, EyeOff, Inbox, Zap, Link2, User, Phone, Mail,
  ChevronDown, ChevronUp, MoreHorizontal, CheckCheck, Clock, AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format, formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const QUICK_REPLIES = [
  { label: '📦 অর্ডার গ্রহণ', icon: '📦', body: `প্রিয় গ্রাহক,\n\nআপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে এবং আমাদের ডেভেলপমেন্ট টিম এটি প্রসেস করা শুরু করেছে।\n\nআমরা আপনার প্রজেক্টের মান নিশ্চিত করতে প্রতিটি ধাপে সর্বোচ্চ যত্ন নিই। শীঘ্রই আপনাকে প্রগ্রেস আপডেট জানানো হবে।\n\nযেকোনো প্রশ্ন থাকলে নির্দ্বিধায় জানাবেন।\n\nশুভেচ্ছান্তে,\nUpnexIT টিম` },
  { label: '🔄 কাজ চলছে', icon: '🔄', body: `প্রিয় গ্রাহক,\n\nআপনাকে জানাতে পেরে আনন্দিত যে আপনার প্রজেক্টে সক্রিয়ভাবে কাজ চলছে! আমাদের দক্ষ ডেভেলপমেন্ট টিম প্রতিটি ফিচার তৈরিতে মনোযোগী।\n\nখুব শীঘ্রই আপনি একটি ডেমো দেখতে পাবেন। ডেমো লিংক তৈরি হলে সাথে সাথে আপনাকে পাঠানো হবে।\n\nধৈর্য ধরার জন্য ধন্যবাদ!\n\nশুভেচ্ছান্তে,\nUpnexIT টিম` },
  { label: '✅ সম্পন্ন', icon: '✅', body: `প্রিয় গ্রাহক,\n\n🎉 দারুণ খবর! আপনার প্রজেক্ট সফলভাবে সম্পন্ন হয়েছে!\n\nনিচের ডেমো লিংকে ক্লিক করে আপনি সরাসরি আপনার প্রজেক্টটি দেখতে ও পরীক্ষা করতে পারবেন। আমরা নিশ্চিত এটি আপনার পছন্দ হবে।\n\nকোনো পরিবর্তন বা অতিরিক্ত ফিচার প্রয়োজন হলে আমাদের জানান — আমরা সবসময় প্রস্তুত।\n\nআপনার সাথে কাজ করতে পেরে আনন্দিত!\n\nশুভেচ্ছান্তে,\nUpnexIT টিম` },
  { label: '💬 তথ্য প্রয়োজন', icon: '💬', body: `প্রিয় গ্রাহক,\n\nআপনার প্রজেক্ট আরও ভালোভাবে তৈরি করতে আমাদের কিছু অতিরিক্ত তথ্য প্রয়োজন:\n\n• আপনার প্রতিষ্ঠানের লোগো ও ব্র্যান্ড কালার\n• পছন্দের ডিজাইন রেফারেন্স (যদি থাকে)\n• বিশেষ কোনো ফিচারের প্রয়োজনীয়তা\n\nঅনুগ্রহ করে এই ইমেইলে রিপ্লাই করুন অথবা আমাদের ওয়েবসাইটে যোগাযোগ করুন।\n\nধন্যবাদ,\nUpnexIT টিম` },
];

const OrdersManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyTo, setReplyTo] = useState<{ id: string; email: string; name: string } | null>(null);
  const [replyForm, setReplyForm] = useState({ subject: '', body: '', demoLink: '' });
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .like('message', '%[ORDER]%')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('messages').update({ is_read: true }).eq('id', id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      const unreadIds = orders.filter(o => !o.is_read).map(o => o.id);
      if (unreadIds.length === 0) return;
      await supabase.from('messages').update({ is_read: true }).in('id', unreadIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: '✅', description: 'সকল অর্ডার পঠিত হিসেবে চিহ্নিত' });
    },
  });

  const deleteOrder = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('messages').delete().eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: '✅', description: 'অর্ডার মুছে ফেলা হয়েছে' });
    },
  });

  const bulkDelete = useMutation({
    mutationFn: async () => {
      const ids = Array.from(selectedIds);
      if (ids.length === 0) return;
      await supabase.from('messages').delete().in('id', ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setSelectedIds(new Set());
      toast({ title: '✅', description: `${selectedIds.size} টি অর্ডার মুছে ফেলা হয়েছে` });
    },
  });

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReply = async () => {
    if (!replyTo || !replyForm.body.trim()) return;
    if (!isValidEmail(replyTo.email)) {
      toast({ title: '❌', description: 'এই অর্ডারে কোনো বৈধ ইমেইল নেই', variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-reply', {
        body: {
          to: replyTo.email,
          subject: replyForm.subject || `UpnexIT — অর্ডার আপডেট: ${replyTo.name}`,
          body: replyForm.body,
          demoLink: replyForm.demoLink || undefined,
        },
      });
      if (error) throw error;
      toast({ title: '✅', description: `${replyTo.email} তে ইমেইল পাঠানো হয়েছে` });
      setReplyTo(null);
      setReplyForm({ subject: '', body: '', demoLink: '' });
    } catch {
      toast({ title: '❌', description: 'ইমেইল পাঠাতে ব্যর্থ', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const parseOrder = (msg: string) => {
    const parts = msg.replace('[ORDER]', '').split('|').map(s => s.trim());
    const details: Record<string, string> = {};
    parts.forEach((part) => {
      const [key, ...vals] = part.split(':');
      const k = key?.trim().toLowerCase();
      const v = vals.join(':').trim();
      if (k === 'service') details.service = v;
      if (k === 'plan') details.plan = v;
      if (k === 'institution') details.org = v;
      if (k === 'address') details.address = v;
      if (k === 'details') details.details = v;
    });
    return details;
  };

  const filtered = orders.filter((o) => {
    if (filter === 'unread' && o.is_read) return false;
    if (filter === 'read' && !o.is_read) return false;
    if (search) {
      const q = search.toLowerCase();
      return o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q) || o.message.toLowerCase().includes(q);
    }
    return true;
  });

  const unreadCount = orders.filter((o) => !o.is_read).length;
  const readCount = orders.length - unreadCount;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="অর্ডার ম্যানেজমেন্ট"
        subtitle="সকল অর্ডার এখানে ম্যানেজ করুন"
        actions={
          unreadCount > 0 ? (
            <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()} className="gap-2 text-xs">
              <CheckCheck className="h-3.5 w-3.5" /> সকল পঠিত করুন
            </Button>
          ) : null
        }
      />
      <div className="flex flex-col gap-5">

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'মোট অর্ডার', value: orders.length, icon: Package, gradient: 'linear-gradient(135deg, #f97316 0%, #f43f5e 100%)', glow: '#f9731655' },
            { label: 'নতুন', value: unreadCount, icon: Clock, gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', glow: '#f59e0b55' },
            { label: 'পঠিত', value: readCount, icon: Eye, gradient: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)', glow: '#10b98155' },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className="relative overflow-hidden rounded-2xl p-4 text-white shadow-lg ring-1 ring-white/20"
              style={{ background: s.gradient, boxShadow: `0 12px 30px -10px ${s.glow}` }}
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-white/85 mb-1">{s.label}</p>
                  <p className="text-2xl font-black text-white drop-shadow-sm">{s.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="নাম, ইমেইল বা সার্ভিস দিয়ে খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 bg-background border-border rounded-xl"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 bg-muted/50 p-1 rounded-xl border border-border">
          {([
            { key: 'all' as const, label: 'সকল', icon: Filter, count: orders.length },
            { key: 'unread' as const, label: 'নতুন', icon: AlertCircle, count: unreadCount },
            { key: 'read' as const, label: 'পঠিত', icon: Eye, count: readCount },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === f.key
                  ? 'bg-background text-foreground shadow-sm border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <f.icon className="h-3 w-3" />
              {f.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === f.key ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/15">
            <span className="text-xs font-semibold text-primary">{selectedIds.size} টি সিলেক্টেড</span>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => bulkDelete.mutate()}>
              <Trash2 className="h-3 w-3 mr-1" /> মুছুন
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setSelectedIds(new Set())}>
              <X className="h-3 w-3 mr-1" /> বাতিল
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply Modal */}
      <AnimatePresence>
        {replyTo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setReplyTo(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-background rounded-2xl border border-border shadow-2xl w-full max-w-lg overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                      <Send className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-foreground">রিপ্লাই পাঠান</h2>
                      <p className="text-[11px] text-muted-foreground">{replyTo.name} — {replyTo.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setReplyTo(null)} className="h-8 w-8 rounded-lg">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                {/* Quick Replies */}
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Zap className="h-3 w-3 text-amber-500" /> দ্রুত টেমপ্লেট
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_REPLIES.map((qr) => (
                      <button
                        key={qr.label}
                        onClick={() => setReplyForm({ ...replyForm, body: qr.body })}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs rounded-xl border border-border bg-muted/30 hover:bg-primary/8 hover:border-primary/20 hover:text-primary transition-all font-medium text-left"
                      >
                        <span className="text-base">{qr.icon}</span>
                        <span>{qr.label.replace(/^[^\s]+\s/, '')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Input placeholder="বিষয় (ঐচ্ছিক)" value={replyForm.subject} onChange={(e) => setReplyForm({ ...replyForm, subject: e.target.value })} className="bg-muted/30 rounded-xl h-10" />
                <Textarea placeholder="আপনার বার্তা লিখুন..." rows={6} value={replyForm.body} onChange={(e) => setReplyForm({ ...replyForm, body: e.target.value })} className="bg-muted/30 resize-none rounded-xl" />
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input placeholder="ডেমো লিংক (ঐচ্ছিক)" value={replyForm.demoLink} onChange={(e) => setReplyForm({ ...replyForm, demoLink: e.target.value })} className="bg-muted/30 rounded-xl h-10" />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-border px-6 py-4 flex justify-end gap-2 bg-muted/20">
                <Button variant="outline" onClick={() => setReplyTo(null)} className="rounded-xl">বাতিল</Button>
                <Button onClick={handleReply} disabled={sending || !replyForm.body.trim()} className="gap-2 rounded-xl">
                  <Send className="h-4 w-4" />
                  {sending ? 'পাঠানো হচ্ছে...' : 'ইমেইল পাঠান'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background rounded-2xl border border-border p-5 animate-pulse">
              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-xl bg-muted" />
                <div className="flex-1 space-y-2.5">
                  <div className="h-4 bg-muted rounded-lg w-1/3" />
                  <div className="h-3 bg-muted rounded-lg w-1/2" />
                  <div className="flex gap-2 mt-1">
                    <div className="h-6 bg-muted rounded-full w-24" />
                    <div className="h-6 bg-muted rounded-full w-16" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-5">
            <Inbox className="h-9 w-9 text-muted-foreground/30" />
          </div>
          <p className="text-base font-semibold text-muted-foreground mb-1">
            {search ? 'কোনো ফলাফল পাওয়া যায়নি' : 'কোনো অর্ডার নেই'}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {search ? 'অন্য কিছু দিয়ে খুঁজুন' : 'নতুন অর্ডার আসলে এখানে দেখাবে'}
          </p>
          {search && (
            <Button variant="ghost" size="sm" className="mt-3" onClick={() => setSearch('')}>সার্চ মুছুন</Button>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((order, i) => {
            const details = parseOrder(order.message);
            const isExpanded = expandedId === order.id;
            const isSelected = selectedIds.has(order.id);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025 }}
                className={`group bg-background rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                  isSelected
                    ? 'border-primary/30 ring-2 ring-primary/10 shadow-md'
                    : order.is_read
                    ? 'border-border hover:border-border/80'
                    : 'border-primary/20 shadow-sm shadow-primary/5'
                }`}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    {/* Checkbox + Avatar */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => toggleSelect(order.id)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                          isSelected
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-border hover:border-primary/40'
                        }`}
                      >
                        {isSelected && <CheckCheck className="h-3 w-3" />}
                      </button>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                        order.is_read
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-gradient-to-br from-primary/20 to-primary/10 text-primary'
                      }`}>
                        {order.name.charAt(0).toUpperCase()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        {!order.is_read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />}
                        <span className="font-bold text-foreground text-sm">{order.name}</span>
                        <span className="text-[10px] text-muted-foreground/60 hidden sm:inline-flex items-center gap-1 ml-auto">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(order.created_at!), 'dd MMM yyyy, hh:mm a', { locale: bn })}
                        </span>
                      </div>

                      {/* Contact Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {order.email}
                        </span>
                        {order.phone && (
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {order.phone}
                          </span>
                        )}
                      </div>

                      {/* Order Details Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {details.service && (
                          <Badge className="gap-1.5 bg-primary/10 text-primary border-primary/15 hover:bg-primary/15 font-semibold text-[11px] px-2.5 py-1">
                            <Package className="h-3 w-3" /> {details.service}
                          </Badge>
                        )}
                        {details.plan && (
                          <Badge variant="secondary" className="gap-1 font-semibold text-[11px] px-2.5 py-1">
                            {details.plan}
                          </Badge>
                        )}
                        {details.org && (
                          <Badge variant="outline" className="gap-1 text-[11px] px-2.5 py-1">
                            <Building2 className="h-3 w-3" /> {details.org}
                          </Badge>
                        )}
                        {!order.is_read && (
                          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/15 text-[10px] px-2 py-0.5 font-bold">
                            নতুন
                          </Badge>
                        )}
                      </div>

                      {/* Mobile date */}
                      <p className="text-[10px] text-muted-foreground/50 sm:hidden flex items-center gap-1 mb-2">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(order.created_at!), { addSuffix: true, locale: bn })}
                      </p>

                      {/* Expand toggle */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : order.id)}
                        className="text-[11px] text-primary/60 hover:text-primary font-semibold transition-colors flex items-center gap-1"
                      >
                        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        {isExpanded ? 'বন্ধ করুন' : 'বিস্তারিত দেখুন'}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-3 p-4 rounded-xl bg-muted/30 border border-border/50 space-y-2">
                              {details.address && (
                                <p className="text-xs text-foreground"><span className="font-semibold text-muted-foreground">ঠিকানা:</span> {details.address}</p>
                              )}
                              {details.details && (
                                <p className="text-xs text-foreground"><span className="font-semibold text-muted-foreground">অতিরিক্ত তথ্য:</span> {details.details}</p>
                              )}
                              <p className="text-[11px] text-muted-foreground/50 mt-2 pt-2 border-t border-border/30 whitespace-pre-wrap">{order.message}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost" size="icon"
                        onClick={() => {
                          setReplyTo({ id: order.id, email: order.email, name: order.name });
                          setReplyForm({ subject: '', body: '', demoLink: '' });
                          if (!order.is_read) markRead.mutate(order.id);
                        }}
                        title="রিপ্লাই" className="h-8 w-8 text-primary hover:bg-primary/10 rounded-lg"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                      {!order.is_read && (
                        <Button variant="ghost" size="icon" onClick={() => markRead.mutate(order.id)} title="পঠিত" className="h-8 w-8 hover:bg-muted rounded-lg">
                          <MailOpen className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteOrder.mutate(order.id)} className="h-8 w-8 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-lg">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;

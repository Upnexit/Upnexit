import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Trash2, MailOpen, Send, X, Search, Filter, Eye, EyeOff, Inbox, Zap,
  MessageSquare, Calendar, Link2, User, Phone, Mail, CheckCheck,
  ChevronDown, ChevronUp, Clock, AlertCircle
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_REPLIES = [
  {
    label: '👋 ধন্যবাদ জানান',
    icon: '👋',
    body: `প্রিয় গ্রাহক,\n\nআমাদের সাথে যোগাযোগ করার জন্য আপনাকে আন্তরিক ধন্যবাদ। আপনার বার্তা আমরা পেয়েছি এবং আমাদের টিম দ্রুততম সময়ে আপনাকে সহায়তা করবে।\n\nযেকোনো প্রয়োজনে আমরা সবসময় আছি।\n\nশুভেচ্ছান্তে,\nUpnexIT টিম`,
  },
  {
    label: '📋 তথ্য চাওয়া',
    icon: '📋',
    body: `প্রিয় গ্রাহক,\n\nআপনার অনুরোধ সম্পর্কে আমাদের আরও কিছু তথ্য প্রয়োজন যাতে আমরা আপনাকে সর্বোত্তম সেবা দিতে পারি।\n\nঅনুগ্রহ করে নিম্নলিখিত বিষয়গুলো জানান:\n• আপনার প্রজেক্টের ধরন\n• কাঙ্ক্ষিত ফিচারসমূহ\n• সময়সীমা\n\nধন্যবাদ,\nUpnexIT টিম`,
  },
  {
    label: '💰 মূল্য জানান',
    icon: '💰',
    body: `প্রিয় গ্রাহক,\n\nআপনার প্রজেক্ট সম্পর্কে বিস্তারিত জানার পর আমরা একটি কাস্টমাইজড মূল্য প্রস্তাব তৈরি করেছি।\n\nআমাদের ওয়েবসাইটে সার্ভিস পেজ থেকে বিস্তারিত প্যাকেজ দেখতে পারেন অথবা সরাসরি আমাদের সাথে কথা বলুন।\n\nশুভেচ্ছান্তে,\nUpnexIT টিম`,
  },
  {
    label: '🚀 ডেমো পাঠান',
    icon: '🚀',
    body: `প্রিয় গ্রাহক,\n\nআপনার অনুরোধ অনুযায়ী আমরা একটি ডেমো প্রস্তুত করেছি। নিচের লিংকে ক্লিক করে আপনি সরাসরি ডেমোটি দেখতে পারবেন।\n\nকোনো পরিবর্তন বা মতামত থাকলে জানাবেন, আমরা সাথে সাথে আপডেট করব।\n\nধন্যবাদ,\nUpnexIT টিম`,
  },
];

const Messages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyTo, setReplyTo] = useState<{ id: string; email: string; name: string } | null>(null);
  const [replyForm, setReplyForm] = useState({ subject: '', body: '', demoLink: '' });
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .not('message', 'like', '%[ORDER]%')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('messages').update({ is_read: true }).eq('id', id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      const unreadIds = messages.filter(m => !m.is_read).map(m => m.id);
      if (unreadIds.length === 0) return;
      await supabase.from('messages').update({ is_read: true }).in('id', unreadIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({ title: '✅', description: 'সকল মেসেজ পঠিত হিসেবে চিহ্নিত' });
    },
  });

  const deleteMsg = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('messages').delete().eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({ title: '✅', description: 'মেসেজ মুছে ফেলা হয়েছে' });
    },
  });

  const bulkDelete = useMutation({
    mutationFn: async () => {
      const ids = Array.from(selectedIds);
      if (ids.length === 0) return;
      await supabase.from('messages').delete().in('id', ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setSelectedIds(new Set());
      toast({ title: '✅', description: `${selectedIds.size} টি মেসেজ মুছে ফেলা হয়েছে` });
    },
  });

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReply = async () => {
    if (!replyTo || !replyForm.body.trim()) return;
    if (!isValidEmail(replyTo.email)) {
      toast({ title: '❌', description: 'এই মেসেজে কোনো বৈধ ইমেইল নেই', variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-reply', {
        body: {
          to: replyTo.email,
          subject: replyForm.subject || `UpnexIT — ${replyTo.name}`,
          body: replyForm.body,
          demoLink: replyForm.demoLink || undefined,
        },
      });
      if (error) throw error;
      toast({ title: '✅', description: `${replyTo.email} তে ইমেইল পাঠানো হয়েছে` });
      setReplyTo(null);
      setReplyForm({ subject: '', body: '', demoLink: '' });
    } catch {
      toast({ title: '❌', description: 'ইমেইল পাঠাতে ব্যর্থ হয়েছে', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const filtered = messages.filter((msg) => {
    if (filter === 'unread' && msg.is_read) return false;
    if (filter === 'read' && !msg.is_read) return false;
    if (search) {
      const q = search.toLowerCase();
      return msg.name.toLowerCase().includes(q) || msg.email.toLowerCase().includes(q) || msg.message.toLowerCase().includes(q);
    }
    return true;
  });

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const readCount = messages.length - unreadCount;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
              <MessageSquare className="h-5.5 w-5.5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">মেসেজ ইনবক্স</h1>
              <p className="text-xs text-muted-foreground mt-0.5">সকল মেসেজ এখানে ম্যানেজ করুন</p>
            </div>
          </div>

          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()} className="gap-2 text-xs">
              <CheckCheck className="h-3.5 w-3.5" /> সকল পঠিত করুন
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="relative overflow-hidden rounded-xl border border-primary/15 bg-gradient-to-br from-primary/8 to-primary/3 p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-primary/60 mb-1">মোট মেসেজ</p>
                <p className="text-2xl font-black text-primary">{messages.length}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-4.5 w-4.5 text-primary" />
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-amber-500/15 bg-gradient-to-br from-amber-500/8 to-amber-500/3 p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-amber-600/60 mb-1">অপঠিত</p>
                <p className="text-2xl font-black text-amber-600">{unreadCount}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-4.5 w-4.5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted/80 to-muted/30 p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60 mb-1">পঠিত</p>
                <p className="text-2xl font-black text-muted-foreground">{readCount}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                <Eye className="h-4.5 w-4.5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="নাম, ইমেইল বা বার্তা দিয়ে খুঁজুন..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10 bg-background border-border rounded-xl" />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 bg-muted/50 p-1 rounded-xl border border-border">
          {([
            { key: 'all' as const, label: 'সকল', icon: Filter, count: messages.length },
            { key: 'unread' as const, label: 'অপঠিত', icon: AlertCircle, count: unreadCount },
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

      {/* Message List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background rounded-2xl border border-border p-5 animate-pulse">
              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-xl bg-muted" />
                <div className="flex-1 space-y-2.5">
                  <div className="h-4 bg-muted rounded-lg w-1/3" />
                  <div className="h-3 bg-muted rounded-lg w-1/2" />
                  <div className="h-12 bg-muted rounded-lg w-full" />
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
            {search ? 'কোনো ফলাফল পাওয়া যায়নি' : 'কোনো মেসেজ নেই'}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {search ? 'অন্য কিছু দিয়ে খুঁজুন' : 'নতুন মেসেজ আসলে এখানে দেখাবে'}
          </p>
          {search && <Button variant="ghost" size="sm" className="mt-3" onClick={() => setSearch('')}>সার্চ মুছুন</Button>}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((msg, i) => {
            const isExpanded = expandedId === msg.id;
            const isSelected = selectedIds.has(msg.id);
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025 }}
                className={`group bg-background rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                  isSelected
                    ? 'border-primary/30 ring-2 ring-primary/10 shadow-md'
                    : msg.is_read
                    ? 'border-border hover:border-border/80'
                    : 'border-primary/20 shadow-sm shadow-primary/5'
                }`}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    {/* Checkbox + Avatar */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => toggleSelect(msg.id)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                          isSelected
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-border hover:border-primary/40'
                        }`}
                      >
                        {isSelected && <CheckCheck className="h-3 w-3" />}
                      </button>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                        msg.is_read
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-gradient-to-br from-primary/20 to-primary/10 text-primary'
                      }`}>
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />}
                        <span className="font-bold text-foreground text-sm">{msg.name}</span>
                        {!msg.is_read && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-bold">নতুন</span>
                        )}
                        <span className="text-[10px] text-muted-foreground/60 hidden sm:inline-flex items-center gap-1 ml-auto">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(msg.created_at!), 'dd MMM yyyy, hh:mm a', { locale: bn })}
                        </span>
                      </div>

                      {/* Contact Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {msg.email}
                        </span>
                        {msg.phone && (
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {msg.phone}
                          </span>
                        )}
                      </div>

                      {/* Mobile date */}
                      <p className="text-[10px] text-muted-foreground/50 sm:hidden flex items-center gap-1 mb-2">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(msg.created_at!), { addSuffix: true, locale: bn })}
                      </p>

                      {/* Message Preview */}
                      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2 mb-1">{msg.message}</p>

                      {msg.message.length > 100 && (
                        <>
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : msg.id)}
                            className="text-[11px] text-primary/60 hover:text-primary font-semibold transition-colors flex items-center gap-1 mt-1"
                          >
                            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            {isExpanded ? 'বন্ধ করুন' : 'সম্পূর্ণ পড়ুন'}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap mt-2 p-4 rounded-xl bg-muted/30 border border-border/50">
                                  {msg.message}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost" size="icon"
                        onClick={() => {
                          setReplyTo({ id: msg.id, email: msg.email, name: msg.name });
                          if (!msg.is_read) markRead.mutate(msg.id);
                        }}
                        title="রিপ্লাই পাঠান" className="h-8 w-8 text-primary hover:bg-primary/10 rounded-lg"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                      {!msg.is_read && (
                        <Button variant="ghost" size="icon" onClick={() => markRead.mutate(msg.id)} title="পঠিত করুন" className="h-8 w-8 hover:bg-muted rounded-lg">
                          <MailOpen className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteMsg.mutate(msg.id)} className="h-8 w-8 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-lg">
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

export default Messages;

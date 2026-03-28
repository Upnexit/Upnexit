import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Trash2, MailOpen, Send, X, Search, Filter, Eye, EyeOff, Inbox, Zap, MessageSquare, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_REPLIES = [
  {
    label: '👋 ধন্যবাদ জানান',
    body: `প্রিয় গ্রাহক,\n\nআমাদের সাথে যোগাযোগ করার জন্য আপনাকে আন্তরিক ধন্যবাদ। আপনার বার্তা আমরা পেয়েছি এবং আমাদের টিম দ্রুততম সময়ে আপনাকে সহায়তা করবে।\n\nযেকোনো প্রয়োজনে আমরা সবসময় আছি।\n\nশুভেচ্ছান্তে,\nUpnexIT টিম`,
  },
  {
    label: '📋 তথ্য চাওয়া',
    body: `প্রিয় গ্রাহক,\n\nআপনার অনুরোধ সম্পর্কে আমাদের আরও কিছু তথ্য প্রয়োজন যাতে আমরা আপনাকে সর্বোত্তম সেবা দিতে পারি।\n\nঅনুগ্রহ করে নিম্নলিখিত বিষয়গুলো জানান:\n• আপনার প্রজেক্টের ধরন\n• কাঙ্ক্ষিত ফিচারসমূহ\n• সময়সীমা\n\nধন্যবাদ,\nUpnexIT টিম`,
  },
  {
    label: '💰 মূল্য জানান',
    body: `প্রিয় গ্রাহক,\n\nআপনার প্রজেক্ট সম্পর্কে বিস্তারিত জানার পর আমরা একটি কাস্টমাইজড মূল্য প্রস্তাব তৈরি করেছি।\n\nআমাদের ওয়েবসাইটে সার্ভিস পেজ থেকে বিস্তারিত প্যাকেজ দেখতে পারেন অথবা সরাসরি আমাদের সাথে কথা বলুন।\n\nশুভেচ্ছান্তে,\nUpnexIT টিম`,
  },
  {
    label: '🚀 ডেমো পাঠান',
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

  const deleteMsg = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('messages').delete().eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({ title: '✅', description: 'মেসেজ মুছে ফেলা হয়েছে' });
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

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">মেসেজ ইনবক্স</h1>
            <p className="text-xs text-muted-foreground">
              মোট {messages.length} টি মেসেজ
              {unreadCount > 0 && <span className="ml-1.5 text-primary font-semibold">• {unreadCount} টি নতুন</span>}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-2 rounded-xl bg-primary/5 border border-primary/10">
            <span className="text-lg font-bold text-primary">{messages.length}</span>
            <p className="text-[10px] text-muted-foreground">মোট</p>
          </div>
          <div className="px-3 py-2 rounded-xl bg-orange-500/5 border border-orange-500/10">
            <span className="text-lg font-bold text-orange-500">{unreadCount}</span>
            <p className="text-[10px] text-muted-foreground">অপঠিত</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="নাম, ইমেইল বা বার্তা খুঁজুন..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-background border-border" />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)} className="text-xs gap-1.5">
              {f === 'all' && <Filter className="h-3 w-3" />}
              {f === 'unread' && <EyeOff className="h-3 w-3" />}
              {f === 'read' && <Eye className="h-3 w-3" />}
              {f === 'all' ? 'সকল' : f === 'unread' ? 'অপঠিত' : 'পঠিত'}
            </Button>
          ))}
        </div>
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {replyTo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-background rounded-2xl border border-border shadow-xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">📧 রিপ্লাই: {replyTo.name}</h2>
                <Button variant="ghost" size="icon" onClick={() => setReplyTo(null)}><X className="h-4 w-4" /></Button>
              </div>
              <p className="text-sm text-muted-foreground">প্রাপক: {replyTo.email}</p>

              {/* Quick Reply Templates */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Zap className="h-3 w-3" /> দ্রুত রিপ্লাই টেমপ্লেট
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr.label}
                      onClick={() => setReplyForm({ ...replyForm, body: qr.body })}
                      className="px-3 py-1.5 text-xs rounded-lg border border-border bg-muted/50 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all font-medium"
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              </div>

              <Input placeholder="বিষয় (ঐচ্ছিক)" value={replyForm.subject} onChange={(e) => setReplyForm({ ...replyForm, subject: e.target.value })} className="bg-muted/50" />
              <Textarea placeholder="আপনার বার্তা লিখুন..." rows={5} value={replyForm.body} onChange={(e) => setReplyForm({ ...replyForm, body: e.target.value })} className="bg-muted/50 resize-none" />
              <Input placeholder="ডেমো লিংক (ঐচ্ছিক) — যেমন: https://demo.upnexit.com/hospital" value={replyForm.demoLink} onChange={(e) => setReplyForm({ ...replyForm, demoLink: e.target.value })} className="bg-muted/50" />

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setReplyTo(null)}>বাতিল</Button>
                <Button onClick={handleReply} disabled={sending || !replyForm.body.trim()} className="gap-2">
                  <Send className="h-4 w-4" />
                  {sending ? 'পাঠানো হচ্ছে...' : 'ইমেইল পাঠান'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background rounded-2xl border border-border p-5 animate-pulse">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Inbox className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <p className="text-muted-foreground font-medium">
            {search ? 'কোনো ফলাফল পাওয়া যায়নি' : 'কোনো মেসেজ নেই'}
          </p>
          {search && <Button variant="ghost" size="sm" className="mt-2" onClick={() => setSearch('')}>সার্চ মুছুন</Button>}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg, i) => {
            const isExpanded = expandedId === msg.id;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`bg-background rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-md ${
                  msg.is_read ? 'border-border' : 'border-primary/20 ring-1 ring-primary/5'
                }`}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${
                      msg.is_read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />}
                        <span className="font-semibold text-foreground text-sm">{msg.name}</span>
                        <span className="text-[10px] text-muted-foreground hidden sm:inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(new Date(msg.created_at!), { addSuffix: true, locale: bn })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 truncate">
                        {msg.email} {msg.phone && `• ${msg.phone}`}
                      </p>

                      <p className="text-xs text-muted-foreground sm:hidden flex items-center gap-1 mb-2">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(msg.created_at!), { addSuffix: true, locale: bn })}
                      </p>

                      <p className="text-sm text-foreground leading-relaxed line-clamp-2">{msg.message}</p>

                      {msg.message.length > 120 && (
                        <>
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : msg.id)}
                            className="text-[11px] text-primary/70 hover:text-primary font-medium transition-colors mt-1"
                          >
                            {isExpanded ? '▲ বন্ধ করুন' : '▼ সম্পূর্ণ দেখুন'}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap mt-2 p-3 rounded-xl bg-muted/40 border border-border/50">
                                  {msg.message}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 shrink-0">
                      <Button
                        variant="ghost" size="icon"
                        onClick={() => {
                          setReplyTo({ id: msg.id, email: msg.email, name: msg.name });
                          if (!msg.is_read) markRead.mutate(msg.id);
                        }}
                        title="রিপ্লাই পাঠান" className="text-primary"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      {!msg.is_read && (
                        <Button variant="ghost" size="icon" onClick={() => markRead.mutate(msg.id)} title="পঠিত করুন">
                          <MailOpen className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteMsg.mutate(msg.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
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

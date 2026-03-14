import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2, MailOpen, Send, X, ShoppingCart, Package, Building2, Calendar, Search, Filter, Eye, EyeOff, Inbox } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const OrdersManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyTo, setReplyTo] = useState<{ id: string; email: string; name: string } | null>(null);
  const [replyForm, setReplyForm] = useState({ subject: '', body: '' });
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const deleteOrder = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('messages').delete().eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: '✅', description: 'অর্ডার মুছে ফেলা হয়েছে' });
    },
  });

  const handleReply = async () => {
    if (!replyTo || !replyForm.body.trim()) return;
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-reply', {
        body: { to: replyTo.email, subject: replyForm.subject || 'UpnexIT — অর্ডার আপডেট', body: replyForm.body },
      });
      if (error) throw error;
      toast({ title: '✅', description: `${replyTo.email} তে ইমেইল পাঠানো হয়েছে` });
      setReplyTo(null);
      setReplyForm({ subject: '', body: '' });
    } catch {
      toast({ title: '❌', description: 'ইমেইল পাঠাতে ব্যর্থ', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const parseOrder = (msg: string) => {
    const lines = msg.split('\n');
    const details: Record<string, string> = {};
    lines.forEach((line) => {
      if (line.includes('সার্ভিস:') || line.includes('Service:')) details.service = line.split(':').slice(1).join(':').trim();
      if (line.includes('প্ল্যান:') || line.includes('Plan:')) details.plan = line.split(':').slice(1).join(':').trim();
      if (line.includes('প্রতিষ্ঠান:') || line.includes('Organization:')) details.org = line.split(':').slice(1).join(':').trim();
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

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShoppingCart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">অর্ডার সমূহ</h1>
            <p className="text-xs text-muted-foreground">
              মোট {orders.length} টি অর্ডার
              {unreadCount > 0 && <span className="ml-1.5 text-primary font-semibold">• {unreadCount} টি নতুন</span>}
            </p>
          </div>
        </div>

        {/* Stats badges */}
        <div className="flex gap-2">
          <div className="px-3 py-2 rounded-xl bg-primary/5 border border-primary/10">
            <span className="text-lg font-bold text-primary">{orders.length}</span>
            <p className="text-[10px] text-muted-foreground">মোট</p>
          </div>
          <div className="px-3 py-2 rounded-xl bg-orange-500/5 border border-orange-500/10">
            <span className="text-lg font-bold text-orange-500">{unreadCount}</span>
            <p className="text-[10px] text-muted-foreground">অপঠিত</p>
          </div>
          <div className="px-3 py-2 rounded-xl bg-muted border border-border">
            <span className="text-lg font-bold text-muted-foreground">{orders.length - unreadCount}</span>
            <p className="text-[10px] text-muted-foreground">পঠিত</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="নাম, ইমেইল বা বিষয়বস্তু খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background border-border"
          />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className="text-xs gap-1.5"
            >
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-2xl border border-border shadow-xl w-full max-w-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">📧 রিপ্লাই: {replyTo.name}</h2>
                <Button variant="ghost" size="icon" onClick={() => setReplyTo(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">প্রাপক: {replyTo.email}</p>
              <Input
                placeholder="বিষয়"
                value={replyForm.subject}
                onChange={(e) => setReplyForm({ ...replyForm, subject: e.target.value })}
                className="bg-muted/50"
              />
              <Textarea
                placeholder="আপনার বার্তা লিখুন..."
                rows={4}
                value={replyForm.body}
                onChange={(e) => setReplyForm({ ...replyForm, body: e.target.value })}
                className="bg-muted/50 resize-none"
              />
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
            {search ? 'কোনো ফলাফল পাওয়া যায়নি' : 'কোনো অর্ডার নেই'}
          </p>
          {search && (
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => setSearch('')}>
              সার্চ মুছুন
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order, i) => {
            const details = parseOrder(order.message);
            const isExpanded = expandedId === order.id;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`bg-background rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-md ${
                  order.is_read ? 'border-border' : 'border-primary/20 ring-1 ring-primary/5'
                }`}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${
                        order.is_read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {order.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!order.is_read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />}
                        <span className="font-semibold text-foreground text-sm">{order.name}</span>
                        <span className="text-[10px] text-muted-foreground hidden sm:inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(new Date(order.created_at!), { addSuffix: true, locale: bn })}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mb-3 truncate">
                        {order.email} {order.phone && `• ${order.phone}`}
                      </p>

                      {/* Order detail badges */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {details.service && (
                          <Badge variant="default" className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                            <Package className="h-3 w-3" /> {details.service}
                          </Badge>
                        )}
                        {details.plan && (
                          <Badge variant="secondary" className="gap-1">
                            {details.plan}
                          </Badge>
                        )}
                        {details.org && (
                          <Badge variant="outline" className="gap-1">
                            <Building2 className="h-3 w-3" /> {details.org}
                          </Badge>
                        )}
                      </div>

                      {/* Mobile time */}
                      <p className="text-[10px] text-muted-foreground sm:hidden flex items-center gap-1 mb-2">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(order.created_at!), { addSuffix: true, locale: bn })}
                      </p>

                      {/* Expandable message */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : order.id)}
                        className="text-[11px] text-primary/70 hover:text-primary font-medium transition-colors"
                      >
                        {isExpanded ? '▲ বন্ধ করুন' : '▼ সম্পূর্ণ মেসেজ দেখুন'}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap mt-2 p-3 rounded-xl bg-muted/40 border border-border/50">
                              {order.message}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setReplyTo({ id: order.id, email: order.email, name: order.name });
                          if (!order.is_read) markRead.mutate(order.id);
                        }}
                        title="রিপ্লাই"
                        className="h-8 w-8 text-primary hover:bg-primary/10"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                      {!order.is_read && (
                        <Button variant="ghost" size="icon" onClick={() => markRead.mutate(order.id)} title="পঠিত" className="h-8 w-8 hover:bg-muted">
                          <MailOpen className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteOrder.mutate(order.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
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

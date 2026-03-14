import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2, MailOpen, Send, X, ShoppingCart, Package, Building2, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';
import { motion } from 'framer-motion';

const OrdersManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyTo, setReplyTo] = useState<{ id: string; email: string; name: string } | null>(null);
  const [replyForm, setReplyForm] = useState({ subject: '', body: '' });
  const [sending, setSending] = useState(false);

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
        body: {
          to: replyTo.email,
          subject: replyForm.subject || `UpnexIT — অর্ডার আপডেট`,
          body: replyForm.body,
        },
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

  // Parse order details from message
  const parseOrder = (msg: string) => {
    const lines = msg.split('\n');
    const details: Record<string, string> = {};
    lines.forEach(line => {
      if (line.includes('সার্ভিস:') || line.includes('Service:')) details.service = line.split(':').slice(1).join(':').trim();
      if (line.includes('প্ল্যান:') || line.includes('Plan:')) details.plan = line.split(':').slice(1).join(':').trim();
      if (line.includes('প্রতিষ্ঠান:') || line.includes('Organization:')) details.org = line.split(':').slice(1).join(':').trim();
    });
    return details;
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ShoppingCart className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">অর্ডার সমূহ</h1>
          <p className="text-xs text-muted-foreground">{orders.length} টি অর্ডার</p>
        </div>
      </div>

      {/* Reply Modal */}
      {replyTo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl border border-border shadow-xl w-full max-w-lg p-6 space-y-4">
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
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">লোড হচ্ছে...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">কোনো অর্ডার নেই</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, i) => {
            const details = parseOrder(order.message);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`bg-background rounded-2xl border p-4 md:p-5 shadow-sm transition-all ${
                  order.is_read ? 'border-border' : 'border-primary/30 bg-primary/[0.02]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {!order.is_read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                      <span className="font-bold text-foreground">{order.name}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(order.created_at!), { addSuffix: true, locale: bn })}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3">{order.email} {order.phone && `• ${order.phone}`}</p>
                    
                    {/* Order details cards */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {details.service && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                          <Package className="h-3 w-3" /> {details.service}
                        </span>
                      )}
                      {details.plan && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/20 text-secondary-foreground text-xs font-medium">
                          {details.plan}
                        </span>
                      )}
                      {details.org && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium">
                          <Building2 className="h-3 w-3" /> {details.org}
                        </span>
                      )}
                    </div>

                    <details className="group">
                      <summary className="text-[11px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                        সম্পূর্ণ মেসেজ দেখুন
                      </summary>
                      <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap mt-2 p-3 rounded-xl bg-muted/40">
                        {order.message}
                      </p>
                    </details>
                  </div>

                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setReplyTo({ id: order.id, email: order.email, name: order.name });
                        if (!order.is_read) markRead.mutate(order.id);
                      }}
                      title="রিপ্লাই পাঠান"
                      className="text-primary"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    {!order.is_read && (
                      <Button variant="ghost" size="icon" onClick={() => markRead.mutate(order.id)} title="পঠিত করুন">
                        <MailOpen className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => deleteOrder.mutate(order.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Trash2, MailOpen, Send, Link2, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';

const Messages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyTo, setReplyTo] = useState<{ id: string; email: string; name: string } | null>(null);
  const [replyForm, setReplyForm] = useState({ subject: '', body: '', demoLink: '' });
  const [sending, setSending] = useState(false);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
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

  const handleReply = async () => {
    if (!replyTo || !replyForm.body.trim()) return;
    setSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-reply', {
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
    } catch (err: any) {
      toast({ title: '❌', description: 'ইমেইল পাঠাতে ব্যর্থ হয়েছে', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-foreground mb-6">মেসেজ ইনবক্স</h1>

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
              placeholder="বিষয় (ঐচ্ছিক)"
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
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                placeholder="ডেমো লিংক (ঐচ্ছিক) — যেমন: https://demo.upnexit.com/hospital"
                value={replyForm.demoLink}
                onChange={(e) => setReplyForm({ ...replyForm, demoLink: e.target.value })}
                className="bg-muted/50"
              />
            </div>

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
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">কোনো মেসেজ নেই</div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-background rounded-2xl border p-4 md:p-5 shadow-sm transition-all ${
                msg.is_read ? 'border-border' : 'border-primary/30 bg-primary/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    <span className="font-semibold text-foreground">{msg.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(msg.created_at!), { addSuffix: true, locale: bn })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{msg.email} {msg.phone && `• ${msg.phone}`}</p>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setReplyTo({ id: msg.id, email: msg.email, name: msg.name });
                      if (!msg.is_read) markRead.mutate(msg.id);
                    }}
                    title="রিপ্লাই / ডেমো লিংক পাঠান"
                    className="text-primary"
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;

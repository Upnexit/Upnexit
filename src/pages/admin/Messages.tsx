import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';

const Messages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-foreground mb-6">মেসেজ ইনবক্স</h1>
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
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: bn })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{msg.email} {msg.phone && `• ${msg.phone}`}</p>
                  <p className="text-sm text-foreground leading-relaxed">{msg.message}</p>
                </div>
                <div className="flex gap-1 shrink-0">
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

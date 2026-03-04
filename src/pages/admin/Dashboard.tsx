import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, MessageSquare, Wrench, Settings } from 'lucide-react';

const Dashboard = () => {
  const { data: teamCount } = useQuery({
    queryKey: ['team-count'],
    queryFn: async () => {
      const { count } = await supabase.from('team_members').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: msgCount } = useQuery({
    queryKey: ['msg-count'],
    queryFn: async () => {
      const { count } = await supabase.from('messages').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: unreadCount } = useQuery({
    queryKey: ['unread-count'],
    queryFn: async () => {
      const { count } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false);
      return count ?? 0;
    },
  });

  const { data: serviceCount } = useQuery({
    queryKey: ['service-count'],
    queryFn: async () => {
      const { count } = await supabase.from('services').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const cards = [
    { label: 'টিম সদস্য', value: teamCount ?? 0, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'মোট মেসেজ', value: msgCount ?? 0, icon: MessageSquare, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'অপঠিত মেসেজ', value: unreadCount ?? 0, icon: MessageSquare, color: 'bg-destructive/10 text-destructive' },
    { label: 'সার্ভিস', value: serviceCount ?? 0, icon: Wrench, color: 'bg-secondary/10 text-secondary' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">ড্যাশবোর্ড</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-background rounded-2xl border border-border p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

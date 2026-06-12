import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Save, MessageCircle, Pencil, X } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const ChatbotManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [editKeywords, setEditKeywords] = useState('');

  const { data: qaList = [], isLoading } = useQuery({
    queryKey: ['admin-chatbot-qa'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chatbot_qa')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!newQuestion.trim() || !newAnswer.trim()) throw new Error('প্রশ্ন এবং উত্তর দিন');
      const keywords = newKeywords.split(',').map(k => k.trim()).filter(Boolean);
      const { error } = await supabase.from('chatbot_qa').insert({
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
        keywords,
        sort_order: qaList.length,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chatbot-qa'] });
      setNewQuestion('');
      setNewAnswer('');
      setNewKeywords('');
      toast({ title: '✅', description: 'প্রশ্ন-উত্তর যোগ হয়েছে!' });
    },
    onError: (err: any) => toast({ title: 'ত্রুটি', description: err.message, variant: 'destructive' }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const keywords = editKeywords.split(',').map(k => k.trim()).filter(Boolean);
      const { error } = await supabase.from('chatbot_qa').update({
        question: editQuestion.trim(),
        answer: editAnswer.trim(),
        keywords,
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chatbot-qa'] });
      setEditingId(null);
      toast({ title: '✅', description: 'আপডেট হয়েছে!' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('chatbot_qa').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chatbot-qa'] });
      toast({ title: '🗑️', description: 'মুছে ফেলা হয়েছে' });
    },
  });

  const startEdit = (qa: any) => {
    setEditingId(qa.id);
    setEditQuestion(qa.question);
    setEditAnswer(qa.answer);
    setEditKeywords((qa.keywords || []).join(', '));
  };

  if (isLoading) return <div className="text-center py-12 text-muted-foreground">লোড হচ্ছে...</div>;

  return (
    <div>
      <AdminPageHeader
        title="চ্যাটবট ম্যানেজমেন্ট"
        subtitle="সাইটে চলমান AI চ্যাটবটের প্রশ্ন ও উত্তর পরিচালনা করুন"
      />

      {/* Add new Q&A */}
      <div className="bg-background rounded-2xl border border-border p-4 md:p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          নতুন প্রশ্ন-উত্তর যোগ করুন
        </h2>
        <div className="space-y-3">
          <Input
            placeholder="প্রশ্ন লিখুন (যেমন: আপনাদের সার্ভিস কি কি?)"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="h-11 rounded-xl"
          />
          <Textarea
            placeholder="উত্তর লিখুন"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="rounded-xl min-h-[80px]"
          />
          <Input
            placeholder="কীওয়ার্ড (কমা দিয়ে আলাদা করুন, যেমন: সার্ভিস, সেবা, service)"
            value={newKeywords}
            onChange={(e) => setNewKeywords(e.target.value)}
            className="h-11 rounded-xl"
          />
          <Button variant="hero" className="gap-2" onClick={() => addMutation.mutate()} disabled={addMutation.isPending}>
            <Plus className="h-4 w-4" /> যোগ করুন
          </Button>
        </div>
      </div>

      {/* Q&A List */}
      <div className="space-y-3">
        {qaList.map((qa) => (
          <div key={qa.id} className="bg-background rounded-2xl border border-border p-4 shadow-sm">
            {editingId === qa.id ? (
              <div className="space-y-3">
                <Input
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                  className="h-10 rounded-xl"
                />
                <Textarea
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                  className="rounded-xl min-h-[60px]"
                />
                <Input
                  value={editKeywords}
                  onChange={(e) => setEditKeywords(e.target.value)}
                  placeholder="কীওয়ার্ড"
                  className="h-10 rounded-xl"
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="hero" className="gap-1" onClick={() => updateMutation.mutate({ id: qa.id })}>
                    <Save className="h-3.5 w-3.5" /> সেভ
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => setEditingId(null)}>
                    <X className="h-3.5 w-3.5" /> বাতিল
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm mb-1">প্রশ্ন: {qa.question}</p>
                  <p className="text-muted-foreground text-sm">উত্তর: {qa.answer}</p>
                  {qa.keywords && qa.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {qa.keywords.map((kw: string, i: number) => (
                        <span key={i} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-start gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => startEdit(qa)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteMutation.mutate(qa.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        {qaList.length === 0 && (
          <p className="text-center text-muted-foreground py-8">কোনো প্রশ্ন-উত্তর নেই। উপরে থেকে যোগ করুন।</p>
        )}
      </div>
    </div>
  );
};

export default ChatbotManagement;

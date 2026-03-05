import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotWidget = () => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: qaList = [] } = useQuery({
    queryKey: ['chatbot-qa'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chatbot_qa')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        text: lang === 'bn'
          ? 'আসসালামু আলাইকুম! 👋 আমি Upnex It এর সহকারী। আপনাকে কিভাবে সাহায্য করতে পারি?'
          : 'Hello! 👋 I\'m the Upnex It assistant. How can I help you?',
        sender: 'bot',
      }]);
    }
  }, [open, lang]);

  const findAnswer = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();

    // Try exact/keyword match
    for (const qa of qaList) {
      const questionLower = qa.question.toLowerCase();
      if (input.includes(questionLower) || questionLower.includes(input)) {
        return qa.answer;
      }

      // Check keywords
      if (qa.keywords && qa.keywords.length > 0) {
        const matched = qa.keywords.some((kw: string) =>
          input.includes(kw.toLowerCase())
        );
        if (matched) return qa.answer;
      }
    }

    // Fuzzy: check if any word from input matches keywords or question words
    const inputWords = input.split(/\s+/).filter(w => w.length > 2);
    for (const qa of qaList) {
      const qaWords = [
        ...qa.question.toLowerCase().split(/\s+/),
        ...(qa.keywords || []).map((k: string) => k.toLowerCase()),
      ];
      const match = inputWords.some(w => qaWords.some(qw => qw.includes(w) || w.includes(qw)));
      if (match) return qa.answer;
    }

    return lang === 'bn'
      ? 'দুঃখিত, আমি এই প্রশ্নের উত্তর দিতে পারছি না। অনুগ্রহ করে আমাদের সাথে সরাসরি যোগাযোগ করুন।'
      : 'Sorry, I couldn\'t find an answer. Please contact us directly for more help.';
  };

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input.trim(),
      sender: 'user',
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(userMsg.text);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        text: answer,
        sender: 'bot',
      }]);
    }, 1200);
  };

  // Show suggested questions
  const suggestedQuestions = qaList.slice(0, 3);

  const handleSuggestionClick = (question: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: question,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(question);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        text: answer,
        sender: 'bot',
      }]);
    }, 1200);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-[60] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 lg:bottom-24 right-4 lg:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[380px] h-[450px] bg-background border border-border rounded-2xl shadow-elevated flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Upnex It</p>
                <p className="text-[11px] opacity-80">{lang === 'bn' ? 'সাধারণত তাৎক্ষণিক উত্তর' : 'Usually replies instantly'}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Suggestions after welcome */}
              {messages.length === 1 && suggestedQuestions.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[11px] text-muted-foreground px-1">
                    {lang === 'bn' ? 'জনপ্রিয় প্রশ্ন:' : 'Popular questions:'}
                  </p>
                  {suggestedQuestions.map((qa) => (
                    <button
                      key={qa.id}
                      onClick={() => handleSuggestionClick(qa.question)}
                      className="block w-full text-left text-xs bg-primary/5 hover:bg-primary/10 text-primary border border-primary/15 rounded-xl px-3 py-2 transition-colors"
                    >
                      {qa.question}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={lang === 'bn' ? 'আপনার প্রশ্ন লিখুন...' : 'Type your question...'}
                  className="flex-1 h-10 px-3.5 rounded-xl bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 disabled:opacity-40 transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;

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

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ChatbotWidget = () => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showHelpText, setShowHelpText] = useState(false);
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

  const { data: settings = [] } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      return data;
    },
  });

  const whatsappNumber = settings.find(s => s.key === 'whatsapp_number')?.value || '';

  // Help Center text animation
  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setShowHelpText(true);
      setTimeout(() => setShowHelpText(false), 1500);
    }, 2000);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    for (const qa of qaList) {
      const questionLower = qa.question.toLowerCase();
      if (input.includes(questionLower) || questionLower.includes(input)) return qa.answer;
      if (qa.keywords && qa.keywords.length > 0) {
        const matched = qa.keywords.some((kw: string) => input.includes(kw.toLowerCase()));
        if (matched) return qa.answer;
      }
    }
    const inputWords = input.split(/\s+/).filter(w => w.length > 2);
    for (const qa of qaList) {
      const qaWords = [...qa.question.toLowerCase().split(/\s+/), ...(qa.keywords || []).map((k: string) => k.toLowerCase())];
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
    const userMsg: ChatMessage = { id: `user-${Date.now()}`, text: input.trim(), sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const answer = findAnswer(userMsg.text);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: `bot-${Date.now()}`, text: answer, sender: 'bot' }]);
    }, 1200);
  };

  const suggestedQuestions = qaList.slice(0, 3);

  const handleSuggestionClick = (question: string) => {
    const userMsg: ChatMessage = { id: `user-${Date.now()}`, text: question, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(() => {
      const answer = findAnswer(question);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: `bot-${Date.now()}`, text: answer, sender: 'bot' }]);
    }, 1200);
  };

  const handleWhatsApp = () => {
    if (!whatsappNumber) return;
    const cleaned = whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleaned}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      {whatsappNumber && (
        <motion.button
          onClick={handleWhatsApp}
          className="fixed bottom-[7.5rem] lg:bottom-[5.5rem] right-4 lg:right-6 z-[60] w-13 h-13 rounded-full bg-[#25D366] text-white shadow-elevated flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          aria-label="WhatsApp"
        >
          <WhatsAppIcon />
        </motion.button>
      )}

      {/* Chatbot Toggle Button with Help Center text */}
      <div className="fixed bottom-28 lg:bottom-6 right-4 lg:right-6 z-[60] flex items-center gap-2">
        <AnimatePresence>
          {showHelpText && !open && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap"
            >
              Help Center
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
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
      </div>

      {/* Chat Window - smaller */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-44 lg:bottom-24 right-4 lg:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[340px] h-[380px] bg-background border border-border rounded-2xl shadow-elevated flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-3 py-2.5 flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-xs">Upnex It</p>
                <p className="text-[10px] opacity-80">{lang === 'bn' ? 'সাধারণত তাৎক্ষণিক উত্তর' : 'Usually replies instantly'}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && suggestedQuestions.length > 0 && (
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground px-1">
                    {lang === 'bn' ? 'জনপ্রিয় প্রশ্ন:' : 'Popular questions:'}
                  </p>
                  {suggestedQuestions.map((qa) => (
                    <button
                      key={qa.id}
                      onClick={() => handleSuggestionClick(qa.question)}
                      className="block w-full text-left text-[11px] bg-primary/5 hover:bg-primary/10 text-primary border border-primary/15 rounded-xl px-2.5 py-1.5 transition-colors"
                    >
                      {qa.question}
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-3 py-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-2.5 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={lang === 'bn' ? 'আপনার প্রশ্ন লিখুন...' : 'Type your question...'}
                  className="flex-1 h-9 px-3 rounded-xl bg-muted border-0 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 disabled:opacity-40 transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
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

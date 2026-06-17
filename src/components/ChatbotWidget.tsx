import { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, X, Send, Mic, MicOff, Image, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  imageUrl?: string;
}

type AiMsgContent = string | Array<{ type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }>;
type AiMsg = { role: 'user' | 'assistant'; content: AiMsgContent };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ChatbotWidget = () => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showHelpText, setShowHelpText] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<AiMsg[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const voiceDraftRef = useRef('');
  const autoSendTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: settings = [] } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      return data;
    },
  });

  const whatsappNumber = settings.find(s => s.key === 'whatsapp_number')?.value || '';

  // Help Center text animation (shown next to support FAB when collapsed)
  useEffect(() => {
    if (open || menuOpen) return;
    const interval = setInterval(() => {
      setShowHelpText(true);
      setTimeout(() => setShowHelpText(false), 1500);
    }, 5000);
    return () => clearInterval(interval);
  }, [open, menuOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        text: lang === 'bn'
          ? 'আসসালামু আলাইকুম! 👋 আমি Upnex IT এর AI সহকারী। আপনাকে কিভাবে সাহায্য করতে পারি?'
          : 'Assalamu Alaikum! 👋 I\'m the Upnex IT AI Assistant. How can I help you?',
        sender: 'bot',
      }]);
    }
  }, [open, lang]);

  // Speech-to-Text - continuous mode
  const startListening = useCallback(async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(lang === 'bn'
        ? 'আপনার ব্রাউজার ভয়েস ইনপুট সাপোর্ট করে না। Chrome বা Edge ব্যবহার করুন।'
        : 'Your browser does not support voice input. Please use Chrome or Edge.');
      return;
    }

    // Trigger the native browser permission prompt directly from the user gesture.
    // No awaits before getUserMedia — preserves the gesture chain so Chrome shows the prompt.
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('no-mediaDevices');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      // Silent fail — no extra instructions. User can click again to retry the prompt.
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    if (autoSendTimeoutRef.current) {
      clearTimeout(autoSendTimeoutRef.current);
      autoSendTimeoutRef.current = null;
    }

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = 0; i < event.results.length; i += 1) {
        const transcript = event.results[i]?.[0]?.transcript ?? '';
        if (event.results[i].isFinal) {
          finalTranscript += `${transcript} `;
        } else {
          interimTranscript += transcript;
        }
      }

      const combinedTranscript = `${finalTranscript}${interimTranscript}`.replace(/\s+/g, ' ').trim();
      voiceDraftRef.current = combinedTranscript;
      setInput(combinedTranscript);

      const hasNewFinalChunk = Array.from(event.results)
        .slice(event.resultIndex)
        .some((result: any) => result.isFinal);

      if (!hasNewFinalChunk || !combinedTranscript) return;

      if (autoSendTimeoutRef.current) {
        clearTimeout(autoSendTimeoutRef.current);
      }

      autoSendTimeoutRef.current = setTimeout(() => {
        const finalText = voiceDraftRef.current.trim();
        if (!finalText || isTyping) return;

        const userMsg: ChatMessage = {
          id: `user-${Date.now()}`,
          text: finalText,
          sender: 'user',
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        voiceDraftRef.current = '';
        autoSendTimeoutRef.current = null;
        streamAiResponse(finalText, null);
      }, 1600);
    };

    recognition.onend = () => {
      if (recognitionRef.current && isListeningRef.current) {
        try { recognition.start(); } catch {}
      }
    };

    recognition.onerror = (e: any) => {
      if (e.error === 'no-speech' || e.error === 'aborted') return;
      setIsListening(false);
      isListeningRef.current = false;
    };

    recognitionRef.current = recognition;
    isListeningRef.current = true;
    try {
      recognition.start();
      setIsListening(true);
    } catch (err) {
      isListeningRef.current = false;
      setIsListening(false);
    }
  }, [lang, isTyping]);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    if (autoSendTimeoutRef.current) {
      clearTimeout(autoSendTimeoutRef.current);
      autoSendTimeoutRef.current = null;
    }
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    voiceDraftRef.current = '';
    setIsListening(false);
  }, []);


  // Image handling
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return; // 5MB max

    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, []);

  const streamAiResponse = useCallback(async (userText: string, imageBase64?: string | null) => {
    let userContent: AiMsgContent;
    if (imageBase64) {
      userContent = [
        { type: 'text', text: userText || 'এই ছবিটি বিশ্লেষণ করুন' },
        { type: 'image_url', image_url: { url: imageBase64 } },
      ];
    } else {
      userContent = userText;
    }

    const newHistory: AiMsg[] = [...conversationHistory, { role: 'user', content: userContent }];
    setConversationHistory(newHistory);
    setIsTyping(true);

    const botMsgId = `bot-${Date.now()}`;
    let assistantText = '';

    try {
      abortRef.current = new AbortController();
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newHistory }),
        signal: abortRef.current.signal,
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || 'AI সার্ভিসে সমস্যা হয়েছে');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      setMessages(prev => [...prev, { id: botMsgId, text: '', sender: 'bot' }]);
      setIsTyping(false);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantText += content;
              const currentText = assistantText;
              setMessages(prev =>
                prev.map(m => m.id === botMsgId ? { ...m, text: currentText } : m)
              );
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantText += content;
              const currentText = assistantText;
              setMessages(prev =>
                prev.map(m => m.id === botMsgId ? { ...m, text: currentText } : m)
              );
            }
          } catch { /* ignore */ }
        }
      }

      setConversationHistory(prev => [...prev, { role: 'assistant', content: assistantText }]);

    } catch (err: any) {
      setIsTyping(false);
      if (err.name === 'AbortError') return;
      const fallback = lang === 'bn'
        ? 'দুঃখিত, সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
        : 'Sorry, something went wrong. Please try again.';
      setMessages(prev => {
        const existing = prev.find(m => m.id === botMsgId);
        if (existing) {
          return prev.map(m => m.id === botMsgId ? { ...m, text: fallback } : m);
        }
        return [...prev, { id: botMsgId, text: fallback, sender: 'bot' }];
      });
    }
  }, [conversationHistory, lang]);

  const handleSend = () => {
    if ((!input.trim() && !pendingImage) || isTyping) return;

    if (autoSendTimeoutRef.current) {
      clearTimeout(autoSendTimeoutRef.current);
      autoSendTimeoutRef.current = null;
    }

    const text = input.trim();
    const img = pendingImage;
    voiceDraftRef.current = '';

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: text || (img ? '📷 ছবি পাঠানো হয়েছে' : ''),
      sender: 'user',
      imageUrl: img || undefined,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setPendingImage(null);
    streamAiResponse(text, img);
  };

  const handleWhatsApp = () => {
    if (!whatsappNumber) return;
    const cleaned = whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleaned}`, '_blank');
    setMenuOpen(false);
  };

  // Close on outside click
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (autoSendTimeoutRef.current) clearTimeout(autoSendTimeoutRef.current);
      recognitionRef.current?.stop();
    };
  }, []);

  return (
    <>
      {/* Customer Support FAB stack */}
      <div className="fixed bottom-[5.5rem] lg:bottom-6 right-4 lg:right-6 z-[60] flex flex-col items-end gap-3">
        {/* Expanded action buttons */}
        <AnimatePresence>
          {menuOpen && !open && (
            <>
              <motion.button
                key="ai"
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                onClick={() => { setOpen(true); setMenuOpen(false); }}
                className="flex items-center gap-2 group"
                aria-label={lang === 'bn' ? 'AI সহকারীর সাথে কথা বলুন' : 'Chat with AI Assistant'}
              >
                <span className="bg-background border border-border text-foreground text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
                  {lang === 'bn' ? 'AI সহকারী' : 'AI Assistant'}
                </span>
                <span className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center group-hover:scale-105 group-active:scale-95 transition-transform">
                  <MessageCircle className="h-5 w-5" />
                </span>
              </motion.button>
              <motion.button
                key="wa"
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                onClick={handleWhatsApp}
                className="flex items-center gap-2 group"
                aria-label="WhatsApp"
              >
                <span className="bg-background border border-border text-foreground text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
                  WhatsApp
                </span>
                <span className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-elevated flex items-center justify-center group-hover:scale-105 group-active:scale-95 transition-transform">
                  <WhatsAppIcon />
                </span>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Main Support Toggle */}
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {showHelpText && !open && !menuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap"
              >
                {lang === 'bn' ? 'হেল্প সেন্টার' : 'Help Center'}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={() => {
              if (open) { setOpen(false); return; }
              setMenuOpen(!menuOpen);
            }}
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            whileTap={{ scale: 0.9 }}
            aria-label={lang === 'bn' ? 'কাস্টমার সাপোর্ট' : 'Customer Support'}
          >
            <AnimatePresence mode="wait">
              {open || menuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div key="support" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Headset className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[70] w-full sm:w-[420px] h-[100dvh] sm:h-[600px] sm:max-h-[85vh] bg-background border border-border sm:rounded-2xl shadow-elevated flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Upnex AI Assistant</p>
                  <p className="text-[11px] opacity-80">{lang === 'bn' ? 'AI দ্বারা চালিত' : 'AI-powered'}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-primary-foreground/15 active:bg-primary-foreground/25 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-[14px] leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    {msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="Uploaded chat image"
                        className="w-full max-w-[160px] h-auto rounded-lg mb-1"
                      />
                    )}
                    {msg.text}
                    {msg.sender === 'bot' && msg.text === '' && (
                      <span className="inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:300ms]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-3 py-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested quick questions */}
            {messages.length <= 1 && !isTyping && (
              <div className="px-3 pb-2 shrink-0">
                <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">
                  {lang === 'bn' ? 'জনপ্রিয় প্রশ্ন' : 'Popular questions'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'bn'
                    ? [
                        'আপনারা কী কী সফটওয়্যার সার্ভিস দেন?',
                        'একটি ওয়েবসাইট বানাতে কত খরচ হবে?',
                        'ডেলিভারি টাইম কত দিন?',
                        'POS / Inventory সফটওয়্যার আছে কি?',
                        'কীভাবে অর্ডার করব?',
                      ]
                    : [
                        'What software services do you offer?',
                        'How much does a website cost?',
                        'What is the delivery time?',
                        'Do you build POS / Inventory software?',
                        'How do I place an order?',
                      ]
                  ).map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        if (isTyping) return;
                        const userMsg: ChatMessage = { id: `user-${Date.now()}`, text: q, sender: 'user' };
                        setMessages(prev => [...prev, userMsg]);
                        streamAiResponse(q, null);
                      }}
                      className="text-[12px] px-2.5 py-1 rounded-full border border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pending image preview */}
            {pendingImage && (
              <div className="px-2 py-1 border-t border-border">
                <div className="relative inline-block">
                  <img src={pendingImage} alt="Uploaded image preview" className="h-12 w-auto rounded-lg" />
                  <button
                    onClick={() => setPendingImage(null)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-[8px]"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-2 shrink-0 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
              <div className="flex gap-1 items-center bg-muted/50 rounded-full px-1.5 py-1 border border-border/30">
                {/* Image button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isTyping}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 disabled:opacity-30 transition-all"
                  title={lang === 'bn' ? 'ছবি পাঠান' : 'Send image'}
                >
                  <Image className="h-4 w-4" />
                </button>

                {/* Voice button */}
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isTyping}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-destructive/15 text-destructive animate-pulse'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  } disabled:opacity-30`}
                  title={isListening ? 'বন্ধ করুন' : 'ভয়েস ইনপুট'}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                {/* Text input */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? (lang === 'bn' ? '🎙 শুনছি...' : '🎙 Listening...') : (lang === 'bn' ? 'প্রশ্ন লিখুন...' : 'Ask question...')}
                  className="flex-1 h-9 px-2 bg-transparent border-0 text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                  disabled={isTyping}
                />

                {/* Send button */}
                <motion.button
                  onClick={handleSend}
                  disabled={(!input.trim() && !pendingImage) || isTyping}
                  className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 disabled:opacity-30 transition-all"
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, User, Bot, Info, MessageSquare, X } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  verified?: boolean;
}

export default function HeritageChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: t('chatbot.greeting'),
      verified: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    t('chatbot.suggest1'),
    t('chatbot.suggest2'),
    t('chatbot.suggest3')
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = t('chatbot.learning');
      let isVerified = false;

      if (text.toLowerCase().includes('when') || text.toLowerCase().includes('created')) {
        botResponse = "Ajanta developed over several centuries, with major phases of construction and artistic activity spanning from around the 2nd century BCE to the 6th century CE.";
        isVerified = true;
      } else if (text.toLowerCase().includes('marathi')) {
        botResponse = "अजिंठा लेणी ही महाराष्ट्रातील छत्रपती संभाजीनगर जिल्ह्यात असलेली प्राचीन बौद्ध लेणी आहेत. ही लेणी वाकाटक साम्राज्याच्या काळात कोरली गेली.";
        isVerified = true;
      } else if (text.toLowerCase().includes('who')) {
        botResponse = "The first phase of construction was patronized by the Satavahana dynasty, while the second, more prolific phase was largely sponsored by Emperor Harishena of the Vakataka dynasty.";
        isVerified = true;
      }

      setMessages(prev => [
        ...prev, 
        { id: (Date.now() + 1).toString(), type: 'bot', text: botResponse, verified: isVerified }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 h-14 px-6 bg-heritage-orange hover:bg-orange-600 text-white rounded-full flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(217,107,39,0.4)] z-50 transition-all hover:scale-105"
          >
            <Bot className="w-6 h-6" />
            <span className="font-semibold text-sm whitespace-nowrap hidden sm:block">{t('chatbot.title')}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] z-50 flex flex-col bg-[#0a1526] border border-heritage-orange/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-deep-navy border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-heritage-orange/20 flex items-center justify-center border border-heritage-orange/50">
                  <Bot className="w-6 h-6 text-heritage-orange" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white text-lg leading-tight">{t('chatbot.title')}</h3>
                  <p className="text-warm-gold text-xs font-medium">{t('chatbot.subtitle')}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-cream/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#051121]">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-heritage-orange/20 flex items-center justify-center border border-heritage-orange/50 flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-heritage-orange" />
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] ${msg.type === 'user' ? 'order-first' : ''}`}>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.type === 'user' 
                        ? 'bg-heritage-orange text-white rounded-tr-none' 
                        : 'bg-white/10 text-cream rounded-tl-none border border-white/10'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                    
                    {msg.type === 'bot' && (
                      <div className="mt-1.5 text-[10px] flex items-center gap-1">
                        {msg.verified ? (
                          <span className="text-success-green flex items-center gap-1 opacity-80">
                            <Info className="w-3 h-3" /> {t('chatbot.verified')}
                          </span>
                        ) : (
                          <span className="text-warm-gold flex items-center gap-1 opacity-80">
                            <Info className="w-3 h-3" /> {t('chatbot.unverified')}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-heritage-orange/20 flex items-center justify-center border border-heritage-orange/50 mt-1">
                    <Bot className="w-4 h-4 text-heritage-orange" />
                  </div>
                  <div className="bg-white/10 py-3 px-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1 items-center h-[44px]">
                    <div className="w-1.5 h-1.5 bg-cream/50 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-cream/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-cream/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="p-3 bg-white/5 border-t border-white/10 flex gap-2 overflow-x-auto hide-scrollbar shrink-0">
              {suggestedQuestions.map((q, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-cream/80 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-deep-navy border-t border-white/10 shrink-0">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder={t('chatbot.askPrompt')}
                  className="w-full bg-white/5 border border-white/20 rounded-full py-3 pl-4 pr-12 text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:border-heritage-orange/50 transition-colors"
                />
                <button 
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 p-2 bg-heritage-orange hover:bg-orange-600 disabled:bg-heritage-orange/50 rounded-full text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

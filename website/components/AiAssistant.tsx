import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';
import { Message } from '../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Greetings. I am the Sweep AI. How can I assist with your animation physics today?', timestamp: Date.now() }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', text: input, timestamp: Date.now() } as Message;
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await chatWithGemini(historyForApi, userMsg.text);
      
      setMessages(prev => [...prev, { role: 'model', text: responseText || "I couldn't generate a response.", timestamp: Date.now() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection interrupted. Please try again.", timestamp: Date.now(), isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 border border-white/10 ${
          isOpen ? 'bg-surface-highlight text-white rotate-90' : 'bg-accent text-white hover:bg-accent-hover'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-40 w-[350px] md:w-[400px] h-[550px] bg-surface rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-[fadeUp_0.3s_ease-out_forwards] origin-bottom-right">
          {/* Header */}
          <div className="p-5 bg-surface-highlight border-b border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-lg tracking-tight">Sweep AI</h3>
              <p className="text-xs text-clay-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Neural Network Active
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-surface">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-clay-100 text-surface-highlight rounded-br-none font-medium'
                      : 'bg-surface-highlight text-clay-200 rounded-bl-none border border-white/5'
                  } ${msg.isError ? 'border-red-500/30 bg-red-900/10 text-red-300' : ''}`}
                >
                  {msg.text.split('```').map((part, i) => {
                    if (i % 2 === 1) {
                      return <code key={i} className="block bg-black/40 p-3 rounded-lg my-3 font-mono text-xs text-accent whitespace-pre-wrap overflow-x-auto border border-white/5">{part}</code>;
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-highlight rounded-2xl rounded-bl-none px-5 py-4 border border-white/5">
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-5 bg-surface-highlight border-t border-white/5">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about installation..."
                className="w-full bg-surface border border-white/10 rounded-xl py-4 pl-5 pr-14 text-sm text-clay-100 placeholder:text-clay-600 focus:outline-none focus:border-accent/50 focus:bg-surface/50 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-clay-400 hover:text-accent disabled:opacity-30 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
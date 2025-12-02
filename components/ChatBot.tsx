import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Icons } from './Icon';
import { AI_CONFIG } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '你好！我是李楚龙的AI助手。关于他的工作经历、技能或项目，您有什么想了解的吗？' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session
  useEffect(() => {
    // Determine API Key: Priority to manual config in constants.ts, then env var
    const apiKey = AI_CONFIG.apiKey || process.env.API_KEY;

    if (apiKey && !chatSession) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const chat = ai.chats.create({
          model: AI_CONFIG.model,
          config: {
            systemInstruction: AI_CONFIG.getSystemInstruction(),
          },
        });
        setChatSession(chat);
      } catch (error) {
        console.error("Failed to initialize AI:", error);
      }
    }
  }, [chatSession]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: userMessage });
      const responseText = result.text;
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "抱歉，我现在无法连接到服务器。请检查 API Key 配置或稍后再试。" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // If no API Key is configured at all, don't render (or render a disabled state)
  const hasKey = !!(AI_CONFIG.apiKey || process.env.API_KEY);

  if (!hasKey) return null; 

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-8 p-4 rounded-full shadow-lg z-50 transition-all duration-300 print:hidden ${
          isOpen 
            ? 'bg-secondary text-surface rotate-90' 
            : 'bg-accent text-white hover:bg-accent-hover hover:scale-110 shadow-glow'
        }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <Icons.MessageSquare className="w-6 h-6" /> : <Icons.MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-40 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-96 bg-surface/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="bg-primary/5 p-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-accent rounded-lg text-white">
              <Icons.Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-primary text-sm">AI 简历助手</h3>
              <p className="text-[10px] text-secondary font-medium">Powered by Gemini</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-secondary hover:text-primary transition-colors"
          >
            <Icons.ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface scrollbar-thin">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent text-white rounded-br-none'
                    : 'bg-accent-light border border-border text-secondary rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-accent-light border border-border px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-border bg-surface">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="询问关于李楚龙的经历..."
              className="w-full bg-accent-light/30 border border-border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-accent text-primary placeholder:text-secondary/50 transition-all"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-1.5 bg-accent text-white rounded-lg hover:bg-accent-hover disabled:opacity-50 disabled:hover:bg-accent transition-colors"
            >
              <Icons.ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;

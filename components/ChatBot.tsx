import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import { GoogleGenAI } from "@google/genai";
import { Icons } from './Icon';
import { AI_CONFIG } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '你好！我是李楚龙的AI助手。关于他的工作经历、技能或项目，您有什么想了解的吗？' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Helper to safely get the current API Key
  const getApiKey = () => {
    if (AI_CONFIG.provider === 'google') {
      // Per guidelines, the API key must be obtained exclusively from process.env.API_KEY
      return process.env.API_KEY;
    } else {
      return AI_CONFIG.volcano.apiKey;
    }
  };

  const apiKey = getApiKey();
  // Ensure we have a key (for Google this depends on process.env.API_KEY being set)
  const hasKey = !!apiKey;

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Optimistically add user message
    const newHistory: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      let responseText = '';

      if (AI_CONFIG.provider === 'google') {
        // --- Google Gemini Logic ---
        // Per guidelines, must use process.env.API_KEY directly in initialization
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Convert history to Gemini format (roles: 'user' and 'model')
        // OpenAI 'assistant' maps to Gemini 'model'
        const contents = newHistory.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }));

        const response = await ai.models.generateContent({
          model: AI_CONFIG.google.model,
          contents: contents,
          config: {
            systemInstruction: AI_CONFIG.getSystemInstruction(),
          },
        });
        
        responseText = response.text || "抱歉，我没有从服务器收到有效的回复。";

      } else {
        // --- Volcano Engine (OpenAI Compatible) Logic ---
        const openai = new OpenAI({
          apiKey: apiKey,
          baseURL: AI_CONFIG.volcano.baseURL,
          dangerouslyAllowBrowser: true 
        });

        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: AI_CONFIG.getSystemInstruction() },
            ...newHistory.map(msg => ({ role: msg.role, content: msg.content }))
          ],
          model: AI_CONFIG.volcano.model,
        });

        responseText = completion.choices[0]?.message?.content || "抱歉，我没有从服务器收到有效的回复。";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "抱歉，我现在无法连接到服务器。请检查配置（API Key/网络）稍后再试。" }]);
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

  // Simple Markdown Parser for Bold text
  const renderMessageContent = (content: string) => {
    // Split by bold syntax (**text**)
    const parts = content.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      // Check if this part is a bold section
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={index} className="font-bold text-primary">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Return normal text
      return <span key={index}>{part}</span>;
    });
  };

  // If no API Key is configured for the active provider, don't render
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
              <p className="text-[10px] text-secondary font-medium">
                {AI_CONFIG.provider === 'google' ? 'Powered by Google Gemini' : 'Powered by Volcano Ark'}
              </p>
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
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-accent text-white rounded-br-none'
                    : 'bg-accent-light border border-border text-secondary rounded-bl-none'
                }`}
              >
                {renderMessageContent(msg.content)}
              </div>
            </div>
          ))}
          
          {isLoading && (
             <div className="flex justify-start w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="bg-accent-light border border-border px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-3 shadow-sm">
                 <div className="flex space-x-1 items-center h-4">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                 </div>
                 <span className="text-xs text-secondary font-medium animate-pulse">AI 正在思考...</span>
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
              className="w-full bg-accent-light border border-border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-accent text-primary placeholder:text-secondary transition-all"
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

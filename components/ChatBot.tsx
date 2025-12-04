
import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import { GoogleGenAI } from "@google/genai";
import { Icons } from './Icon';
import { AI_CONFIG } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const PRESET_QUESTIONS = [
  "简单介绍一下你的工作经历",
  "T-STARS 系统有哪些技术亮点？",
  "你擅长哪些结构分析软件？",
  "你的教育背景如何？"
];

const INITIAL_MESSAGE: Message = { 
  role: 'assistant', 
  content: '你好！我是李楚龙的AI助手。关于他的工作经历、技能或项目，您有什么想了解的吗？' 
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
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

  // Initial Prompt Logic
  useEffect(() => {
    // Show prompt immediately on wide screens
    if (window.innerWidth >= 768) {
        setShowPrompt(true);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading, isStreaming]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Optimistically add user message
    const newHistory: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newHistory);
    setIsLoading(true);
    setIsStreaming(true);

    try {
      let fullResponseText = '';
      let isFirstChunk = true;

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

        const streamResult = await ai.models.generateContentStream({
          model: AI_CONFIG.google.model,
          contents: contents,
          config: {
            systemInstruction: AI_CONFIG.getSystemInstruction(),
          },
        });
        
        for await (const chunk of streamResult) {
          const chunkText = chunk.text || "";
          fullResponseText += chunkText;

          if (isFirstChunk) {
            setIsLoading(false); // Stop "thinking" animation
            setMessages(prev => [...prev, { role: 'assistant', content: fullResponseText }]);
            isFirstChunk = false;
          } else {
            setMessages(prev => {
                const updated = [...prev];
                if (updated.length > 0) {
                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        content: fullResponseText
                    };
                }
                return updated;
            });
          }
        }

      } else {
        // --- Volcano Engine (OpenAI Compatible) Logic ---
        const openai = new OpenAI({
          apiKey: apiKey,
          baseURL: AI_CONFIG.volcano.baseURL,
          dangerouslyAllowBrowser: true 
        });

        const stream = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: AI_CONFIG.getSystemInstruction() },
            ...newHistory.map(msg => ({ role: msg.role as 'user' | 'assistant' | 'system', content: msg.content }))
          ],
          model: AI_CONFIG.volcano.model,
          stream: true,
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
                fullResponseText += content;
                
                if (isFirstChunk) {
                    setIsLoading(false); // Stop "thinking" animation
                    setMessages(prev => [...prev, { role: 'assistant', content: fullResponseText }]);
                    isFirstChunk = false;
                } else {
                    setMessages(prev => {
                        const updated = [...prev];
                        if (updated.length > 0) {
                            updated[updated.length - 1] = {
                                ...updated[updated.length - 1],
                                content: fullResponseText
                            };
                        }
                        return updated;
                    });
                }
            }
        }
      }
      
    } catch (error) {
      console.error("Chat Error:", error);
      // Only append error message if we haven't started streaming yet (or just let the partial response stay)
      setMessages(prev => {
          const lastMsg =SX(prev[prev.length - 1]);
          // If the last message is user, we failed before first chunk
          if (lastMsg && lastMsg.role === 'user') {
               return [...prev, { role: 'assistant', content: "抱歉，我现在无法连接到服务器。请检查配置（API Key/网络）稍后再试。" }];
          }
          return prev;
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  // Helper type guard
  function SX<T>(item: T | undefined): T | undefined { return item; }

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
  };

  const handlePresetClick = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Improved Markdown Parser to handle Headings, Lists, and Bold text
  const renderMessageContent = (content: string, role: 'user' | 'assistant') => {
    const isUser = role === 'user';
    const lines = content.split('\n');

    const parseInline = (text: string) => {
      // Bold: **text**
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          return (
            <strong 
              key={index} 
              className={`font-bold ${isUser ? 'text-inherit' : 'text-primary'}`}
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });
    };

    return (
      <div className={`space-y-2 ${isUser ? 'text-inherit' : 'text-secondary'} text-left`}>
        {lines.map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={i} className="h-1"></div>;

          // Heading 3: ### Title
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={i} className={`font-bold text-sm md:text-base mt-3 -mb-1 ${isUser ? 'text-inherit' : 'text-primary'}`}>
                {parseInline(trimmed.slice(4))}
              </h4>
            );
          }
          
           // Heading 2: ## Title
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={i} className={`font-bold text-base md:text-lg mt-4 -mb-1 ${isUser ? 'text-inherit' : 'text-primary'}`}>
                {parseInline(trimmed.slice(3))}
              </h3>
            );
          }

          // Unordered List: - Item or * Item
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <div key={i} className="flex items-start gap-2 pl-1">
                 <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isUser ? 'bg-white' : 'bg-accent'}`} />
                 <span className="flex-1 leading-relaxed">
                   {parseInline(trimmed.slice(2))}
                 </span>
              </div>
            );
          }

          // Numbered List: 1. Item
          const numMatch = trimmed.match(/^(\d+)\.\s/);
          if (numMatch) {
             return (
              <div key={i} className="flex items-start gap-2 pl-1">
                 <span className={`font-bold ${isUser ? 'text-inherit' : 'text-accent'}`}>{numMatch[1]}.</span>
                 <span className="flex-1 leading-relaxed">
                   {parseInline(trimmed.replace(/^(\d+)\.\s/, ''))}
                 </span>
              </div>
            );
          }

          // Standard Paragraph
          return (
            <p key={i} className="leading-relaxed">
              {parseInline(line)}
            </p>
          );
        })}
      </div>
    );
  };

  // If no API Key is configured for the active provider, don't render
  if (!hasKey) return null; 

  const isBusy = isLoading || isStreaming;

  return (
    <>
      {/* Floating Elements Container (Aligned Vertically) */}
      <div className="fixed bottom-24 right-8 z-50 flex flex-row-reverse items-center gap-5 pointer-events-none print:hidden">

        {/* Floating Action Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full shadow-lg transition-all duration-300 pointer-events-auto ${
            isOpen 
              ? 'bg-secondary text-surface rotate-90' 
              : 'bg-accent text-white hover:bg-accent-hover hover:scale-110 shadow-glow animate-bounce-slow'
          }`}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? <Icons.MessageSquare className="w-6 h-6" /> : <Icons.MessageSquare className="w-6 h-6" />}
        </button>

        {/* Floating Prompt Bubble (Only on large screens) */}
        {showPrompt && !isOpen && (
          <div 
            className="hidden md:flex animate-in fade-in slide-in-from-right-8 duration-500 cursor-pointer group pointer-events-auto relative"
            onClick={() => setIsOpen(true)}
          >
            <div className="bg-surface border border-border p-4 rounded-xl shadow-lg shadow-glow relative max-w-[220px] hover:scale-105 transition-transform">
               {/* Speech Bubble Arrow - Centered Vertically */}
               <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-surface border-t border-r border-border rotate-45 transform -translate-y-1/2 rounded-sm"></div>
               
               <div className="flex items-start gap-3 relative z-10">
                  <div className="p-2 bg-accent-light rounded-full shrink-0">
                    <Icons.MessageSquare className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary mb-1">Hi!</p>
                    <p className="text-xs text-secondary leading-relaxed">
                      对我的经历感兴趣？<br/>点击这里可以让 AI 为您解答！
                    </p>
                  </div>
               </div>

               {/* Close Button */}
               <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPrompt(false);
                  }}
                  className="absolute -top-2 -left-2 bg-surface border border-border rounded-full p-1 text-secondary/60 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  title="关闭提示"
               >
                  <Icons.X className="w-3 h-3" />
               </button>
            </div>
          </div>
        )}
      
      </div>

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
          <div className="flex items-center gap-1">
            <button
                onClick={handleClearChat}
                className="text-secondary hover:text-accent transition-colors p-1.5 rounded-lg hover:bg-surface/50"
                title="重新开始对话"
                aria-label="Restart chat"
            >
                <Icons.RotateCcw className="w-4 h-4" />
            </button>
            <button 
                onClick={() => setIsOpen(false)}
                className="text-secondary hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface/50"
                aria-label="Close chat"
            >
                <Icons.ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface scrollbar-thin">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-accent text-white rounded-br-none'
                    : 'bg-accent-light border border-border text-secondary rounded-bl-none'
                }`}
              >
                {renderMessageContent(msg.content, msg.role)}
              </div>
            </div>
          ))}
          
          {/* Preset Questions - Only shown when idle and fresh */}
          {messages.length === 1 && !isBusy && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
               <p className="text-xs text-secondary/60 font-bold mb-2 ml-1">您可以尝试询问：</p>
               <div className="flex flex-col gap-2">
                 {PRESET_QUESTIONS.map((question, index) => (
                   <button
                     key={index}
                     onClick={() => handlePresetClick(question)}
                     className="text-left text-sm bg-surface hover:bg-accent hover:text-white border border-border hover:border-accent text-secondary py-2 px-3 rounded-xl transition-all shadow-sm active:scale-95"
                   >
                     {question}
                   </button>
                 ))}
               </div>
            </div>
          )}

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
              disabled={isBusy}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isBusy}
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

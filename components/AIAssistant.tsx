import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Terminal } from 'lucide-react';
import { chatWithAgent, analyzeMetrics } from '../services/geminiService';
import { View, ChatMessage, MessageRole } from '../types';

interface AIAssistantProps {
  currentView: View;
  isDarkMode: boolean;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ currentView, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: MessageRole.MODEL, text: 'Hello! I am AutoFlow, your agency co-pilot. I can help you draft emails, debug workflows, or analyze your data. How can I assist you today?', timestamp: new Date() }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: MessageRole.USER, text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    // Add context about current view
    const contextMsg = `[Context: User is currently on the ${currentView} page.] ${input}`;

    const response = await chatWithAgent(history, contextMsg);

    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: MessageRole.MODEL, text: response, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleQuickAction = async () => {
    // Simulate an analysis request based on current view
    if (!isOpen) setIsOpen(true);
    const prompt = `Analyze the current performance metrics visible on the ${currentView} page.`;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: MessageRole.USER, text: "Analyze my current metrics.", timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const analysis = await analyzeMetrics("Mock metrics data: Leads 1240, Reply Rate 8.4%, Active Workflows 24. Trend is UP.");

    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: MessageRole.MODEL, text: analysis, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {!isOpen && (
          <button
            onClick={handleQuickAction}
            className={`px-4 py-2 rounded-full shadow-lg font-medium text-sm border transition-transform hover:-translate-y-1 flex items-center gap-2 ${isDarkMode
                ? 'bg-slate-800 text-indigo-400 border-slate-700 hover:bg-slate-700'
                : 'bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50 shadow-indigo-900/10'
              }`}
          >
            <Sparkles size={16} />
            Analyze Page
          </button>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-110'
            }`}
        >
          {isOpen ? <X className="text-white" /> : <Bot className="text-white" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-96 h-[600px] rounded-2xl shadow-2xl border z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200 transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
          <div className="bg-slate-900 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Terminal size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">AutoFlow AI</h3>
                <p className="text-slate-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Online
                </p>
              </div>
            </div>
          </div>

          <div className={`flex-1 overflow-y-auto p-4 space-y-4 transition-colors ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
            }`} ref={scrollRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : isDarkMode
                        ? 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                        : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                    }`}
                >
                  {msg.text.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`rounded-2xl rounded-bl-none p-4 flex items-center gap-1 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
          </div>

          <div className={`p-4 border-t transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
            }`}>
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about leads, workflows..."
                className={`w-full pl-4 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-colors ${isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 text-center">
              <p className="text-[10px] text-slate-400">AI can make mistakes. Verify important info.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

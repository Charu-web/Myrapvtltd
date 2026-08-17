'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Bot, Send, Sparkles, User } from 'lucide-react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<any[]>([
    { sender: 'ai', text: 'Hello Vikramaditya! I am your LoanPilot AI Assistant. Ask me anything about your active loan files, bank payouts, or upcoming follow-ups.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Sorry, I encountered an issue processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'Show my pending applications.',
    'Which bank gave the highest disbursement this month?',
    'Which leads need follow-up today?',
    'Calculate expected commission.',
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Bot className="h-6 w-6 text-emerald-600" /> AI Loan Intelligence Assistant
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Ask natural language questions to query your CRM database, bank schemes, and commission ledger.
        </p>
      </div>

      <Card className="p-6 flex flex-col h-[550px] shadow-sm">
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-md p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Bot className="h-4 w-4 animate-bounce text-emerald-600" /> AI Assistant is analyzing loan data...
            </div>
          )}
        </div>

        {/* Suggested Prompt Pills */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" /> Suggested Prompts
          </span>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setInput(p)}
                className="text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded-full border border-slate-200 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="pt-3 flex gap-2">
          <Input
            placeholder="Ask about pending apps, commission, high disbursement banks..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="primary" className="gap-1.5" isLoading={isLoading}>
            <Send className="h-4 w-4" /> Send
          </Button>
        </form>

      </Card>
    </div>
  );
}

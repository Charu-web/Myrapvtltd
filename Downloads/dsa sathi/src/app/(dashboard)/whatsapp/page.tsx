'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MessageSquare, Send, CheckCheck, Sparkles } from 'lucide-react';

export default function WhatsAppPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWhatsApp();
  }, []);

  const fetchWhatsApp = async () => {
    try {
      const res = await fetch('/api/whatsapp');
      const data = await res.json();
      setMessages(data.messages || []);
      setTemplates(data.templates || []);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-emerald-600" /> WhatsApp Integration Launcher & Message Logs
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          WhatsApp Business API ready abstraction architecture with template triggers & delivery status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Templates (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" /> Pre-approved WhatsApp Templates
            </h3>
            <div className="space-y-2">
              {templates.map((t) => (
                <div key={t.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{t.title}</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 rounded">{t.code}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{t.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Message Logs (8 cols) */}
        <div className="lg:col-span-8">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-4 mb-4 border-b border-slate-100">
              Live WhatsApp Message Broadcast Log
            </h3>
            {isLoading ? (
              <div className="text-center py-12 text-xs text-slate-500">Loading WhatsApp messages...</div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <span>{m.lead?.customerName} ({m.lead?.phone})</span>
                        <span className="text-[10px] text-slate-400">via {m.sender?.fullName}</span>
                      </div>
                      <p className="text-slate-600 mt-1">{m.content}</p>
                    </div>
                    <span className="text-emerald-600 font-bold flex items-center gap-1 shrink-0">
                      <CheckCheck className="h-4 w-4" /> Delivered
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

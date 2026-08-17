'use client';

import React from 'react';
import { Layers, FileCheck2, Building2, ShieldCheck } from 'lucide-react';

export function TrustMetrics() {
  const metrics = [
    { label: 'Leads Tracked', value: '10,000+', description: 'Centralized lead pipeline with automated reminders', icon: Layers, color: 'text-blue-400' },
    { label: 'Applications Processed', value: '₹500 Cr+', description: 'Across 30+ Banks & NBFC partners in India', icon: FileCheck2, color: 'text-cyan-400' },
    { label: 'DSA Businesses', value: '100+', description: 'From solo loan agents to 50+ member teams', icon: Building2, color: 'text-indigo-400' },
    { label: 'Platform Availability', value: '99.9%', description: 'Bank-grade security & encrypted storage', icon: ShieldCheck, color: 'text-[#7FA8FF]' },
  ];

  return (
    <section className="py-16 bg-[#08172E] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#0B1E38] border border-white/10 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
                <div className={`h-12 w-12 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center mb-4 ${m.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-extrabold text-white tracking-tight">{m.value}</h3>
                <p className="text-sm font-bold text-slate-100 mt-1">{m.label}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{m.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

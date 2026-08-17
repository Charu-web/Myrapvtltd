'use client';

import React from 'react';
import { FileSpreadsheet, Calculator, EyeOff, FolderKanban, Clock, TrendingDown } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      title: 'Leads Lost in Excel & WhatsApp',
      desc: 'Scattered customer inquiries lead to forgotten follow-ups and unassigned leads slipping to competitors.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Commission Payout Disputes',
      desc: 'Manual Excel calculations cause payout confusion, missing pay-ins from banks, and split disagreements with sub-agents.',
      icon: Calculator,
    },
    {
      title: 'Zero Team Visibility',
      desc: 'No clear oversight of which agent is working on which file, daily call volumes, or actual monthly disbursement progress.',
      icon: EyeOff,
    },
    {
      title: 'Document & KYC Chaos',
      desc: 'Customer PAN cards, salary slips, and property files stored across personal WhatsApp chats and unorganized local folders.',
      icon: FolderKanban,
    },
    {
      title: 'Missed Bank Follow-ups',
      desc: 'No automated reminder system for query resolution, leading to prolonged Turnaround Time (TAT) and application rejection.',
      icon: Clock,
    },
    {
      title: 'Scaling Bottlenecks',
      desc: 'Inability to expand sub-DSA partner networks or add new bank codes without administrative chaos.',
      icon: TrendingDown,
    },
  ];

  return (
    <section className="py-20 bg-[#0A1B33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            Industry Challenges
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Are Manual Operations Holding Your DSA Business Back?
          </h2>
          <p className="text-base text-[#A8B4C7]">
            Most loan brokers lose 30% of potential disbursements due to fragmented tools, unorganized documents, and delayed bank follow-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-7 rounded-2xl bg-[#0D223F] border border-white/10 space-y-3 hover:border-rose-500/40 transition-all">
                <div className="h-12 w-12 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-sm text-[#A8B4C7] leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

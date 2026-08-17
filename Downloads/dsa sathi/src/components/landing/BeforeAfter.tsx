'use client';

import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

export function BeforeAfter() {
  const comparisons = [
    { before: 'Leads scattered across Excel sheets & WhatsApp chats', after: 'Centralized lead dashboard with real-time assignment & logs' },
    { before: 'Manual commission calculations & payout confusion', after: 'Automated slab-based commission engine with TDS & GST split' },
    { before: 'Unknown application status & delayed bank updates', after: 'Real-time multi-bank application pipeline & TAT tracking' },
    { before: 'KYC & property documents lost in personal folders', after: 'Central encrypted document vault with category tags' },
    { before: 'Missed customer follow-ups and unhandled queries', after: 'Automated task calendar, call history & WhatsApp reminders' },
    { before: 'No visibility into agent sales target vs achievement', after: 'Comprehensive team leaderboard & performance analytics' },
  ];

  return (
    <section id="before-after" className="py-20 bg-[#071426] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-[#7FA8FF] text-xs font-bold uppercase tracking-wider">
            Operational Transformation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Before LoanPilot vs With LoanPilot CRM
          </h2>
          <p className="text-base text-[#A8B4C7]">
            See how upgrading to LoanPilot streamlines operations and increases your monthly loan disbursements.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0B1E38] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 text-sm">
            
            {/* Before Column */}
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-rose-400 font-extrabold text-xl pb-4 border-b border-white/10">
                <XCircle className="h-7 w-7" />
                <span>Without LoanPilot (Manual DSA)</span>
              </div>
              <ul className="space-y-4 text-slate-300">
                {comparisons.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-[#A8B4C7]">{item.before}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Column */}
            <div className="p-8 space-y-6 bg-blue-950/30">
              <div className="flex items-center gap-3 text-emerald-400 font-extrabold text-xl pb-4 border-b border-white/10">
                <CheckCircle className="h-7 w-7" />
                <span>With LoanPilot CRM</span>
              </div>
              <ul className="space-y-4 text-slate-200">
                {comparisons.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-white">{item.after}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

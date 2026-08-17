'use client';

import React from 'react';
import { Layers, FileCheck, DollarSign, FolderGit2, Users, CalendarCheck, BarChart3, Bot } from 'lucide-react';

export function FeaturesOverview() {
  const features = [
    {
      title: 'Lead Management System',
      desc: 'Capture, assign, and track leads from website, Meta ads, partners, and referrals. Auto lead distribution and stage updates.',
      icon: Layers,
      color: 'bg-blue-950/80 border border-blue-500/30 text-blue-400',
    },
    {
      title: 'Multi-Bank Application Tracker',
      desc: 'Track files across SBI, HDFC, ICICI, Axis, Kotak, and 25+ NBFCs from Draft → Login → Processing → Sanction → Disbursement.',
      icon: FileCheck,
      color: 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-400',
    },
    {
      title: 'Automated Commission Engine',
      desc: 'Configure slab-based pay-ins, partner payouts, agent incentives, TDS (5%), and GST (18%) with real-time payout ledger.',
      icon: DollarSign,
      color: 'bg-indigo-950/80 border border-indigo-500/30 text-indigo-400',
    },
    {
      title: 'Document & KYC Vault',
      desc: 'Centralized customer document repository. Organize PAN, Aadhaar, salary slips, ITRs, and property papers with expiry alerts.',
      icon: FolderGit2,
      color: 'bg-amber-950/80 border border-amber-500/30 text-amber-400',
    },
    {
      title: 'Sub-DSA & Partner Network',
      desc: 'Manage external connectors and sub-agents. Track partner lead contributions, calculate referral splits, and issue statement slips.',
      icon: Users,
      color: 'bg-purple-950/80 border border-purple-500/30 text-purple-400',
    },
    {
      title: 'Task & Call Scheduling',
      desc: 'Never miss a bank query or customer call. Schedule follow-up tasks, log call results, and trigger instant WhatsApp templates.',
      icon: CalendarCheck,
      color: 'bg-rose-950/80 border border-rose-500/30 text-rose-400',
    },
    {
      title: 'Real-Time Reports & BI',
      desc: 'Disbursement reports, bank TAT analysis, employee sales leaderboards, and revenue analytics exportable in CSV and PDF.',
      icon: BarChart3,
      color: 'bg-cyan-950/80 border border-cyan-500/30 text-cyan-400',
    },
    {
      title: 'AI Loan Assistant',
      desc: 'Ask natural language queries like "Show pending sanction files" or "Calculate expected commission for ₹50L Home Loan".',
      icon: Bot,
      color: 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-400',
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#0A1B33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-[#7FA8FF] text-xs font-bold uppercase tracking-wider">
            Comprehensive CRM Capability
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to Scale Your Loan Business
          </h2>
          <p className="text-base text-[#A8B4C7]">
            Built from the ground up to solve the specific operational workflows of financial advisors, loan brokers, and DSAs across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#0B1E38] border border-white/10 shadow-lg hover:border-blue-500/40 transition-all space-y-3">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold ${f.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-white">{f.title}</h3>
                <p className="text-xs text-[#A8B4C7] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

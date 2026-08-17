'use client';

import React from 'react';
import { Home, User, Briefcase, Building, Car, GraduationCap, Coins, Landmark, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function LoanTypesGrid() {
  const loanCategories = [
    { name: 'Home Loan', icon: Home, roi: 'Starting 8.40%', desc: 'New purchase, resale, balance transfer & construction loans.' },
    { name: 'Personal Loan', icon: User, roi: 'Starting 10.50%', desc: 'Instant salaried & self-employed personal credit lines.' },
    { name: 'Business Loan', icon: Briefcase, roi: 'Starting 11.25%', desc: 'Unsecured business loans up to ₹1 Crore.' },
    { name: 'Loan Against Property', icon: Building, roi: 'Starting 8.75%', desc: 'Commercial & residential LAP with LTV up to 85%.' },
    { name: 'Car Loan', icon: Car, roi: 'Starting 8.80%', desc: 'New & pre-owned vehicle financing with quick sanction.' },
    { name: 'Education Loan', icon: GraduationCap, roi: 'Starting 9.50%', desc: 'Domestic & overseas education loans with tax benefits.' },
    { name: 'Gold Loan', icon: Coins, roi: 'Starting 0.89%/mo', desc: 'Instant doorstep gold evaluation & instant payout.' },
    { name: 'MSME Loan', icon: Landmark, roi: 'Starting 10.00%', desc: 'Government-backed CGTMSE & MSME priority sector loans.' },
    { name: 'Working Capital', icon: Landmark, roi: 'Starting 9.25%', desc: 'Cash Credit (CC) & Overdraft (OD) limit facilities.' },
    { name: 'Credit Card', icon: CreditCard, roi: 'Lifetime Free options', desc: 'Instant pre-approved credit cards with bank rewards.' },
  ];

  return (
    <section id="loan-types" className="py-20 bg-[#071426]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-[#7FA8FF] text-xs font-bold uppercase tracking-wider">
            Supported Loan Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Manage Every Loan Product Under One Roof
          </h2>
          <p className="text-base text-[#A8B4C7]">
            LoanPilot CRM supports all major financial products with pre-configured workflows, document checklists, and bank commission matrices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {loanCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-[#0B1E38] border border-white/10 hover:border-blue-500/40 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-[#1687E8] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#A8B4C7] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {item.roi}
                  </span>
                  <Link href="/register" className="text-slate-400 group-hover:text-blue-400 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

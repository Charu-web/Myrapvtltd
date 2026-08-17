'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#061226] via-[#0A1D3A] to-[#07152B]">
      
      {/* Background Radial Glow Effects */}
      <div
        className="absolute top-1/4 right-10 w-[550px] h-[550px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-10 left-10 w-[450px] h-[450px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-[#7FA8FF] text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
              Built Specifically for Indian DSAs, Brokers & Direct Selling Agents
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Stop Losing Leads. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                Start Growing Disbursements.
              </span>
            </h1>

            <p className="text-lg text-[#A8B4C7] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              The all-in-one DSA CRM engineered to centralize leads, track multi-bank loan applications, calculate automated commission payouts, store KYC documents, and power your sales team.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-[#1687E8] text-white hover:bg-blue-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 border-0 gap-2">
                  Start Free 14-Day Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full bg-transparent text-white border-white/20 hover:bg-white/10 hover:border-white/40">
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-[#A8B4C7]">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>2-Minute Setup</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Mobile & App Ready</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>99.9% Uptime Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Dashboard Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Blue Glow Container around card */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600/30 to-cyan-500/30 blur-xl opacity-80" />

              {/* Light Dashboard Card */}
              <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-2xl p-5 space-y-4 text-slate-900">
                
                {/* Header preview bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#1687E8] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      LP
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">LoanPilot Executive Dashboard</h4>
                      <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Sync Active
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
                    Aug 2026
                  </span>
                </div>

                {/* Metric Mini Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-semibold text-slate-400">Total Disbursed</span>
                    <p className="text-lg font-extrabold text-slate-900 mt-0.5">₹ 4.82 Cr</p>
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-1">
                      <TrendingUp className="h-3 w-3" /> +24% vs last mo
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                    <span className="text-[10px] uppercase font-semibold text-blue-600">Pending Payout</span>
                    <p className="text-lg font-extrabold text-blue-900 mt-0.5">₹ 6.45 Lakh</p>
                    <span className="text-[10px] font-semibold text-blue-700 mt-1 block">5 Bank Payouts Ready</span>
                  </div>
                </div>

                {/* Live Application Pipeline Card */}
                <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Recent Sanctioned Application</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">SBI Home Loan</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">Rajesh Kumar</span>
                    <span className="font-bold text-slate-900">₹ 45,00,000</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[85%] rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>Login</span>
                    <span>Processing</span>
                    <span className="font-bold text-emerald-600">Sanctioned</span>
                    <span>Disbursement</span>
                  </div>
                </div>

                {/* Floating Micro Badge */}
                <div className="absolute -bottom-4 -left-4 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">Commission Calculated</p>
                    <p className="text-[10px] text-slate-400">70% Partner Split Applied automatically</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

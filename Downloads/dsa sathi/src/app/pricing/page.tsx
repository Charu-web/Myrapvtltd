'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Check, Users, Calculator, Sparkles, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [userCount, setUserCount] = useState(5);

  const calculateCustomEstimate = () => {
    const basePerUserMonth = isAnnual ? 799 : 999;
    return userCount * basePerUserMonth;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Transparent Plans
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple, Predictable Pricing for Growing DSAs
            </h1>
            <p className="text-base text-slate-600">
              Start with our free trial and scale as your loan disbursement volume increases.
            </p>

            {/* Monthly / Annual Billing Toggle */}
            <div className="pt-6 flex items-center justify-center gap-3">
              <span className={`text-sm font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
                Monthly Billing
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-8 rounded-full bg-slate-900 p-1 transition-colors focus:outline-none"
              >
                <div
                  className={`w-6 h-6 rounded-full bg-blue-500 shadow-md transform transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
                Annual Billing
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Plan 1: Free */}
            <Card className="p-8 flex flex-col justify-between border-slate-200 hover:shadow-lg transition-all">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Starter</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Free Trial</h3>
                <p className="text-xs text-slate-500 mt-2">Perfect for solo agents starting out.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500 ml-1">/ forever</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Up to 1 User seat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Up to 100 Lead records</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Basic Loan Application Tracker</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Document Vault (1 GB)</span>
                  </li>
                </ul>
              </div>
              <Link href="/register" className="mt-8">
                <Button variant="outline" className="w-full">Start Free</Button>
              </Link>
            </Card>

            {/* Plan 2: Professional (Featured) */}
            <Card className="p-8 flex flex-col justify-between border-2 border-blue-600 bg-white shadow-xl relative transform lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md">
                <Sparkles className="h-3 w-3" /> Most Popular DSA Choice
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Professional</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Growth Business</h3>
                <p className="text-xs text-slate-500 mt-2">For growing sales teams & sub-DSA networks.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {isAnnual ? '₹799' : '₹999'}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">/ user / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Unlimited Leads & Applications</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Automated Commission Calculation Engine</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Sub-DSA & Partner Referral Split</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>AI Assistant Integration</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Unlimited S3 Document Storage</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp & Call Tracking Launcher</span>
                  </li>
                </ul>
              </div>
              <Link href="/register" className="mt-8">
                <Button variant="primary" className="w-full shadow-md shadow-blue-600/30">
                  Start 14-Day Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>

            {/* Plan 3: Enterprise */}
            <Card className="p-8 flex flex-col justify-between border-slate-200 hover:shadow-lg transition-all">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Enterprise</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Custom Brokerage</h3>
                <p className="text-xs text-slate-500 mt-2">For large financial organizations & bank networks.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                  <span className="text-xs text-slate-500 ml-1">/ custom SLA</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Advanced Custom RBAC & Audit Logs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Dedicated WhatsApp Business API Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Custom Onboarding & Account Manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>99.99% Uptime Guarantee</span>
                  </li>
                </ul>
              </div>
              <Link href="/register" className="mt-8">
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </Link>
            </Card>

          </div>

          {/* Interactive Pricing Calculator */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Interactive Team Price Estimator</h3>
                <p className="text-xs text-slate-500">Adjust team seats to estimate monthly investment.</p>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" /> Team Seats (Users):
                </label>
                <span className="text-lg font-extrabold text-blue-600 px-3 py-1 bg-white rounded-lg border border-blue-200">
                  {userCount} Users
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="50"
                value={userCount}
                onChange={(e) => setUserCount(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />

              <div className="flex items-center justify-between pt-4 border-t border-blue-200/60">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-semibold">Estimated Monthly Investment</span>
                  <p className="text-3xl font-extrabold text-slate-900">
                    {formatCurrency(calculateCustomEstimate())} <span className="text-xs text-slate-500 font-normal">/ month</span>
                  </p>
                </div>
                <Link href="/register">
                  <Button variant="primary">Get Started Now</Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

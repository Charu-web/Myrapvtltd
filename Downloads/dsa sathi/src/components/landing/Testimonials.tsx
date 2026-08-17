'use client';

import React from 'react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Rakesh Jhunjhunwala (DSA Founder)',
      role: 'MD, Capital Prime Solutions, Delhi NCR',
      text: 'LoanPilot transformed our 20-agent team. Earlier 15% of our leads got lost between Excel and WhatsApp. Now every file is tracked live from SBI login to final disbursement!',
      rating: 5,
    },
    {
      name: 'Pooja Sundaram',
      role: 'Head of Operations, Zenith Wealth Advisors, Mumbai',
      text: 'The automated commission engine saved us 40 hours every month. Calculating 70% partner splits with GST and TDS used to be a nightmare. LoanPilot does it instantly.',
      rating: 5,
    },
    {
      name: 'Suresh Varma',
      role: 'Sub-DSA Partner, Bangalore',
      text: 'As a partner, I love having transparent access to my referral earnings and real-time application stages. Payouts are clean and always on time.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#071426] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            Client Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Leading DSAs & Loan Brokers
          </h2>
          <p className="text-base text-[#A8B4C7]">
            Discover how financial teams across India use LoanPilot to close loans faster and grow revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-[#0B1E38] border border-white/10 space-y-4 shadow-lg hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                &quot;{t.text}&quot;
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs text-[#94A3B8]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

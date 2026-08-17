'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is a DSA CRM and why do I need LoanPilot?',
      a: 'A DSA (Direct Selling Agent) CRM is specialized software designed for loan brokers and financial teams. Unlike generic CRMs, LoanPilot includes multi-bank application tracking, bank commission pay-in/out engines, sub-DSA split automation, and loan document vaults.',
    },
    {
      q: 'Can I manage multiple bank codes and loan products?',
      a: 'Yes! LoanPilot lets you configure unlimited bank profiles (SBI, HDFC, ICICI, Axis, Kotak, NBFCs) along with their specific interest rates, processing fee slabs, turn-around times (TAT), and commission structures.',
    },
    {
      q: 'How does the commission calculation work?',
      a: 'When an application status moves to "Disbursed", LoanPilot automatically applies your predefined commission formula (e.g., 1.5% pay-in from bank). It calculates partner split shares (e.g., 70%), agent incentives, 18% GST, and 5% TDS, updating your financial ledger instantly.',
    },
    {
      q: 'Can my sales team and sub-DSA partners access the platform?',
      a: 'Yes. LoanPilot features strict Role-Based Access Control (RBAC). Admin, Sales Agents, Operations, Finance, HR, Sub-DSA Partners, and Bankers each get dedicated interfaces showing only data relevant to their role.',
    },
    {
      q: 'Can I import my existing leads from Excel or CSV?',
      a: 'Absolutely! Our 1-click CSV import wizard lets you bring thousands of existing leads into LoanPilot in seconds, automatically assigning them to sales agents.',
    },
    {
      q: 'Is customer document storage secure?',
      a: 'Yes, all KYC and property documents are encrypted and stored in S3-compatible cloud storage with restricted access permissions and audit logs.',
    },
    {
      q: 'Is there a free trial available?',
      a: 'Yes! You can start a 14-day free trial on our Free plan with zero credit card required.',
    },
  ];

  return (
    <section className="py-20 bg-[#0A1B33] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <span className="px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-[#7FA8FF] text-xs font-bold uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#A8B4C7]">
            Everything you need to know about LoanPilot CRM architecture, features, and setup.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-[#0B1E38] shadow-md overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-white hover:bg-white/5 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-[#A8B4C7] leading-relaxed border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/Button';
import { Landmark, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SchemeMasterSubmitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bankName: '',
    branch: '',
    schemeName: '',
    product: 'Home Loan',
    states: 'All India',
    minAmount: 1000000,
    maxAmount: 50000000,
    minROI: 8.5,
    maxROI: 10.5,
    cibilScore: 700,
    foir: 65,
    minVintage: 2,
    propertyTypes: 'Residential, Commercial',
    usps: 'Fast 48h sanction, Zero login fee, High LTV',
    rmContact: '+91 98765 43210',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmittedSuccess(true);
      }
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071426] text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <div className="h-12 w-12 rounded-xl bg-[#1687E8] text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
              <Landmark className="h-6 w-6 stroke-[2.5]" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Banker Scheme Submission Portal
            </h1>
            <p className="text-sm text-[#A8B4C7]">
              Bank Managers, Relationship Officers & Product Heads can submit new loan schemes directly to LoanPilot DSA network.
            </p>
          </div>

          {submittedSuccess ? (
            <div className="p-10 text-center space-y-4 max-w-lg mx-auto rounded-2xl border border-emerald-500/40 bg-emerald-950/60">
              <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Scheme Published Successfully!</h2>
              <p className="text-sm text-slate-300">
                Your loan scheme has been recorded in the central Scheme Catalog and is now visible to all registered DSA loan agents across India.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Button className="bg-[#1687E8] text-white hover:bg-blue-500 shadow-md border-0" onClick={() => router.push('/schemes')}>
                  View Public Scheme Catalog
                </Button>
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/10" onClick={() => setSubmittedSuccess(false)}>
                  Submit Another Scheme
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-[#0B1E38] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Section 1: Banker & Bank Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#7FA8FF] uppercase tracking-wider pb-2 border-b border-white/10 flex items-center gap-2">
                    <Landmark className="h-4 w-4" /> 1. Bank & Branch Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Bank Name *</label>
                      <input
                        type="text"
                        placeholder="State Bank of India, HDFC Bank"
                        className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:outline-none"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Branch / Zone Name</label>
                      <input
                        type="text"
                        placeholder="DLF Cyber City Branch, Delhi NCR"
                        className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:outline-none"
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">RM Contact *</label>
                      <input
                        type="text"
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:outline-none"
                        value={formData.rmContact}
                        onChange={(e) => setFormData({ ...formData, rmContact: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Product Category *</label>
                      <select
                        className="w-full rounded-xl border border-white/15 bg-[#071426] py-2.5 px-3 text-xs font-bold text-white focus:outline-none"
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      >
                        <option value="Home Loan">Home Loan</option>
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Business Loan">Business Loan</option>
                        <option value="Loan Against Property">Loan Against Property (LAP)</option>
                        <option value="Car Loan">Car Loan</option>
                        <option value="MSME Loan">MSME Loan</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Scheme Eligibility & Parameters */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#7FA8FF] uppercase tracking-wider pb-2 border-b border-white/10 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" /> 2. Scheme Terms & Eligibility Criteria
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-3 space-y-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Scheme Title *</label>
                      <input
                        type="text"
                        placeholder="Festival Express Home Loan"
                        className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:outline-none"
                        value={formData.schemeName}
                        onChange={(e) => setFormData({ ...formData, schemeName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Applicable States *</label>
                      <input
                        type="text"
                        placeholder="All India"
                        className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:outline-none"
                        value={formData.states}
                        onChange={(e) => setFormData({ ...formData, states: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Min ROI (%) *</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white focus:border-[#1687E8] focus:outline-none"
                        value={formData.minROI}
                        onChange={(e) => setFormData({ ...formData, minROI: parseFloat(e.target.value) })}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Max ROI (%) *</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white focus:border-[#1687E8] focus:outline-none"
                        value={formData.maxROI}
                        onChange={(e) => setFormData({ ...formData, maxROI: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: USPs & Highlights */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[#7FA8FF] uppercase tracking-wider pb-2 border-b border-white/10">
                    3. Key USPs & Promotional Notes
                  </h3>
                  <textarea
                    rows={3}
                    className="w-full rounded-xl border border-white/15 bg-[#071426] p-3 text-xs text-white placeholder-slate-500 focus:border-[#1687E8] focus:outline-none"
                    placeholder="List special highlights e.g. 48-hour sanction guarantee, zero processing fee..."
                    value={formData.usps}
                    onChange={(e) => setFormData({ ...formData, usps: e.target.value })}
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                  <Button type="button" variant="outline" className="text-white border-white/20 hover:bg-white/10" onClick={() => router.push('/')}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#1687E8] text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25 border-0 font-bold" isLoading={isSubmitting}>
                    Submit & Publish Scheme
                  </Button>
                </div>

              </form>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

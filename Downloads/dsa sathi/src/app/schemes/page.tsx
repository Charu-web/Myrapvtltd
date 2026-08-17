'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, Landmark, Plus, Phone, CheckCircle, RefreshCw } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function SchemeCatalogPage() {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [productFilter, setProductFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await fetch('/api/schemes');
      const data = await res.json();
      if (Array.isArray(data)) setSchemes(data);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSchemes = schemes.filter((s) => {
    const matchesSearch =
      (s.schemeName || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.bank?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.states || '').toLowerCase().includes(search.toLowerCase());
    const matchesProduct = productFilter === 'All' || s.product === productFilter;
    return matchesSearch && matchesProduct;
  });

  return (
    <div className="min-h-screen bg-[#071426] text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-[#7FA8FF] text-xs font-bold uppercase tracking-wider">
                Bank Master Circulars
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
                Live Bank Loan Scheme Catalog
              </h1>
              <p className="text-sm text-[#A8B4C7]">
                Explore real-time interest rates, CIBIL requirements, FOIR limits, and RM contacts for 30+ Indian Banks.
              </p>
            </div>
            <Link href="/scheme-master/submit">
              <Button className="bg-[#1687E8] text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25 border-0 font-bold gap-2">
                <Plus className="h-4 w-4" /> Submit Bank Scheme
              </Button>
            </Link>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-[#0B1E38] p-4 rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search scheme name, bank (e.g. SBI, HDFC), or states..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                className="rounded-xl border border-white/15 bg-[#071426] py-2.5 px-3 text-xs font-bold text-white focus:outline-none"
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value="All">All Loan Types</option>
                <option value="Home Loan">Home Loan</option>
                <option value="Personal Loan">Personal Loan</option>
                <option value="Business Loan">Business Loan</option>
                <option value="Loan Against Property">Loan Against Property</option>
              </select>
            </div>
          </div>

          {/* Catalog Grid */}
          {isLoading ? (
            <div className="text-center py-20 text-slate-400 text-xs">Loading bank schemes...</div>
          ) : filteredSchemes.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#0B1E38] border border-white/10 space-y-3">
              <Landmark className="h-12 w-12 mx-auto text-slate-500" />
              <h3 className="text-lg font-bold text-white">No schemes found matching criteria</h3>
              <p className="text-xs text-[#A8B4C7]">Try adjusting search query or loan type filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map((s) => (
                <div key={s.id} className="p-6 rounded-2xl bg-[#0B1E38] border border-white/10 shadow-lg hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xs">
                          {s.bank?.code || 'BANK'}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#7FA8FF] uppercase">{s.bank?.name || 'Partner Bank'}</h4>
                          <h3 className="text-base font-bold text-white">{s.schemeName}</h3>
                        </div>
                      </div>
                      <Badge variant="blue">{s.product}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#071426] border border-white/10 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Interest Rate</span>
                        <span className="font-extrabold text-emerald-400 text-sm">{s.minROI}% - {s.maxROI}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Min CIBIL</span>
                        <span className="font-bold text-white text-sm">{s.cibilScore}+</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Loan Range</span>
                        <span className="font-semibold text-slate-200">{formatCurrency(s.minAmount)} - {formatCurrency(s.maxAmount)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Max FOIR</span>
                        <span className="font-semibold text-slate-200">{s.foir}%</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Key USPs</span>
                      <p className="text-xs text-[#A8B4C7] leading-relaxed bg-[#071426] p-3 rounded-xl border border-white/10">
                        {s.usps}
                      </p>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-[#1687E8]" /> RM: {s.rmContact || 'Bank Helpline'}
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" /> Verified Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  RefreshCw,
  AlertCircle,
  Building,
  Receipt,
} from 'lucide-react';

export default function AccountingPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAccounting();
  }, []);

  const fetchAccounting = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch('/api/accounting');
      if (!res.ok) throw new Error('Failed to load accounting data');
      const json = await res.json();
      setData(json);
    } catch {
      setIsError(true);
    } fontally: {
      setIsLoading(false);
    }
  };

  const filteredExpenses = useMemo(() => {
    if (!data?.expenses) return [];
    if (!searchQuery.trim()) return data.expenses;
    const q = searchQuery.toLowerCase();
    return data.expenses.filter(
      (e: any) =>
        e.description?.toLowerCase().includes(q) ||
        e.category?.toLowerCase().includes(q) ||
        e.requestedBy?.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
              <Calculator className="h-5 w-5" />
            </div>
            Agency Financial Accounting & Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Receivables from bank commission pay-ins, partner payouts, operational expenses, and net profit ledger.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button onClick={fetchAccounting} variant="outline" size="sm" className="gap-1.5 text-xs">
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-5 animate-pulse space-y-3">
                <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                <div className="h-6 bg-slate-200 rounded-md w-3/4" />
              </Card>
            ))}
          </div>
          <Card className="p-6 animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded-md w-1/4" />
            <div className="h-12 bg-slate-200 rounded-xl" />
            <div className="h-12 bg-slate-200 rounded-xl" />
          </Card>
        </div>
      )}

      {/* Error State */}
      {!isLoading && isError && (
        <Card className="p-12 text-center space-y-3">
          <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Unable to load financial statements</h3>
          <p className="text-xs text-slate-500">Please verify your server connection and try again.</p>
          <Button onClick={fetchAccounting} variant="outline" size="sm" className="mt-2">
            Try Again
          </Button>
        </Card>
      )}

      {/* Summary Cards & Ledger */}
      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Bank Pay-Ins</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                {formatCurrency(data?.summary?.totalReceivables || 0)}
              </h3>
            </Card>

            <Card className="p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sub-DSA Payables</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                {formatCurrency(data?.summary?.totalPayables || 0)}
              </h3>
            </Card>

            <Card className="p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operational Expenses</span>
              <h3 className="text-2xl font-extrabold text-rose-600 mt-2">
                {formatCurrency(data?.summary?.totalExpenses || 0)}
              </h3>
            </Card>

            <Card className="p-5 bg-emerald-50/50 border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Net Agency Margin</span>
              <h3 className="text-2xl font-extrabold text-emerald-700 mt-2">
                {formatCurrency(data?.summary?.netIncome || 0)}
              </h3>
            </Card>
          </div>

          <Card className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Receipt className="h-4 w-4 text-blue-600" /> Operational Expense Ledger
              </h3>

              <div className="w-full sm:w-72 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search expenses by category..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredExpenses.length > 0 ? (
              <div className="space-y-2.5">
                {filteredExpenses.map((e: any) => (
                  <div key={e.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">{e.description}</p>
                      <p className="text-[11px] text-slate-500">
                        Category: <span className="font-semibold text-slate-700">{e.category}</span> • Requested by: <span className="font-semibold text-slate-700">{e.requestedBy || 'Admin'}</span> • {formatDate(e.date)}
                      </p>
                    </div>
                    <span className="font-extrabold text-rose-600 text-sm">{formatCurrency(e.amount)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-slate-500">
                No expense entries match your search criteria.
              </div>
            )}
          </Card>
        </>
      )}

    </div>
  );
}

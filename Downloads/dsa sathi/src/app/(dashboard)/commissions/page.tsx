'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  DollarSign,
  Calculator,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Building2,
  PieChart,
} from 'lucide-react';

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [bankFilter, setBankFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [viewDetail, setViewDetail] = useState<any | null>(null);

  // Calculator inputs
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [payInPct, setPayInPct] = useState(1.5);
  const [partnerSplitPct, setPartnerSplitPct] = useState(70);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/commissions');
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch commission records`);
      const data = await res.json();
      if (Array.isArray(data)) setCommissions(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to connect to commission ledger API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (commissionId: string, newStatus: string) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch(`/api/commissions/${commissionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setSuccessMsg(`Payout status updated to ${newStatus}.`);
        fetchCommissions();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update status.');
      }
    } catch {
      setErrorMsg('Network error: Unable to update status.');
    }
  };

  // Safe input handlers with bounds validation
  const handleLoanAmountChange = (val: string) => {
    const num = parseFloat(val);
    setLoanAmount(isNaN(num) || num < 0 ? 0 : num);
  };

  const handlePayInPctChange = (val: string) => {
    const num = parseFloat(val);
    setPayInPct(isNaN(num) || num < 0 ? 0 : num);
  };

  const handlePartnerSplitChange = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setPartnerSplitPct(0);
    } else if (num < 0 || num > 100) {
      setValidationError('Partner share must be between 0% and 100%.');
      setPartnerSplitPct(Math.max(0, Math.min(100, num)));
    } else {
      setValidationError('');
      setPartnerSplitPct(num);
    }
  };

  const handleResetCalc = () => {
    setLoanAmount(5000000);
    setPayInPct(1.5);
    setPartnerSplitPct(70);
    setValidationError('');
  };

  // Calculator exact business formulas
  const safeLoanAmount = Math.max(0, loanAmount || 0);
  const safePayInPct = Math.max(0, payInPct || 0);
  const safePartnerSplit = Math.max(0, Math.min(100, partnerSplitPct || 0));

  const calcBankPayIn = (safeLoanAmount * safePayInPct) / 100;
  const calcPartnerShare = (calcBankPayIn * safePartnerSplit) / 100;
  const calcTDS = calcBankPayIn * 0.05;
  const calcNetAgency = calcBankPayIn - calcPartnerShare - calcTDS;

  // Filter & Search Logic
  const trimmedSearch = search.trim().toLowerCase();
  let filtered = commissions.filter((c) => {
    const appNum = c.application?.applicationNumber || '';
    const bankName = c.application?.bank?.name || '';
    const customerName = c.lead?.customerName || '';

    const matchesSearch =
      !trimmedSearch ||
      appNum.toLowerCase().includes(trimmedSearch) ||
      bankName.toLowerCase().includes(trimmedSearch) ||
      customerName.toLowerCase().includes(trimmedSearch);

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesBank = bankFilter === 'All' || c.application?.bank?.name === bankFilter;

    return matchesSearch && matchesStatus && matchesBank;
  });

  // Sorting Logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'date-asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'amount-desc') return (b.disbursedAmount || 0) - (a.disbursedAmount || 0);
    if (sortBy === 'payin-desc') return (b.totalPayIn || 0) - (a.totalPayIn || 0);
    if (sortBy === 'payout-desc') return (b.partnerPayout || 0) - (a.partnerPayout || 0);
    return 0;
  });

  // Unique Bank List for filter dropdown
  const bankNames = Array.from(new Set(commissions.map((c) => c.application?.bank?.name).filter(Boolean)));

  // KPI Calculations from active dataset
  const totalPayIn = filtered.reduce((s, c) => s + (c.totalPayIn || 0), 0);
  const totalPartnerPayout = filtered.reduce((s, c) => s + (c.partnerPayout || 0), 0);
  const totalDeductions = filtered.reduce((s, c) => s + (c.tdsAmount || 0) + (c.gstAmount || 0), 0);

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setBankFilter('All');
    setSortBy('date-desc');
  };

  const exportCSV = () => {
    const headers = [
      'App Ref',
      'Bank',
      'Customer',
      'Disbursed Amount',
      'Pay-in %',
      'Total Pay-in',
      'Partner Payout',
      'TDS (5%)',
      'Net Agency Margin',
      'Status',
      'Date',
    ];
    const rows = filtered.map((c) => [
      c.application?.applicationNumber || 'N/A',
      `"${c.application?.bank?.name || 'N/A'}"`,
      `"${c.lead?.customerName || 'N/A'}"`,
      c.disbursedAmount,
      c.payInPercent,
      c.totalPayIn,
      c.partnerPayout,
      c.tdsAmount,
      c.netPayout,
      `"${c.status}"`,
      formatDate(c.createdAt),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LoanPilot_Commission_Ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasActiveFilters = search || statusFilter !== 'All' || bankFilter !== 'All' || sortBy !== 'date-desc';

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-600" /> Bank Commission & Payout Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated bank commission calculation, partner payout ledger, TDS (5%) & GST (18%) tracking.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button variant="primary" size="sm" onClick={() => setCalcModalOpen(true)} className="gap-1.5 shadow-sm">
            <Calculator className="h-4 w-4" /> Commission Calculator
          </Button>
        </div>
      </div>

      {/* Feedback Messages */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={fetchCommissions} className="flex items-center gap-1 text-rose-700 underline hover:text-rose-900">
            <RefreshCw className="h-3.5 w-3.5" /> Retry
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-gradient-to-br from-white to-blue-50/40 border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bank Pay-in</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{formatCurrency(totalPayIn)}</h3>
          <p className="text-xs text-blue-600 font-semibold mt-1">Across Disbursed Loans</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-emerald-50/40 border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Partner / DSA Payouts</span>
          <h3 className="text-2xl font-extrabold text-emerald-700 mt-2">{formatCurrency(totalPartnerPayout)}</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Average Share Distributed</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-amber-50/40 border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">GST / TDS / Deductions</span>
          <h3 className="text-2xl font-extrabold text-amber-700 mt-2">{formatCurrency(totalDeductions)}</h3>
          <p className="text-xs text-amber-600 font-semibold mt-1">Form 26AS Tax Compliant</p>
        </Card>
      </div>

      {/* Toolbar & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search App #, Bank, or Customer..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            
            {/* Status Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
            </select>

            {/* Bank Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={bankFilter}
              onChange={(e) => setBankFilter(e.target.value)}
            >
              <option value="All">All Banks</option>
              {bankNames.map((bn: any) => (
                <option key={bn} value={bn}>{bn}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Disbursed Amount (High to Low)</option>
              <option value="payin-desc">Bank Pay-in (High to Low)</option>
              <option value="payout-desc">Partner Payout (High to Low)</option>
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" /> Clear Filters
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Commissions Table */}
      {isLoading ? (
        <div className="text-center py-20 text-xs text-slate-400 font-medium">Loading commission ledger...</div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <DollarSign className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No commission records found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No commission ledger entries match your current search or filter parameters.'
              : 'No loan disbursements have been recorded yet.'}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">APP REF</th>
                  <th className="p-3.5">BANK</th>
                  <th className="p-3.5">DISBURSED AMOUNT</th>
                  <th className="p-3.5">PAY-IN %</th>
                  <th className="p-3.5">BANK PAY-IN</th>
                  <th className="p-3.5">PARTNER SHARE</th>
                  <th className="p-3.5">TDS (5%)</th>
                  <th className="p-3.5">NET PAYOUT</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-blue-600">
                      {c.application?.applicationNumber || 'LP-APP'}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      {c.application?.bank?.name || 'Partner Bank'}
                    </td>
                    <td className="p-3.5 font-extrabold text-slate-900">
                      {formatCurrency(c.disbursedAmount)}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-600">
                      {c.payInPercent}%
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      {formatCurrency(c.totalPayIn)}
                    </td>
                    <td className="p-3.5 font-bold text-blue-600">
                      {formatCurrency(c.partnerPayout)}
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {formatCurrency(c.tdsAmount)}
                    </td>
                    <td className="p-3.5 font-extrabold text-emerald-700">
                      {formatCurrency(c.netPayout || c.totalPayIn - c.partnerPayout - c.tdsAmount)}
                    </td>
                    <td className="p-3.5">
                      <select
                        className="rounded-md border border-slate-200 bg-white text-xs font-bold py-1 px-2 focus:outline-none"
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                      >
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setViewDetail(c)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                        title="View Detailed Ledger"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* View Detailed Commission Breakdown Modal */}
      {viewDetail && (
        <Modal
          isOpen={!!viewDetail}
          onClose={() => setViewDetail(null)}
          title={`Commission Breakdown - ${viewDetail.application?.applicationNumber || 'LP-APP'}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Bank Name:</span>
                <span className="font-bold text-slate-900">{viewDetail.application?.bank?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Disbursed Amount:</span>
                <span className="font-extrabold text-slate-900">{formatCurrency(viewDetail.disbursedAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Pay-in Percentage:</span>
                <span className="font-bold text-emerald-600">{viewDetail.payInPercent}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Gross Bank Pay-in:</span>
                <span className="font-extrabold text-slate-900">{formatCurrency(viewDetail.totalPayIn)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Sub-DSA Partner Share:</span>
                <span className="font-bold text-blue-600">{formatCurrency(viewDetail.partnerPayout)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Govt TDS (5%):</span>
                <span className="font-semibold text-slate-700">{formatCurrency(viewDetail.tdsAmount)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                <span className="font-bold text-slate-800">Net Agency Margin:</span>
                <span className="font-extrabold text-emerald-700 text-sm">{formatCurrency(viewDetail.netPayout)}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setViewDetail(null)}>
                Close Modal
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Redesigned Enterprise Commission Calculator Modal */}
      <Modal
        isOpen={calcModalOpen}
        onClose={() => setCalcModalOpen(false)}
        title="Interactive Commission Calculator"
        description="Simulate real-time bank pay-ins, sub-DSA payouts, TDS tax deductions, and net margins."
        maxWidth="xl"
      >
        <div className="space-y-6 text-xs">
          
          {/* Validation Alert Message */}
          {validationError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Form Inputs Grid */}
          <div className="space-y-4">
            
            {/* Field 1: Disbursed Loan Amount */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Disbursed Loan Amount (₹) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-bold text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                  value={loanAmount || ''}
                  onChange={(e) => handleLoanAmountChange(e.target.value)}
                  placeholder="50,00,000"
                />
              </div>
            </div>

            {/* Field 2 & 3: Bank Pay-In % & Sub-DSA Partner Share % */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Bank Pay-In (%) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full pl-3.5 pr-8 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-bold text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                    value={payInPct || ''}
                    onChange={(e) => handlePayInPctChange(e.target.value)}
                    placeholder="1.5"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                    %
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Sub-DSA Partner Share (%) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    className="w-full pl-3.5 pr-8 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-bold text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                    value={partnerSplitPct || ''}
                    onChange={(e) => handlePartnerSplitChange(e.target.value)}
                    placeholder="70"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                    %
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Real-time Calculation Summary Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-200/80">
              <span className="font-semibold text-slate-600">Gross Bank Pay-in ({safePayInPct}%):</span>
              <span className="font-extrabold text-slate-900 text-sm">{formatCurrency(calcBankPayIn)}</span>
            </div>

            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-200/80">
              <span className="font-semibold text-slate-600">Partner Payout Share ({safePartnerSplit}%):</span>
              <span className="font-extrabold text-blue-600 text-sm">{formatCurrency(calcPartnerShare)}</span>
            </div>

            <div className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-200/80">
              <span className="font-semibold text-slate-600">Govt TDS (5%):</span>
              <span className="font-bold text-slate-700 text-sm">{formatCurrency(calcTDS)}</span>
            </div>

            {/* Visual Highlight: Net Agency Margin */}
            <div className="pt-1">
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300/80 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Net Agency Margin
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                    Net retained earnings after payout & tax
                  </span>
                </div>
                <span className="text-2xl font-extrabold text-emerald-700">
                  {formatCurrency(calcNetAgency)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetCalc}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reset Defaults
            </button>
            <Button variant="outline" size="sm" onClick={() => setCalcModalOpen(false)}>
              Close Calculator
            </Button>
          </div>

        </div>
      </Modal>

    </div>
  );
}

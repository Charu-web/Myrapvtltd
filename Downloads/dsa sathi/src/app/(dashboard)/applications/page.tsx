'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  FileCheck,
  Search,
  Filter,
  Plus,
  Eye,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  X,
  Clock,
  Landmark,
  Layers,
  ChevronRight,
  Download,
} from 'lucide-react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [banks, setBanks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loanTypeFilter, setLoanTypeFilter] = useState('All');
  const [bankFilter, setBankFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newApp, setNewApp] = useState({
    leadId: '',
    bankId: '',
    loanType: 'Home Loan',
    amount: 5000000,
    tenure: 240,
    roi: 8.5,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const [appsRes, leadsRes, banksRes] = await Promise.all([
        fetch('/api/applications').then((r) => r.json()).catch(() => []),
        fetch('/api/leads').then((r) => r.json()).catch(() => []),
        fetch('/api/banks').then((r) => r.json()).catch(() => []),
      ]);

      if (Array.isArray(appsRes)) setApplications(appsRes);
      if (Array.isArray(leadsRes)) setLeads(leadsRes);
      if (Array.isArray(banksRes)) setBanks(banksRes);
    } catch {
      setErrorMsg('Failed to load application pipeline data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!newApp.leadId || !newApp.bankId || !newApp.amount) {
      setErrorMsg('Please select a lead, bank, and loan amount.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp),
      });

      if (res.ok) {
        setSuccessMsg('Loan application filed successfully.');
        setIsAddModalOpen(false);
        setNewApp({
          leadId: '',
          bankId: '',
          loanType: 'Home Loan',
          amount: 5000000,
          tenure: 240,
          roi: 8.5,
        });
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to create application.');
      }
    } catch {
      setErrorMsg('Network error: Unable to file loan application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusTransition = async (appId: string, newStatus: string) => {
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setSuccessMsg(`Application status updated to ${newStatus}.`);
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update status.');
      }
    } catch {
      setErrorMsg('Network error: Unable to update application status.');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setLoanTypeFilter('All');
    setBankFilter('All');
  };

  const exportCSV = () => {
    const headers = ['App Number', 'Customer Name', 'Bank', 'Loan Type', 'Amount (INR)', 'ROI (%)', 'Status', 'Date'];
    const rows = filteredApps.map((app) => [
      app.applicationNumber,
      `"${app.lead?.customerName || 'N/A'}"`,
      `"${app.bank?.name || 'N/A'}"`,
      `"${app.loanType}"`,
      app.amount,
      app.roi,
      `"${app.status}"`,
      formatDate(app.loginDate || app.createdAt),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LoanPilot_Applications_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pipelineStages = ['Draft', 'Login', 'Processing', 'Query Raised', 'Sanctioned', 'Disbursed', 'Rejected'];
  const loanTypes = ['Home Loan', 'Personal Loan', 'Business Loan', 'Loan Against Property'];

  const trimmedSearch = search.trim().toLowerCase();
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      !trimmedSearch ||
      app.applicationNumber.toLowerCase().includes(trimmedSearch) ||
      (app.lead?.customerName && app.lead.customerName.toLowerCase().includes(trimmedSearch)) ||
      (app.bank?.name && app.bank.name.toLowerCase().includes(trimmedSearch));

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesLoanType = loanTypeFilter === 'All' || app.loanType === loanTypeFilter;
    const matchesBank = bankFilter === 'All' || app.bank?.id === bankFilter;

    return matchesSearch && matchesStatus && matchesLoanType && matchesBank;
  });

  const hasActiveFilters = search || statusFilter !== 'All' || loanTypeFilter !== 'All' || bankFilter !== 'All';

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-blue-600" /> Loan Application Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Multi-bank application tracking from file login to final sanction, disbursement, and commission payout.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" /> New Loan File
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
          <button onClick={fetchData} className="flex items-center gap-1 text-rose-700 underline hover:text-rose-900">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search App #, Customer Name, or Bank..."
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
            
            {/* Stage Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Stages</option>
              {pipelineStages.map((stg) => (
                <option key={stg} value={stg}>{stg}</option>
              ))}
            </select>

            {/* Loan Type Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={loanTypeFilter}
              onChange={(e) => setLoanTypeFilter(e.target.value)}
            >
              <option value="All">All Loan Types</option>
              {loanTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Bank Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={bankFilter}
              onChange={(e) => setBankFilter(e.target.value)}
            >
              <option value="All">All Banks</option>
              {banks.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
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

            {/* View Switcher */}
            <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-100 ml-auto">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
              >
                Kanban Pipeline
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
              >
                Table View
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-400 font-medium">
          Loading loan application pipeline...
        </div>
      ) : filteredApps.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileCheck className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No loan applications found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No applications match your search or filter settings. Try resetting parameters.'
              : 'No loan files have been submitted yet.'}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
        </Card>
      ) : viewMode === 'kanban' ? (
        /* Multi-Stage Kanban Pipeline View */
        <div className="flex gap-4 overflow-x-auto pb-6">
          {pipelineStages.map((stg) => {
            const stageApps = filteredApps.filter((a) => a.status === stg);
            return (
              <div key={stg} className="w-72 shrink-0 bg-slate-100/80 p-3 rounded-xl border border-slate-200/90 flex flex-col justify-between">
                <div>
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{stg}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-bold shadow-xs border border-slate-200">
                      {stageApps.length}
                    </span>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                    {stageApps.length === 0 ? (
                      <div className="py-8 text-center text-[11px] text-slate-400 font-medium">
                        No files in {stg}
                      </div>
                    ) : (
                      stageApps.map((app) => (
                        <Card key={app.id} className="p-4 space-y-2.5 hover:shadow-md transition-all border-slate-200">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-blue-600 tracking-tight">
                              {app.applicationNumber}
                            </span>
                            <Badge variant="blue">{app.bank?.code || 'BANK'}</Badge>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {app.lead?.customerName || 'Customer Record'}
                            </h4>
                            <p className="text-xs font-extrabold text-emerald-700 mt-0.5">
                              {formatCurrency(app.amount)}
                            </p>
                          </div>

                          <div className="text-[10px] text-slate-500 space-y-0.5">
                            <p><strong className="text-slate-700">Bank:</strong> {app.bank?.name}</p>
                            <p><strong className="text-slate-700">Category:</strong> {app.loanType}</p>
                          </div>

                          {/* Quick Stage Transition Dropdown */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <select
                              className="text-[10px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none"
                              value={app.status}
                              onChange={(e) => handleStatusTransition(app.id, e.target.value)}
                            >
                              {pipelineStages.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>

                            <Link href={`/applications/${app.id}`} className="text-[10px] font-bold text-blue-600 hover:underline">
                              Details →
                            </Link>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <Card className="p-0 overflow-hidden border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">App Number</th>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Bank</th>
                  <th className="p-3.5">Loan Type</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">ROI (%)</th>
                  <th className="p-3.5">Pipeline Stage</th>
                  <th className="p-3.5">File Date</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-blue-600">
                      <Link href={`/applications/${app.id}`} className="hover:underline">
                        {app.applicationNumber}
                      </Link>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{app.lead?.customerName || 'N/A'}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{app.bank?.name || 'N/A'}</td>
                    <td className="p-3.5">{app.loanType}</td>
                    <td className="p-3.5 font-extrabold text-slate-900">{formatCurrency(app.amount)}</td>
                    <td className="p-3.5 font-bold text-emerald-600">{app.roi || 8.5}%</td>
                    <td className="p-3.5">
                      <select
                        className="rounded-md border border-slate-200 bg-white text-xs font-bold py-1 px-2 focus:outline-none"
                        value={app.status}
                        onChange={(e) => handleStatusTransition(app.id, e.target.value)}
                      >
                        {pipelineStages.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3.5 text-slate-500">{formatDate(app.loginDate || app.createdAt)}</td>
                    <td className="p-3.5 text-right">
                      <Link href={`/applications/${app.id}`}>
                        <Button variant="ghost" size="sm" title="View details">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add New Application File Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => !isSubmitting && setIsAddModalOpen(false)} title="File New Loan Application">
        <form onSubmit={handleCreateApp} className="space-y-4 text-xs">
          
          {/* Select Lead */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase">
              Select Customer Lead *
            </label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
              value={newApp.leadId}
              onChange={(e) => setNewApp({ ...newApp, leadId: e.target.value })}
              required
            >
              <option value="">-- Choose Lead Record --</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.leadId} - {l.customerName} ({l.phone})
                </option>
              ))}
            </select>
          </div>

          {/* Select Bank */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase">
              Target Lending Partner / Bank *
            </label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
              value={newApp.bankId}
              onChange={(e) => setNewApp({ ...newApp, bankId: e.target.value })}
              required
            >
              <option value="">-- Choose Bank --</option>
              {banks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.code})
                </option>
              ))}
            </select>
          </div>

          {/* Category & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Loan Category</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold"
                value={newApp.loanType}
                onChange={(e) => setNewApp({ ...newApp, loanType: e.target.value })}
              >
                {loanTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <Input
              label="Loan Amount (₹) *"
              type="number"
              value={newApp.amount}
              onChange={(e) => setNewApp({ ...newApp, amount: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>

          {/* Tenure & ROI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Tenure (Months)"
              type="number"
              value={newApp.tenure}
              onChange={(e) => setNewApp({ ...newApp, tenure: parseInt(e.target.value) || 240 })}
            />
            <Input
              label="Interest Rate ROI (%)"
              type="number"
              step="0.1"
              value={newApp.roi}
              onChange={(e) => setNewApp({ ...newApp, roi: parseFloat(e.target.value) || 8.5 })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isSubmitting}>
              Submit Application File
            </Button>
          </div>

        </form>
      </Modal>

    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Eye,
  Edit2,
  Trash2,
  X,
  Layers,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquare,
} from 'lucide-react';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loanTypeFilter, setLoanTypeFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<any | null>(null);
  const [deleteLeadTarget, setDeleteLeadTarget] = useState<any | null>(null);

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newLead, setNewLead] = useState({
    customerName: '',
    phone: '',
    email: '',
    city: 'Delhi NCR',
    loanType: 'Home Loan',
    amount: 2500000,
    source: 'Website',
    notes: '',
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/leads');
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch leads`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setLeads(data);
      } else {
        setLeads([]);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!newLead.customerName.trim() || !newLead.phone.trim() || !newLead.amount) {
      setErrorMsg('Customer name, phone, and loan amount are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });

      if (res.ok) {
        setSuccessMsg('New lead created successfully.');
        setIsAddModalOpen(false);
        setNewLead({
          customerName: '',
          phone: '',
          email: '',
          city: 'Delhi NCR',
          loanType: 'Home Loan',
          amount: 2500000,
          source: 'Website',
          notes: '',
        });
        fetchLeads();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to create lead.');
      }
    } catch {
      setErrorMsg('Network error: Unable to create lead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLead) return;

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/leads/${editLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: editLead.customerName,
          phone: editLead.phone,
          email: editLead.email,
          loanType: editLead.loanType,
          amount: parseFloat(editLead.amount),
          status: editLead.status,
          source: editLead.source,
          city: editLead.city,
        }),
      });

      if (res.ok) {
        setSuccessMsg(`Lead ${editLead.leadId} updated successfully.`);
        setEditLead(null);
        fetchLeads();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update lead.');
      }
    } catch {
      setErrorMsg('Network error: Failed to update lead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!deleteLeadTarget) return;

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/leads/${deleteLeadTarget.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccessMsg(`Lead ${deleteLeadTarget.leadId} deleted successfully.`);
        setDeleteLeadTarget(null);
        fetchLeads();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to delete lead.');
      }
    } catch {
      setErrorMsg('Network error: Failed to delete lead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setSuccessMsg(`Lead status updated to ${newStatus}.`);
        fetchLeads();
      }
    } catch {
      setErrorMsg('Failed to update status.');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setLoanTypeFilter('All');
    setSourceFilter('All');
    setCurrentPage(1);
  };

  const exportCSV = () => {
    const headers = ['Lead ID', 'Customer Name', 'Phone', 'Email', 'Loan Type', 'Amount (INR)', 'Source', 'Status', 'Date'];
    const rows = filteredLeads.map((l) => [
      l.leadId,
      `"${l.customerName}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.loanType}"`,
      l.amount,
      `"${l.source}"`,
      `"${l.status}"`,
      formatDate(l.createdDate),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LoanPilot_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Logic
  const trimmedSearch = search.trim().toLowerCase();
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      !trimmedSearch ||
      l.customerName.toLowerCase().includes(trimmedSearch) ||
      l.phone.includes(trimmedSearch) ||
      l.leadId.toLowerCase().includes(trimmedSearch) ||
      (l.email && l.email.toLowerCase().includes(trimmedSearch));

    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesType = loanTypeFilter === 'All' || l.loanType === loanTypeFilter;
    const matchesSource = sourceFilter === 'All' || l.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesType && matchesSource;
  });

  // Pagination Calculation
  const totalRecords = filteredLeads.length;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const statuses = [
    'New',
    'Contacted',
    'Interested',
    'Documents Pending',
    'Application Started',
    'Login',
    'Sanctioned',
    'Disbursed',
    'Rejected',
    'Lost',
  ];

  const loanTypes = ['Home Loan', 'Personal Loan', 'Business Loan', 'Loan Against Property'];
  const sources = ['Website', 'Referral', 'Partner', 'Cold Call', 'Facebook', 'Google'];

  const hasActiveFilters = search || statusFilter !== 'All' || loanTypeFilter !== 'All' || sourceFilter !== 'All';

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="h-6 w-6 text-blue-600" /> Lead Management Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track, assign, filter, and convert customer loan inquiries through the sales funnel.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsImportModalOpen(true)} className="gap-1.5">
            <Upload className="h-4 w-4" /> Import CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" /> Add Lead
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
          <button onClick={fetchLeads} className="flex items-center gap-1 text-rose-700 underline hover:text-rose-900">
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

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Input with Clear button */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name, phone, Lead ID, email..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
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
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Loan Type Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={loanTypeFilter}
              onChange={(e) => {
                setLoanTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Loan Types</option>
              {loanTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Source Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Sources</option>
              {sources.map((src) => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" /> Clear Filters
              </button>
            )}

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-100 ml-auto">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
              >
                Kanban
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-400 font-medium">
          Loading lead directory...
        </div>
      ) : filteredLeads.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No matching leads found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No leads match your current search or filter criteria. Try adjusting your parameters.'
              : 'No lead records available in the database yet.'}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
        </Card>
      ) : viewMode === 'table' ? (
        <Card className="p-0 overflow-hidden border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Lead ID</th>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Phone</th>
                  <th className="p-3.5">Loan Type</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Created Date</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {paginatedLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-blue-600">
                      <Link href={`/leads/${l.id}`} className="hover:underline">
                        {l.leadId}
                      </Link>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{l.customerName}</td>
                    <td className="p-3.5 text-slate-600">{l.phone}</td>
                    <td className="p-3.5">{l.loanType}</td>
                    <td className="p-3.5 font-extrabold text-slate-900">{formatCurrency(l.amount)}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[10px]">
                        {l.source}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        className="rounded-md border border-slate-200 bg-white text-xs font-bold py-1 px-2 focus:outline-none"
                        value={l.status}
                        onChange={(e) => handleQuickStatusChange(l.id, e.target.value)}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3.5 text-slate-500">{formatDate(l.createdDate)}</td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/leads/${l.id}`}>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100" title="View Lead Details">
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => setEditLead(l)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100"
                          title="Edit Lead"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteLeadTarget(l)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
            <div>
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalRecords)} to {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords} leads
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span>Per page:</span>
                <select
                  className="rounded-md border border-slate-300 bg-white py-1 px-2 text-xs font-semibold focus:outline-none"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2 font-bold text-slate-900">
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        /* Kanban View */
        <div className="flex gap-4 overflow-x-auto pb-6">
          {['New', 'Contacted', 'Interested', 'Login', 'Sanctioned', 'Disbursed'].map((stg) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stg);
            return (
              <div key={stg} className="w-72 shrink-0 bg-slate-100/70 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-800">{stg}</span>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-bold shadow-xs">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {stageLeads.map((l) => (
                    <Card key={l.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-blue-600">{l.leadId}</span>
                        <Badge statusText={l.status} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{l.customerName}</h4>
                      <p className="text-xs font-extrabold text-slate-900">{formatCurrency(l.amount)}</p>
                      <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100">
                        <span>{l.loanType}</span>
                        <Link href={`/leads/${l.id}`} className="text-blue-600 font-bold hover:underline">
                          View →
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Lead Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => !isSubmitting && setIsAddModalOpen(false)} title="Create New Lead Record">
        <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
          <Input
            label="Customer Full Name *"
            placeholder="e.g. Rajesh Kumar"
            value={newLead.customerName}
            onChange={(e) => setNewLead({ ...newLead, customerName: e.target.value })}
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Phone (+91) *"
              placeholder="+91 98765 43210"
              value={newLead.phone}
              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="rajesh@gmail.com"
              value={newLead.email}
              onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Loan Category *</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
                value={newLead.loanType}
                onChange={(e) => setNewLead({ ...newLead, loanType: e.target.value })}
              >
                {loanTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <Input
              label="Loan Amount (₹) *"
              type="number"
              value={newLead.amount}
              onChange={(e) => setNewLead({ ...newLead, amount: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isSubmitting}>
              Create Lead Record
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Lead Modal */}
      {editLead && (
        <Modal isOpen={!!editLead} onClose={() => !isSubmitting && setEditLead(null)} title={`Edit Lead - ${editLead.leadId}`}>
          <form onSubmit={handleUpdateLead} className="space-y-4 text-xs">
            <Input
              label="Customer Full Name *"
              value={editLead.customerName}
              onChange={(e) => setEditLead({ ...editLead, customerName: e.target.value })}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Phone *"
                value={editLead.phone}
                onChange={(e) => setEditLead({ ...editLead, phone: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={editLead.email || ''}
                onChange={(e) => setEditLead({ ...editLead, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Loan Category</label>
                <select
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold"
                  value={editLead.loanType}
                  onChange={(e) => setEditLead({ ...editLead, loanType: e.target.value })}
                >
                  {loanTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Loan Amount (₹)"
                type="number"
                value={editLead.amount}
                onChange={(e) => setEditLead({ ...editLead, amount: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Lead Status</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold"
                value={editLead.status}
                onChange={(e) => setEditLead({ ...editLead, status: e.target.value })}
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditLead(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isSubmitting}>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteLeadTarget && (
        <Modal isOpen={!!deleteLeadTarget} onClose={() => !isSubmitting && setDeleteLeadTarget(null)} title="Delete Lead Record?">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to permanently delete lead record <strong className="text-slate-900">{deleteLeadTarget.leadId}</strong> ({deleteLeadTarget.customerName})?
            </p>
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>This action cannot be undone. Associated activities will be removed.</span>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setDeleteLeadTarget(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="button" variant="danger" size="sm" onClick={handleDeleteLead} isLoading={isSubmitting} disabled={isSubmitting}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Import CSV Modal */}
      <Modal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} title="Import Leads from CSV">
        <div className="space-y-4 text-center text-xs">
          <div className="p-8 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 cursor-pointer hover:border-blue-500">
            <Upload className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="font-bold text-slate-800">Click or drag CSV file to upload</p>
            <p className="text-[10px] text-slate-400 mt-1">Columns required: Name, Phone, LoanType, Amount</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsImportModalOpen(false)} className="w-full">
            Simulate Batch CSV Import
          </Button>
        </div>
      </Modal>

    </div>
  );
}

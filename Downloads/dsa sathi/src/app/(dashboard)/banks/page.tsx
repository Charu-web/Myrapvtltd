'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import {
  Landmark,
  Plus,
  Phone,
  Mail,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Building2,
  Percent,
  UserCheck,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';

export default function BanksPage() {
  const [banks, setBanks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewBank, setViewBank] = useState<any | null>(null);
  const [editBank, setEditBank] = useState<any | null>(null);
  const [deleteBankTarget, setDeleteBankTarget] = useState<any | null>(null);

  const [newBank, setNewBank] = useState({
    name: '',
    code: '',
    minROI: 8.5,
    maxROI: 12.0,
    processingFee: '0.50% + GST',
    averageTAT: 4,
    rmName: '',
    rmPhone: '',
    rmEmail: '',
    active: true,
  });

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/banks');
      if (!res.ok) throw new Error(`HTTP ${res.status}: Unable to fetch banks`);
      const data = await res.json();
      if (Array.isArray(data)) setBanks(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to connect to the bank directory service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBank = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!newBank.name.trim() || !newBank.code.trim()) {
      setErrorMsg('Bank name and code are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/banks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBank),
      });

      if (res.ok) {
        setSuccessMsg(`Bank partner "${newBank.name}" added successfully.`);
        setIsAddModalOpen(false);
        setNewBank({
          name: '',
          code: '',
          minROI: 8.5,
          maxROI: 12.0,
          processingFee: '0.50% + GST',
          averageTAT: 4,
          rmName: '',
          rmPhone: '',
          rmEmail: '',
          active: true,
        });
        fetchBanks();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to create bank.');
      }
    } catch {
      setErrorMsg('Network error: Unable to create bank partner.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBank) return;

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/banks/${editBank.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editBank),
      });

      if (res.ok) {
        setSuccessMsg(`Bank partner "${editBank.name}" updated successfully.`);
        setEditBank(null);
        fetchBanks();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update bank details.');
      }
    } catch {
      setErrorMsg('Network error: Unable to update bank details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (bankId: string, currentActive: boolean) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch(`/api/banks/${bankId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      });

      if (res.ok) {
        setSuccessMsg(`Bank partner status toggled to ${!currentActive ? 'Active' : 'Inactive'}.`);
        fetchBanks();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to toggle status.');
      }
    } catch {
      setErrorMsg('Failed to update status.');
    }
  };

  const handleDeleteBank = async () => {
    if (!deleteBankTarget) return;

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/banks/${deleteBankTarget.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccessMsg(`Bank partner "${deleteBankTarget.name}" deleted successfully.`);
        setDeleteBankTarget(null);
        fetchBanks();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to delete bank.');
      }
    } catch {
      setErrorMsg('Network error: Failed to delete bank.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setSortBy('name-asc');
  };

  // Search & Filtering Logic
  const trimmedSearch = search.trim().toLowerCase();
  let filteredBanks = banks.filter((b) => {
    const matchesSearch =
      !trimmedSearch ||
      b.name.toLowerCase().includes(trimmedSearch) ||
      b.code.toLowerCase().includes(trimmedSearch) ||
      (b.rmName && b.rmName.toLowerCase().includes(trimmedSearch)) ||
      (b.rmPhone && b.rmPhone.includes(trimmedSearch));

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && (b.active ?? true)) ||
      (statusFilter === 'Inactive' && b.active === false);

    return matchesSearch && matchesStatus;
  });

  // Sorting Logic
  filteredBanks = [...filteredBanks].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'tat-asc') return (a.averageTAT || 0) - (b.averageTAT || 0);
    if (sortBy === 'tat-desc') return (b.averageTAT || 0) - (a.averageTAT || 0);
    if (sortBy === 'roi-asc') return (a.minROI || 0) - (b.minROI || 0);
    return 0;
  });

  const hasActiveFilters = search || statusFilter !== 'All' || sortBy !== 'name-asc';

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Landmark className="h-6 w-6 text-blue-600" /> Bank & NBFC Code Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage lending partner codes, processing fee slabs, turn-around time (TAT), and Relationship Managers (RMs).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchBanks} className="gap-1.5">
            <RefreshCw className="h-4 w-4" /> Refresh Directory
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" /> Add Partner Bank
          </Button>
        </div>
      </div>

      {/* Feedback Banners */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={fetchBanks} className="flex items-center gap-1 text-rose-700 underline hover:text-rose-900">
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

      {/* Toolbar & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search bank name, code, RM name, phone..."
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

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          
          {/* Status Filter */}
          <select
            className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Partners Only</option>
            <option value="Inactive">Inactive Partners</option>
          </select>

          {/* Sorting */}
          <select
            className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name-asc">Sort: Bank Name (A-Z)</option>
            <option value="name-desc">Sort: Bank Name (Z-A)</option>
            <option value="tat-asc">Sort: TAT (Fastest First)</option>
            <option value="tat-desc">Sort: TAT (Slowest First)</option>
            <option value="roi-asc">Sort: ROI (Lowest First)</option>
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}

        </div>

      </div>

      {/* Grid of Bank Cards */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-400 font-medium">
          Loading partner bank directory...
        </div>
      ) : filteredBanks.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No partner banks found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No lending partners match your search or filter criteria.'
              : 'No bank code records exist in the directory yet.'}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Reset Filters
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBanks.map((b) => {
            const isActive = b.active !== false;
            return (
              <Card
                key={b.id}
                className={`p-5 flex flex-col justify-between transition-all border ${
                  isActive ? 'border-slate-200 hover:border-blue-300 hover:shadow-md' : 'border-slate-200/60 bg-slate-50/50 opacity-80'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Code Pill & Status Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-xs tracking-tight">
                        {b.code}
                      </div>
                      <button
                        onClick={() => handleCopyCode(b.code)}
                        className="text-slate-400 hover:text-slate-600 p-1"
                        title="Copy Bank Code"
                      >
                        {copiedCode === b.code ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>

                    <button onClick={() => handleToggleStatus(b.id, isActive)} title="Click to toggle status">
                      {isActive ? (
                        <Badge variant="emerald">Active Partner</Badge>
                      ) : (
                        <Badge variant="amber">Inactive</Badge>
                      )}
                    </button>
                  </div>

                  {/* Bank Title & TAT */}
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                      {b.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-semibold">
                      <Clock className="h-3.5 w-3.5 text-slate-400" /> Average TAT: <strong className="text-slate-800">{b.averageTAT || 4} Days</strong>
                    </p>
                  </div>

                  {/* Key Metrics Box */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">ROI Range:</span>
                      <span className="font-extrabold text-emerald-700">{b.minROI || 8.5}% - {b.maxROI || 12.0}%</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-200/60 pt-1.5">
                      <span className="text-slate-500 font-medium">Processing Fee:</span>
                      <span className="font-bold text-slate-800">{b.processingFee || '0.50% + GST'}</span>
                    </div>
                  </div>

                  {/* Relationship Manager Contact Box */}
                  <div className="p-3 rounded-lg bg-blue-50/40 border border-blue-100 text-xs space-y-1">
                    <p className="font-bold text-slate-900 flex items-center justify-between">
                      <span>RM: {b.rmName || 'Assigned Officer'}</span>
                      <UserCheck className="h-3.5 w-3.5 text-blue-600" />
                    </p>
                    {b.rmPhone && (
                      <p className="text-slate-600 flex items-center gap-1.5 font-medium">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <a href={`tel:${b.rmPhone}`} className="hover:text-blue-600 hover:underline">
                          {b.rmPhone}
                        </a>
                      </p>
                    )}
                    {b.rmEmail && (
                      <p className="text-slate-500 flex items-center gap-1.5 truncate">
                        <Mail className="h-3 w-3 text-slate-400" />
                        <a href={`mailto:${b.rmEmail}`} className="hover:text-blue-600 hover:underline truncate">
                          {b.rmEmail}
                        </a>
                      </p>
                    )}
                  </div>

                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setViewBank(b)}
                    className="font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Details
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditBank(b)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100"
                      title="Edit Bank Code"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteBankTarget(b)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete Partner Bank"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </Card>
            );
          })}
        </div>
      )}

      {/* View Bank Details Modal */}
      {viewBank && (
        <Modal isOpen={!!viewBank} onClose={() => setViewBank(null)} title={`${viewBank.name} (${viewBank.code})`}>
          <div className="space-y-4 text-xs">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Partner Code:</span>
                <span className="font-bold text-slate-900">{viewBank.code}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Average Turn-around Time (TAT):</span>
                <span className="font-bold text-slate-900">{viewBank.averageTAT || 4} Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Annualized Interest Rate (ROI):</span>
                <span className="font-extrabold text-emerald-700">{viewBank.minROI}% - {viewBank.maxROI}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Processing Fee Slab:</span>
                <span className="font-bold text-slate-900">{viewBank.processingFee}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase text-[11px]">Relationship Officer (RM) Information</h4>
              <p><strong className="text-slate-700">Name:</strong> {viewBank.rmName || 'Not Assigned'}</p>
              <p><strong className="text-slate-700">Phone:</strong> {viewBank.rmPhone || 'N/A'}</p>
              <p><strong className="text-slate-700">Email:</strong> {viewBank.rmEmail || 'N/A'}</p>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setViewBank(null)}>
                Close Window
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Bank Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => !isSubmitting && setIsAddModalOpen(false)} title="Add Partner Bank / NBFC">
        <form onSubmit={handleCreateBank} className="space-y-4 text-xs">
          <Input
            label="Bank / NBFC Name *"
            placeholder="e.g. Axis Bank, Bajaj Finance"
            value={newBank.name}
            onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Bank Code *"
              placeholder="e.g. AXIS"
              value={newBank.code}
              onChange={(e) => setNewBank({ ...newBank, code: e.target.value.toUpperCase() })}
              required
            />
            <Input
              label="Average TAT (Days)"
              type="number"
              value={newBank.averageTAT}
              onChange={(e) => setNewBank({ ...newBank, averageTAT: parseInt(e.target.value) || 4 })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Min ROI (%)"
              type="number"
              step="0.1"
              value={newBank.minROI}
              onChange={(e) => setNewBank({ ...newBank, minROI: parseFloat(e.target.value) || 8.5 })}
            />
            <Input
              label="Max ROI (%)"
              type="number"
              step="0.1"
              value={newBank.maxROI}
              onChange={(e) => setNewBank({ ...newBank, maxROI: parseFloat(e.target.value) || 12.0 })}
            />
          </div>

          <Input
            label="Processing Fee Slab"
            placeholder="0.50% + GST"
            value={newBank.processingFee}
            onChange={(e) => setNewBank({ ...newBank, processingFee: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="RM Name"
              placeholder="e.g. Neha Kapoor"
              value={newBank.rmName}
              onChange={(e) => setNewBank({ ...newBank, rmName: e.target.value })}
            />
            <Input
              label="RM Phone"
              placeholder="+91 98765 43210"
              value={newBank.rmPhone}
              onChange={(e) => setNewBank({ ...newBank, rmPhone: e.target.value })}
            />
          </div>

          <Input
            label="RM Email"
            type="email"
            placeholder="neha@axisbank.com"
            value={newBank.rmEmail}
            onChange={(e) => setNewBank({ ...newBank, rmEmail: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isSubmitting}>
              Add Bank Code Record
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Bank Modal */}
      {editBank && (
        <Modal isOpen={!!editBank} onClose={() => !isSubmitting && setEditBank(null)} title={`Edit ${editBank.name}`}>
          <form onSubmit={handleUpdateBank} className="space-y-4 text-xs">
            <Input
              label="Bank / NBFC Name *"
              value={editBank.name}
              onChange={(e) => setEditBank({ ...editBank, name: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Bank Code *"
                value={editBank.code}
                onChange={(e) => setEditBank({ ...editBank, code: e.target.value.toUpperCase() })}
                required
              />
              <Input
                label="Average TAT (Days)"
                type="number"
                value={editBank.averageTAT || 4}
                onChange={(e) => setEditBank({ ...editBank, averageTAT: parseInt(e.target.value) || 4 })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Min ROI (%)"
                type="number"
                step="0.1"
                value={editBank.minROI || 8.5}
                onChange={(e) => setEditBank({ ...editBank, minROI: parseFloat(e.target.value) || 8.5 })}
              />
              <Input
                label="Max ROI (%)"
                type="number"
                step="0.1"
                value={editBank.maxROI || 12.0}
                onChange={(e) => setEditBank({ ...editBank, maxROI: parseFloat(e.target.value) || 12.0 })}
              />
            </div>

            <Input
              label="Processing Fee Slab"
              value={editBank.processingFee || ''}
              onChange={(e) => setEditBank({ ...editBank, processingFee: e.target.value })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="RM Name"
                value={editBank.rmName || ''}
                onChange={(e) => setEditBank({ ...editBank, rmName: e.target.value })}
              />
              <Input
                label="RM Phone"
                value={editBank.rmPhone || ''}
                onChange={(e) => setEditBank({ ...editBank, rmPhone: e.target.value })}
              />
            </div>

            <Input
              label="RM Email"
              type="email"
              value={editBank.rmEmail || ''}
              onChange={(e) => setEditBank({ ...editBank, rmEmail: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditBank(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isSubmitting}>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Bank Confirmation Modal */}
      {deleteBankTarget && (
        <Modal isOpen={!!deleteBankTarget} onClose={() => !isSubmitting && setDeleteBankTarget(null)} title="Delete Bank Partner?">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to delete bank record <strong className="text-slate-900">{deleteBankTarget.name}</strong> ({deleteBankTarget.code})?
            </p>
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>This action cannot be undone.</span>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setDeleteBankTarget(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="button" variant="danger" size="sm" onClick={handleDeleteBank} isLoading={isSubmitting} disabled={isSubmitting}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

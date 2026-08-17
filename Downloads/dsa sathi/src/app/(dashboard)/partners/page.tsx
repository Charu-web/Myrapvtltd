'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  Plus,
  Phone,
  Mail,
  MapPin,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Download,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  X,
  Building,
  Award,
  DollarSign,
  Briefcase,
} from 'lucide-react';

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editPartner, setEditPartner] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  const [newPartner, setNewPartner] = useState({
    name: '',
    type: 'Sub-DSA',
    phone: '',
    email: '',
    city: 'Delhi NCR',
    commissionRate: 70,
    status: 'Active',
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/partners');
      if (!res.ok) throw new Error(`HTTP ${res.status}: Unable to fetch partner directory`);
      const data = await res.json();
      if (Array.isArray(data)) setPartners(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to connect to the partner directory service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!newPartner.name.trim() || !newPartner.phone.trim() || !newPartner.email.trim()) {
      setErrorMsg('Partner name, phone, and email are required.');
      return;
    }

    if (newPartner.commissionRate < 0 || newPartner.commissionRate > 100) {
      setErrorMsg('Commission share must be between 0% and 100%.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPartner),
      });

      if (res.ok) {
        setSuccessMsg(`Partner "${newPartner.name}" registered successfully.`);
        setIsAddModalOpen(false);
        setNewPartner({
          name: '',
          type: 'Sub-DSA',
          phone: '',
          email: '',
          city: 'Delhi NCR',
          commissionRate: 70,
          status: 'Active',
        });
        fetchPartners();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to create partner.');
      }
    } catch {
      setErrorMsg('Network error: Unable to register partner.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPartner) return;

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/partners/${editPartner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPartner),
      });

      if (res.ok) {
        setSuccessMsg(`Partner "${editPartner.name}" updated successfully.`);
        setEditPartner(null);
        fetchPartners();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update partner details.');
      }
    } catch {
      setErrorMsg('Network error: Unable to update partner details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (partnerId: string, newStatus: string) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch(`/api/partners/${partnerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setSuccessMsg(`Partner status updated to ${newStatus}.`);
        fetchPartners();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update status.');
      }
    } catch {
      setErrorMsg('Failed to update partner status.');
    }
  };

  const handleDeletePartner = async () => {
    if (!deleteTarget) return;

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/partners/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccessMsg(`Partner "${deleteTarget.name}" deleted successfully.`);
        setDeleteTarget(null);
        fetchPartners();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to delete partner.');
      }
    } catch {
      setErrorMsg('Network error: Failed to delete partner.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('All');
    setStatusFilter('All');
    setSortBy('name-asc');
  };

  const exportCSV = () => {
    const headers = [
      'Partner Code',
      'Name',
      'Type',
      'Phone',
      'Email',
      'City',
      'Commission Share (%)',
      'Total Applications',
      'Total Disbursed (INR)',
      'Total Earned (INR)',
      'Status',
    ];
    const rows = filtered.map((p) => [
      p.partnerCode,
      `"${p.name}"`,
      `"${p.type}"`,
      `"${p.phone}"`,
      `"${p.email}"`,
      `"${p.city || ''}"`,
      p.commissionRate,
      p._count?.applications || p.totalLeads || 0,
      p.totalDisbursed || 0,
      p.totalEarned || 0,
      `"${p.status || 'Active'}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LoanPilot_SubDSA_Partners_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Search & Filter Logic
  const trimmedSearch = search.trim().toLowerCase();
  let filtered = partners.filter((p) => {
    const matchesSearch =
      !trimmedSearch ||
      p.name.toLowerCase().includes(trimmedSearch) ||
      p.partnerCode.toLowerCase().includes(trimmedSearch) ||
      p.phone.includes(trimmedSearch) ||
      p.email.toLowerCase().includes(trimmedSearch) ||
      (p.city && p.city.toLowerCase().includes(trimmedSearch));

    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || (p.status || 'Active') === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Sorting Logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'apps-desc') return (b._count?.applications || b.totalLeads || 0) - (a._count?.applications || a.totalLeads || 0);
    if (sortBy === 'comm-desc') return (b.commissionRate || 0) - (a.commissionRate || 0);
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  // Summary Card Statistics from real data
  const totalPartners = partners.length;
  const activePartners = partners.filter((p) => (p.status || 'Active') === 'Active').length;
  const totalApplications = partners.reduce((s, p) => s + (p._count?.applications || p.totalLeads || 0), 0);
  const totalPartnerPayouts = partners.reduce((s, p) => s + (p.totalEarned || 0), 0);

  const hasActiveFilters = search || typeFilter !== 'All' || statusFilter !== 'All' || sortBy !== 'name-asc';
  const partnerTypes = ['Sub-DSA', 'Referral Partner', 'Connector', 'Franchise'];
  const statusOptions = ['Active', 'Inactive', 'Suspended'];

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600" /> Sub-DSA & Partner Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage partner network, affiliate profiles, referral connectors, and commission payout splits.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" /> Add Partner
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
          <button onClick={fetchPartners} className="flex items-center gap-1 text-rose-700 underline hover:text-rose-900">
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

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-white to-purple-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Partners</span>
            <Users className="h-4 w-4 text-purple-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{totalPartners}</h3>
          <p className="text-xs text-purple-600 font-semibold mt-1">Network Capacity</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-emerald-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Partners</span>
            <Award className="h-4 w-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-emerald-700 mt-2">{activePartners}</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Currently Onboarded</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-blue-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Applications</span>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{totalApplications}</h3>
          <p className="text-xs text-blue-600 font-semibold mt-1">Files Originated</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-amber-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Partner Payouts</span>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-amber-700 mt-2">{formatCurrency(totalPartnerPayouts)}</h3>
          <p className="text-xs text-amber-600 font-semibold mt-1">Total Distributed</p>
        </Card>
      </div>

      {/* Toolbar & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search partner name, ID, phone, email..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-600 focus:outline-none transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            
            {/* Category Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-purple-600 focus:outline-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {partnerTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-purple-600 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {statusOptions.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            {/* Sorting */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-purple-600 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">Sort: Partner Name (A-Z)</option>
              <option value="name-desc">Sort: Partner Name (Z-A)</option>
              <option value="apps-desc">Sort: Files (Most First)</option>
              <option value="comm-desc">Sort: Commission Share %</option>
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

      {/* Grid of Partner Cards */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-400 font-medium">Loading partners network...</div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No partner profiles found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No partners match your current search or filter criteria. Try resetting parameters.'
              : 'No partner records exist in the directory yet.'}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => {
            const st = p.status || 'Active';
            return (
              <Card
                key={p.id}
                className="p-6 flex flex-col justify-between hover:border-purple-300 hover:shadow-md transition-all border-slate-200"
              >
                <div className="space-y-4">
                  
                  {/* Code & Type & Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                      {p.partnerCode}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <Badge variant="blue">{p.type}</Badge>
                      <select
                        className="text-[10px] font-bold rounded border border-slate-200 bg-slate-50 py-0.5 px-1 focus:outline-none"
                        value={st}
                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Partner Name & Location */}
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">{p.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" /> {p.city || 'Delhi NCR'}
                    </p>
                  </div>

                  {/* Statistics & Commission Split Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Commission Share:</span>
                      <span className="font-extrabold text-emerald-700">{p.commissionRate || 70}% Payout</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-200/60 pt-1.5">
                      <span className="text-slate-500 font-medium">Total Applications:</span>
                      <span className="font-bold text-slate-900">{p._count?.applications || p.totalLeads || 0} Files</span>
                    </div>
                    {p.totalDisbursed ? (
                      <div className="flex justify-between items-center border-t border-slate-200/60 pt-1.5">
                        <span className="text-slate-500 font-medium">Total Disbursed:</span>
                        <span className="font-extrabold text-slate-900">{formatCurrency(p.totalDisbursed)}</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Contact Info Box */}
                  <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                    <p className="flex items-center gap-1.5 font-medium">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <a href={`tel:${p.phone}`} className="hover:text-purple-600 hover:underline">
                        {p.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-1.5 truncate text-slate-500">
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${p.email}`} className="hover:text-purple-600 hover:underline truncate">
                        {p.email}
                      </a>
                    </p>
                  </div>

                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link href={`/partners/${p.id}`}>
                    <Button variant="outline" size="sm" className="gap-1 font-bold">
                      <Eye className="h-3.5 w-3.5 text-purple-600" /> View Profile
                    </Button>
                  </Link>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditPartner(p)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100"
                      title="Edit Partner Profile"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete Partner Record"
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

      {/* Add Partner Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => !isSubmitting && setIsAddModalOpen(false)} title="Register Sub-DSA / Partner Profile">
        <form onSubmit={handleCreatePartner} className="space-y-4 text-xs">
          <Input
            label="Partner Name / Agency *"
            placeholder="e.g. Apex Financial Solutions"
            value={newPartner.name}
            onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Phone Number *"
              placeholder="+91 98765 43210"
              value={newPartner.phone}
              onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
              required
            />
            <Input
              label="Email Address *"
              type="email"
              placeholder="partner@gmail.com"
              value={newPartner.email}
              onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Partner Category</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
                value={newPartner.type}
                onChange={(e) => setNewPartner({ ...newPartner, type: e.target.value })}
              >
                {partnerTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <Input
              label="Payout Split Share (%) *"
              type="number"
              value={newPartner.commissionRate}
              onChange={(e) => setNewPartner({ ...newPartner, commissionRate: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>

          <Input
            label="City / Operating Region"
            placeholder="e.g. Delhi NCR, Mumbai"
            value={newPartner.city}
            onChange={(e) => setNewPartner({ ...newPartner, city: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isSubmitting}>
              Register Partner Profile
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Partner Modal */}
      {editPartner && (
        <Modal isOpen={!!editPartner} onClose={() => !isSubmitting && setEditPartner(null)} title={`Edit ${editPartner.name}`}>
          <form onSubmit={handleUpdatePartner} className="space-y-4 text-xs">
            <Input
              label="Partner Name / Agency *"
              value={editPartner.name}
              onChange={(e) => setEditPartner({ ...editPartner, name: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Phone Number *"
                value={editPartner.phone}
                onChange={(e) => setEditPartner({ ...editPartner, phone: e.target.value })}
                required
              />
              <Input
                label="Email Address *"
                type="email"
                value={editPartner.email}
                onChange={(e) => setEditPartner({ ...editPartner, email: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Partner Category</label>
                <select
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
                  value={editPartner.type}
                  onChange={(e) => setEditPartner({ ...editPartner, type: e.target.value })}
                >
                  {partnerTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Payout Split Share (%) *"
                type="number"
                value={editPartner.commissionRate || 70}
                onChange={(e) => setEditPartner({ ...editPartner, commissionRate: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>

            <Input
              label="City / Operating Region"
              value={editPartner.city || ''}
              onChange={(e) => setEditPartner({ ...editPartner, city: e.target.value })}
            />

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Account Status</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
                value={editPartner.status || 'Active'}
                onChange={(e) => setEditPartner({ ...editPartner, status: e.target.value })}
              >
                {statusOptions.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditPartner(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isSubmitting}>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Partner Modal */}
      {deleteTarget && (
        <Modal isOpen={!!deleteTarget} onClose={() => !isSubmitting && setDeleteTarget(null)} title="Delete Partner Record?">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to delete partner profile <strong className="text-slate-900">{deleteTarget.name}</strong> ({deleteTarget.partnerCode})?
            </p>
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>This action cannot be undone.</span>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setDeleteTarget(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="button" variant="danger" size="sm" onClick={handleDeletePartner} isLoading={isSubmitting} disabled={isSubmitting}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import {
  FolderGit2,
  Plus,
  FileText,
  Download,
  Eye,
  Search,
  ShieldCheck,
  Filter,
  RefreshCw,
  Trash2,
  AlertCircle,
  CheckCircle2,
  X,
  FileCode,
  FileCheck2,
  Clock,
  HardDrive,
  UserCheck,
} from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewDoc, setViewDoc] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  const [newDoc, setNewDoc] = useState({
    name: '',
    type: 'PAN',
    leadId: '',
    applicationId: '',
    status: 'Verified',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const [docsRes, leadsRes, appsRes] = await Promise.all([
        fetch('/api/documents').then((r) => r.json()).catch(() => []),
        fetch('/api/leads').then((r) => r.json()).catch(() => []),
        fetch('/api/applications').then((r) => r.json()).catch(() => []),
      ]);

      if (Array.isArray(docsRes)) setDocuments(docsRes);
      if (Array.isArray(leadsRes)) setLeads(leadsRes);
      if (Array.isArray(appsRes)) setApplications(appsRes);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to connect to the document vault service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!newDoc.name.trim()) {
      setErrorMsg('Document title is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoc),
      });

      if (res.ok) {
        setSuccessMsg(`Document "${newDoc.name}" uploaded to vault successfully.`);
        setIsUploadModalOpen(false);
        setNewDoc({
          name: '',
          type: 'PAN',
          leadId: '',
          applicationId: '',
          status: 'Verified',
        });
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to upload document.');
      }
    } catch {
      setErrorMsg('Network error: Unable to upload document to vault.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (docId: string, newStatus: string) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch(`/api/documents/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setSuccessMsg(`Document status updated to ${newStatus}.`);
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update status.');
      }
    } catch {
      setErrorMsg('Failed to update document status.');
    }
  };

  const handleDeleteDocument = async () => {
    if (!deleteTarget) return;

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/documents/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccessMsg(`Document "${deleteTarget.name}" deleted successfully.`);
        setDeleteTarget(null);
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to delete document.');
      }
    } catch {
      setErrorMsg('Network error: Failed to delete document.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('All');
    setStatusFilter('All');
    setSortBy('date-desc');
  };

  const categories = ['PAN', 'Aadhaar', 'Bank Statement', 'Salary Slip', 'ITR', 'Property', 'GST', 'KYC'];
  const statusOptions = ['Verified', 'Pending', 'Rejected'];

  // Search & Filter Logic
  const trimmedSearch = search.trim().toLowerCase();
  let filtered = documents.filter((d) => {
    const matchesSearch =
      !trimmedSearch ||
      d.name.toLowerCase().includes(trimmedSearch) ||
      (d.lead?.customerName && d.lead.customerName.toLowerCase().includes(trimmedSearch)) ||
      (d.application?.applicationNumber && d.application.applicationNumber.toLowerCase().includes(trimmedSearch)) ||
      d.type.toLowerCase().includes(trimmedSearch);

    const matchesCategory = categoryFilter === 'All' || d.type === categoryFilter;
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting Logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.uploadedAt || b.createdAt || 0).getTime() - new Date(a.uploadedAt || a.createdAt || 0).getTime();
    if (sortBy === 'date-asc') return new Date(a.uploadedAt || a.createdAt || 0).getTime() - new Date(b.uploadedAt || b.createdAt || 0).getTime();
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  // KPI Calculations from active dataset
  const totalDocs = documents.length;
  const verifiedDocs = documents.filter((d) => d.status === 'Verified').length;
  const pendingDocs = documents.filter((d) => d.status === 'Pending').length;
  const storageMB = (totalDocs * 1.8).toFixed(1);

  const hasActiveFilters = search || categoryFilter !== 'All' || statusFilter !== 'All' || sortBy !== 'date-desc';

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-amber-600" /> Central Encrypted Document Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Secure S3-compatible cloud repository for customer PAN, Aadhaar, salary slips, property files, and KYC records.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchData} className="gap-1.5">
            <RefreshCw className="h-4 w-4" /> Refresh Vault
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsUploadModalOpen(true)} className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" /> Upload Document
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
          <button onClick={fetchData} className="flex items-center gap-1 text-rose-700 underline hover:text-rose-900">
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
        <Card className="p-5 bg-gradient-to-br from-white to-amber-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Documents</span>
            <FileText className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{totalDocs}</h3>
          <p className="text-xs text-amber-600 font-semibold mt-1">Encrypted Vault Records</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-emerald-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Documents</span>
            <FileCheck2 className="h-4 w-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-emerald-700 mt-2">{verifiedDocs}</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">KYC Audit Passed</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-blue-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Verification</span>
            <Clock className="h-4 w-4 text-blue-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{pendingDocs}</h3>
          <p className="text-xs text-blue-600 font-semibold mt-1">Awaiting Compliance Review</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-purple-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Storage Used</span>
            <HardDrive className="h-4 w-4 text-purple-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-purple-700 mt-2">{storageMB} MB</h3>
          <p className="text-xs text-purple-600 font-semibold mt-1">S3 AES-256 Encrypted</p>
        </Card>
      </div>

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
              placeholder="Search document name, customer, App #..."
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-600 focus:outline-none transition-colors"
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
            
            {/* Category Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-amber-600 focus:outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Document Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-amber-600 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {statusOptions.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-amber-600 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Newest Uploads First</option>
              <option value="date-asc">Oldest Uploads First</option>
              <option value="name-asc">Document Title (A-Z)</option>
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

      {/* Grid of Document Cards */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-400 font-medium">Loading encrypted document vault...</div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FolderGit2 className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No documents found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No documents match your current search or filter criteria. Try clearing parameters.'
              : 'No customer documents have been uploaded to the vault yet.'}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((d) => {
            const st = d.status || 'Verified';
            return (
              <Card
                key={d.id}
                className="p-5 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all border-slate-200"
              >
                <div className="space-y-3">
                  
                  {/* Top Bar: File Icon & Verification Status */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-bold">
                      <FileText className="h-5 w-5" />
                    </div>

                    <select
                      className="text-[10px] font-bold rounded border border-slate-200 bg-slate-50 py-0.5 px-1.5 focus:outline-none"
                      value={st}
                      onChange={(e) => handleStatusChange(d.id, e.target.value)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Document Title & Category */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 truncate" title={d.name}>
                      {d.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                      Category: <strong className="text-slate-700">{d.type}</strong> • {d.fileSize || '1.8 MB'}
                    </p>
                  </div>

                  {/* Customer / Application Association Box */}
                  {d.lead && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-0.5">
                      <p className="font-semibold text-slate-800 text-[11px] truncate">
                        Customer: {d.lead.customerName}
                      </p>
                      {d.application?.applicationNumber && (
                        <p className="text-[10px] text-blue-600 font-bold">
                          App #: {d.application.applicationNumber}
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-[10px] text-slate-400">
                    Uploaded: {formatDate(d.uploadedAt || d.createdAt)}
                  </p>

                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setViewDoc(d)}
                    className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </button>

                  <div className="flex items-center gap-1.5">
                    <a href={d.fileUrl || '#'} target="_blank" rel="noreferrer">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100" title="Download S3 File">
                        <Download className="h-4 w-4" />
                      </button>
                    </a>
                    <button
                      onClick={() => setDeleteTarget(d)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete Document Record"
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

      {/* View Document Preview / Metadata Modal */}
      {viewDoc && (
        <Modal isOpen={!!viewDoc} onClose={() => setViewDoc(null)} title={`Vault Document - ${viewDoc.name}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Document Title:</span>
                <span className="font-bold text-slate-900">{viewDoc.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Category:</span>
                <span className="font-bold text-slate-900">{viewDoc.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">File Size:</span>
                <span className="font-semibold text-slate-700">{viewDoc.fileSize || '1.8 MB'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Uploaded On:</span>
                <span className="font-medium text-slate-700">{formatDate(viewDoc.uploadedAt || viewDoc.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                <span className="text-slate-500">Encryption Method:</span>
                <span className="font-extrabold text-amber-700">AES-256 S3 Cloud Storage</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <a href={viewDoc.fileUrl || '#'} target="_blank" rel="noreferrer">
                <Button variant="primary" size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" /> Download Secure File
                </Button>
              </a>
              <Button variant="outline" size="sm" onClick={() => setViewDoc(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Document Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => !isSubmitting && setIsUploadModalOpen(false)} title="Upload Document to Vault">
        <form onSubmit={handleUpload} className="space-y-4 text-xs">
          <Input
            label="Document Title *"
            placeholder="e.g. Rajesh_Kumar_PAN_Card.pdf"
            value={newDoc.name}
            onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
            required
          />

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase">Document Category *</label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
              value={newDoc.type}
              onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Link Customer Lead</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
                value={newDoc.leadId}
                onChange={(e) => setNewDoc({ ...newDoc, leadId: e.target.value })}
              >
                <option value="">-- Optional Lead Link --</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>{l.leadId} - {l.customerName}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Link Loan Application</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
                value={newDoc.applicationId}
                onChange={(e) => setNewDoc({ ...newDoc, applicationId: e.target.value })}
              >
                <option value="">-- Optional App Link --</option>
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>{app.applicationNumber}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center cursor-pointer hover:border-amber-500 transition-colors">
            <FolderGit2 className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800">Click or drag PDF/Image file to upload</p>
            <p className="text-[10px] text-slate-400 mt-1">Simulates secure presigned AES-256 S3 cloud vault storage</p>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isSubmitting}>
              Upload to S3 Vault
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Document Confirmation Modal */}
      {deleteTarget && (
        <Modal isOpen={!!deleteTarget} onClose={() => !isSubmitting && setDeleteTarget(null)} title="Delete Vault Document?">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to permanently delete document <strong className="text-slate-900">{deleteTarget.name}</strong>?
            </p>
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>This action cannot be undone. Cloud S3 file storage will be unlinked.</span>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setDeleteTarget(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="button" variant="danger" size="sm" onClick={handleDeleteDocument} isLoading={isSubmitting} disabled={isSubmitting}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

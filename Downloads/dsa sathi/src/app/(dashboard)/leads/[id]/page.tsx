'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  FileCheck,
  Calendar,
  User,
  MapPin,
  Building,
  Plus,
  CheckCircle2,
  FileText,
  Clock,
} from 'lucide-react';

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [lead, setLead] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [appModalOpen, setAppModalOpen] = useState(false);

  const [newApp, setNewApp] = useState({
    bankId: '',
    roi: 8.5,
    tenure: 240,
  });

  const [banks, setBanks] = useState<any[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchLeadDetail();
    fetchBanks();
  }, [id]);

  const fetchLeadDetail = async () => {
    try {
      const res = await fetch(`/api/leads/${id}`);
      const data = await res.json();
      setLead(data);
      setSelectedStatus(data.status);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBanks = async () => {
    try {
      const res = await fetch('/api/banks');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBanks(data);
        if (data.length > 0) setNewApp((prev) => ({ ...prev, bankId: data[0].id }));
      }
    } catch {
      // ignore
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selectedStatus }),
      });
      if (res.ok) {
        setStatusModalOpen(false);
        fetchLeadDetail();
      }
    } catch {
      // ignore
    }
  };

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: id,
          bankId: newApp.bankId,
          loanType: lead.loanType,
          amount: lead.amount,
          roi: newApp.roi,
          tenure: newApp.tenure,
        }),
      });

      if (res.ok) {
        setAppModalOpen(false);
        fetchLeadDetail();
      }
    } catch {
      // ignore
    }
  };

  if (isLoading) return <div className="p-12 text-center text-xs text-slate-500">Loading lead details...</div>;
  if (!lead) return <div className="p-12 text-center text-xs text-rose-500">Lead not found.</div>;

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/leads">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" /> Back to Leads
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{lead.customerName}</h1>
              <Badge statusText={lead.status} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Lead ID: <span className="font-bold text-blue-600">{lead.leadId}</span> • Created {formatDate(lead.createdDate)}
            </p>
          </div>
        </div>

        {/* Quick Launcher Buttons */}
        <div className="flex items-center gap-2">
          <a href={`tel:${lead.phone}`}>
            <Button variant="outline" size="sm" className="gap-1.5 text-emerald-700 border-emerald-300 bg-emerald-50">
              <Phone className="h-4 w-4" /> Call Customer
            </Button>
          </a>
          <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5 text-emerald-700 border-emerald-300 bg-emerald-50">
              <MessageSquare className="h-4 w-4" /> WhatsApp
            </Button>
          </a>
          <Button variant="primary" size="sm" onClick={() => setAppModalOpen(true)} className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" /> Start Application
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Details, Applications, Timeline */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Customer & Loan Profile Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Loan Requirement Summary</h3>
              <Button variant="ghost" size="sm" onClick={() => setStatusModalOpen(true)}>
                Edit Status
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Loan Type</span>
                <span className="font-bold text-slate-900">{lead.loanType}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Requested Amount</span>
                <span className="font-extrabold text-blue-600 text-sm">{formatCurrency(lead.amount)}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">City</span>
                <span className="font-semibold text-slate-800">{lead.city || 'Delhi NCR'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Source</span>
                <span className="font-semibold text-slate-800">{lead.source}</span>
              </div>
            </div>

            {lead.notes && (
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                <span className="font-bold text-slate-800 block mb-1">Notes:</span>
                {lead.notes}
              </div>
            )}
          </Card>

          {/* Linked Loan Applications */}
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Bank Applications ({lead.applications?.length || 0})</h3>
              <Button variant="outline" size="sm" onClick={() => setAppModalOpen(true)}>
                + New Application
              </Button>
            </div>

            {lead.applications?.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No active bank applications started for this lead yet.</p>
            ) : (
              <div className="space-y-3">
                {lead.applications?.map((app: any) => (
                  <div key={app.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-600">{app.applicationNumber}</span>
                        <Badge statusText={app.status} />
                      </div>
                      <p className="text-xs font-bold text-slate-900 mt-1">{app.bank?.name}</p>
                      <p className="text-[10px] text-slate-500">{formatCurrency(app.amount)} @ {app.roi}% ROI</p>
                    </div>
                    <Link href={`/applications/${app.id}`}>
                      <Button variant="ghost" size="sm">View Pipeline →</Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Activity Timeline */}
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-4 mb-4 border-b border-slate-100">
              Lead Audit Activity Log
            </h3>
            <div className="space-y-4">
              {lead.activities?.map((act: any) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">{act.title}</p>
                    <p className="text-slate-600 mt-0.5">{act.details}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{formatDate(act.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Column (4 cols): Assigned Agent, Documents, Contact info */}
        <div className="lg:col-span-4 space-y-6">
          
          <Card className="p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact & Assignee</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5">
                <User className="h-4 w-4 text-slate-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Phone</span>
                  <span className="font-bold text-slate-900">{lead.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-slate-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Assigned Relationship Manager</span>
                  <span className="font-bold text-slate-900">{lead.assignedTo?.fullName || 'Unassigned Agent'}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Uploaded Documents */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">KYC Documents ({lead.documents?.length || 0})</h3>
              <Link href="/documents" className="text-xs text-blue-600 font-bold hover:underline">
                Vault →
              </Link>
            </div>
            <div className="space-y-2">
              {lead.documents?.map((doc: any) => (
                <div key={doc.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">{doc.name}</span>
                  </div>
                  <Badge variant="emerald">Verified</Badge>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

      {/* Edit Status Modal */}
      <Modal isOpen={statusModalOpen} onClose={() => setStatusModalOpen(false)} title="Update Lead Status">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase">Select Pipeline Status</label>
            <select
              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {['New', 'Contacted', 'Interested', 'Documents Pending', 'Application Started', 'Login', 'Sanctioned', 'Disbursed', 'Rejected', 'Lost'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setStatusModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleUpdateStatus}>Save Status</Button>
          </div>
        </div>
      </Modal>

      {/* Start Application Modal */}
      <Modal isOpen={appModalOpen} onClose={() => setAppModalOpen(false)} title="Start Bank Loan Application">
        <form onSubmit={handleCreateApplication} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase">Select Bank *</label>
            <select
              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold"
              value={newApp.bankId}
              onChange={(e) => setNewApp({ ...newApp, bankId: e.target.value })}
            >
              {banks.map((b) => (
                <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Expected ROI (%) *"
              type="number"
              step="0.1"
              value={newApp.roi}
              onChange={(e) => setNewApp({ ...newApp, roi: parseFloat(e.target.value) })}
              required
            />
            <Input
              label="Tenure (Months) *"
              type="number"
              value={newApp.tenure}
              onChange={(e) => setNewApp({ ...newApp, tenure: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setAppModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create Application</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

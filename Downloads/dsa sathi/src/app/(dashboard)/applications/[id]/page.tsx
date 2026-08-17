'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, Landmark, FileCheck, CheckCircle2, AlertCircle, Clock, DollarSign } from 'lucide-react';

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [app, setApp] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchAppDetail();
  }, [id]);

  const fetchAppDetail = async () => {
    try {
      const res = await fetch(`/api/applications/${id}`);
      const data = await res.json();
      setApp(data);
      setNewStatus(data.status);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatusModalOpen(false);
        fetchAppDetail();
      }
    } catch {
      // ignore
    }
  };

  if (isLoading) return <div className="p-12 text-center text-xs text-slate-500">Loading application tracker...</div>;
  if (!app) return <div className="p-12 text-center text-xs text-rose-500">Application not found.</div>;

  const stages = ['Login', 'Processing', 'Query Raised', 'Sanctioned', 'Disbursed'];

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/applications">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" /> Back to Applications
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{app.applicationNumber}</h1>
              <Badge statusText={app.status} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Customer: <span className="font-bold text-slate-900">{app.lead?.customerName}</span> • Bank: <span className="font-bold text-blue-600">{app.bank?.name}</span>
            </p>
          </div>
        </div>
        <Button variant="primary" size="sm" onClick={() => setStatusModalOpen(true)}>
          Update Bank Status
        </Button>
      </div>

      {/* Visual Pipeline Progress Tracker */}
      <Card className="p-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Application Processing Stage</h3>
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0" />
          {stages.map((stg, idx) => {
            const isCurrent = app.status === stg;
            const isPassed = stages.indexOf(app.status) >= idx;
            return (
              <div key={stg} className="relative z-10 flex flex-col items-center gap-1.5">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : isPassed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                </div>
                <span className={`text-xs font-bold ${isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                  {stg}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-4 mb-4 border-b border-slate-100">
              Loan Application Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Sanction Amount</span>
                <span className="font-extrabold text-blue-600 text-sm">{formatCurrency(app.amount)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Interest Rate</span>
                <span className="font-bold text-emerald-600 text-sm">{app.roi}% per annum</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Tenure</span>
                <span className="font-semibold text-slate-800">{app.tenure} Months</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Bank Code</span>
                <span className="font-semibold text-slate-800">{app.bank?.code}</span>
              </div>
            </div>
          </Card>

          {/* Commission Calculation Preview */}
          <Card className="p-6 border-blue-200 bg-blue-50/30">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-blue-100">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Calculated Commission Payout</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] font-semibold uppercase">Total Bank Pay-in (1.5%)</span>
                <p className="font-extrabold text-slate-900 text-base">{formatCurrency((app.amount * 1.5) / 100)}</p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-semibold uppercase">Sub-DSA Payout (70%)</span>
                <p className="font-extrabold text-emerald-600 text-base">{formatCurrency((app.amount * 1.5 * 0.7) / 100)}</p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-semibold uppercase">Net Agency Share</span>
                <p className="font-extrabold text-blue-600 text-base">{formatCurrency((app.amount * 1.5 * 0.3) / 100)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bank RM Information</h3>
            <p className="text-xs font-bold text-slate-900">{app.bank?.rmName || 'Rajesh Sen (RM)'}</p>
            <p className="text-xs text-slate-600">{app.bank?.rmPhone || '+91 98111 00011'}</p>
            <p className="text-xs text-slate-600">{app.bank?.rmEmail || 'rm@bank.in'}</p>
          </Card>
        </div>

      </div>

      {/* Modal */}
      <Modal isOpen={statusModalOpen} onClose={() => setStatusModalOpen(false)} title="Update Application Status">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase">Select Pipeline Status</label>
            <select
              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {stages.map((stg) => (
                <option key={stg} value={stg}>{stg}</option>
              ))}
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setStatusModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleUpdateStatus}>Save Bank Status</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

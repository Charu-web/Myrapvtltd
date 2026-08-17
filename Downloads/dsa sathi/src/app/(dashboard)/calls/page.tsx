'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import {
  Phone,
  Clock,
  User,
  Search,
  Filter,
  Plus,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  AlertCircle,
  CheckCircle2,
  X,
  PhoneCall,
  PhoneForwarded,
  PhoneMissed,
  CheckCircle,
  Calendar,
  FileText,
  ListFilter,
} from 'lucide-react';

export default function CallsPage() {
  const [calls, setCalls] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [agentFilter, setAgentFilter] = useState('All');
  const [leadIdFilter, setLeadIdFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals & Note Editing
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [viewCall, setViewCall] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [editingNote, setEditingNote] = useState('');
  const [isUpdatingNote, setIsUpdatingNote] = useState(false);

  const [newCall, setNewCall] = useState({
    leadId: '',
    callType: 'OUTBOUND',
    duration: 180,
    result: 'Connected',
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const [callsRes, leadsRes] = await Promise.all([
        fetch('/api/calls').then((r) => r.json()).catch(() => []),
        fetch('/api/leads').then((r) => r.json()).catch(() => []),
      ]);

      if (Array.isArray(callsRes)) setCalls(callsRes);
      if (Array.isArray(leadsRes)) setLeads(leadsRes);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch call tracking history.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!newCall.leadId) {
      setErrorMsg('Please select a customer lead.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCall),
      });

      if (res.ok) {
        setSuccessMsg('Call log created successfully.');
        setIsLogModalOpen(false);
        setNewCall({
          leadId: '',
          callType: 'OUTBOUND',
          duration: 180,
          result: 'Connected',
          notes: '',
        });
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to log call.');
      }
    } catch {
      setErrorMsg('Network error: Unable to log call record.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateNote = async () => {
    if (!viewCall) return;

    setIsUpdatingNote(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/calls/${viewCall.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: editingNote }),
      });

      if (res.ok) {
        setSuccessMsg('Call note updated successfully.');
        setViewCall({ ...viewCall, notes: editingNote });
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to update note.');
      }
    } catch {
      setErrorMsg('Failed to update call note.');
    } finally {
      setIsUpdatingNote(false);
    }
  };

  const handleDeleteCall = async () => {
    if (!deleteTarget) return;

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/calls/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccessMsg('Call record deleted successfully.');
        setDeleteTarget(null);
        fetchData();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to delete call record.');
      }
    } catch {
      setErrorMsg('Network error: Failed to delete call record.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setOutcomeFilter('All');
    setTypeFilter('All');
    setAgentFilter('All');
    setLeadIdFilter('All');
    setSortBy('date-desc');
  };

  const exportCSV = () => {
    const headers = ['Customer Lead', 'Phone', 'Caller Agent', 'Type', 'Duration (Sec)', 'Outcome', 'Notes', 'Date'];
    const rows = filtered.map((c) => [
      `"${c.lead?.customerName || 'N/A'}"`,
      `"${c.lead?.phone || 'N/A'}"`,
      `"${c.caller?.fullName || 'System Agent'}"`,
      `"${c.callType}"`,
      c.duration,
      `"${c.result}"`,
      `"${(c.notes || '').replace(/"/g, '""')}"`,
      formatDate(c.date || c.createdAt),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LoanPilot_Call_History_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const outcomeOptions = [
    'Connected',
    'No Answer',
    'Busy',
    'Failed',
    'Interested',
    'Not Interested',
    'Callback Requested',
  ];

  // Extract list of caller agents for filter
  const callerAgents = Array.from(new Set(calls.map((c) => c.caller?.fullName).filter(Boolean)));

  // Filter & Search Logic
  const trimmedSearch = search.trim().toLowerCase();
  let filtered = calls.filter((c) => {
    const matchesSearch =
      !trimmedSearch ||
      (c.lead?.customerName && c.lead.customerName.toLowerCase().includes(trimmedSearch)) ||
      (c.lead?.phone && c.lead.phone.includes(trimmedSearch)) ||
      (c.lead?.leadId && c.lead.leadId.toLowerCase().includes(trimmedSearch)) ||
      (c.caller?.fullName && c.caller.fullName.toLowerCase().includes(trimmedSearch));

    const matchesOutcome = outcomeFilter === 'All' || c.result === outcomeFilter;
    const matchesType = typeFilter === 'All' || c.callType === typeFilter;
    const matchesAgent = agentFilter === 'All' || c.caller?.fullName === agentFilter;
    const matchesLeadId = leadIdFilter === 'All' || c.lead?.id === leadIdFilter;

    return matchesSearch && matchesOutcome && matchesType && matchesAgent && matchesLeadId;
  });

  // Sorting Logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date || b.createdAt || 0).getTime() - new Date(a.date || a.createdAt || 0).getTime();
    if (sortBy === 'date-asc') return new Date(a.date || a.createdAt || 0).getTime() - new Date(b.date || b.createdAt || 0).getTime();
    if (sortBy === 'duration-desc') return (b.duration || 0) - (a.duration || 0);
    return 0;
  });

  // Active filter count
  let activeFilterCount = 0;
  if (search) activeFilterCount++;
  if (outcomeFilter !== 'All') activeFilterCount++;
  if (typeFilter !== 'All') activeFilterCount++;
  if (agentFilter !== 'All') activeFilterCount++;
  if (leadIdFilter !== 'All') activeFilterCount++;

  // KPI Calculations from active dataset
  const totalCalls = filtered.length;
  const connectedCalls = filtered.filter((c) => c.result === 'Connected' || c.result === 'Interested').length;
  const missedCalls = filtered.filter((c) => c.result === 'No Answer' || c.result === 'Busy' || c.result === 'Failed').length;
  const totalSecs = filtered.reduce((s, c) => s + (c.duration || 0), 0);
  const talkTimeHours = Math.floor(totalSecs / 3600);
  const talkTimeMins = Math.floor((totalSecs % 3600) / 60);

  const hasActiveFilters = activeFilterCount > 0 || sortBy !== 'date-desc';

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Phone className="h-6 w-6 text-blue-600" /> Outbound Call Tracking History
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review call activities, outcomes, durations, notes, and lead interactions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
            <Download className="h-4 w-4" /> Export Calls
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsLogModalOpen(true)} className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" /> Log Call
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
        <Card className="p-5 bg-gradient-to-br from-white to-blue-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Calls Logged</span>
            <PhoneCall className="h-4 w-4 text-blue-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{totalCalls}</h3>
          <p className="text-xs text-blue-600 font-semibold mt-1">Activity Logged</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-emerald-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Connected Calls</span>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-emerald-700 mt-2">{connectedCalls}</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Successful Engagements</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-rose-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Missed / Failed</span>
            <PhoneMissed className="h-4 w-4 text-rose-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-rose-700 mt-2">{missedCalls}</h3>
          <p className="text-xs text-rose-600 font-semibold mt-1">No Answer or Busy</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-white to-purple-50/40 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Talk Time</span>
            <Clock className="h-4 w-4 text-purple-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-purple-700 mt-2">{talkTimeHours}h {talkTimeMins}m</h3>
          <p className="text-xs text-purple-600 font-semibold mt-1">Cumulative Duration</p>
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
              placeholder="Search customer, phone, lead ID, agent..."
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

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            
            {/* Outcome Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
            >
              <option value="All">All Call Outcomes</option>
              {outcomeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Call Types</option>
              <option value="OUTBOUND">Outbound</option>
              <option value="INBOUND">Inbound</option>
            </select>

            {/* Agent Filter */}
            {callerAgents.length > 0 && (
              <select
                className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
              >
                <option value="All">All Agents</option>
                {callerAgents.map((ag: any) => (
                  <option key={ag} value={ag}>{ag}</option>
                ))}
              </select>
            )}

            {/* Sort Dropdown */}
            <select
              className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="duration-desc">Longest Duration First</option>
            </select>

            {/* Active Filter Count & Clear Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                  {activeFilterCount} Active Filter{activeFilterCount > 1 ? 's' : ''}
                </span>
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <X className="h-3.5 w-3.5" /> Clear Filters
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Call History Container (Responsive Desktop Table + Mobile Card View) */}
      {isLoading ? (
        <div className="py-16 text-center text-xs text-slate-400 font-medium space-y-3">
          <RefreshCw className="h-6 w-6 animate-spin mx-auto text-blue-600" />
          <p>Loading call tracking history...</p>
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Phone className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No call records found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No call activities match your current search or filter parameters.'
              : 'No call records have been logged in the system yet.'}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
        </Card>
      ) : (
        <>
          {/* Mobile Card List View (< 768px) */}
          <div className="block md:hidden space-y-4">
            {filtered.map((c) => {
              const durationStr = `${Math.floor((c.duration || 0) / 60)}m ${(c.duration || 0) % 60}s`;
              return (
                <Card key={c.id} className="p-4 space-y-3 border-slate-200 hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">
                        {c.lead?.customerName || 'Direct Contact'}
                      </h4>
                      {c.lead?.leadId && (
                        <span className="text-[10px] text-blue-600 font-bold block">{c.lead.leadId}</span>
                      )}
                    </div>
                    <Badge statusText={c.result} />
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1">
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <a href={`tel:${c.lead?.phone || ''}`} className="font-semibold text-blue-600">
                        {c.lead?.phone || 'N/A'}
                      </a>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Agent:</span>
                      <span className="font-medium text-slate-800">{c.caller?.fullName || 'System Agent'}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Duration & Type:</span>
                      <span className="font-bold text-slate-800">{durationStr} • {c.callType || 'OUTBOUND'}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-400">Date:</span>
                      <span className="text-slate-500">{formatDate(c.date || c.createdAt)}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setViewCall(c);
                        setEditingNote(c.notes || '');
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" /> View Details
                    </button>

                    <button
                      onClick={() => setDeleteTarget(c)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Desktop Table View (>= 768px) */}
          <div className="hidden md:block">
            <Card className="p-0 overflow-hidden border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Customer / Lead</th>
                      <th className="p-3.5">Phone</th>
                      <th className="p-3.5">Caller Agent</th>
                      <th className="p-3.5">Type</th>
                      <th className="p-3.5">Duration</th>
                      <th className="p-3.5">Outcome</th>
                      <th className="p-3.5">Notes</th>
                      <th className="p-3.5">Date & Time</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {filtered.map((c) => {
                      const durationStr = `${Math.floor((c.duration || 0) / 60)}m ${(c.duration || 0) % 60}s`;
                      return (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900">
                            {c.lead?.id ? (
                              <Link href={`/leads/${c.lead.id}`} className="text-blue-600 hover:underline">
                                {c.lead.customerName} ({c.lead.leadId})
                              </Link>
                            ) : (
                              c.lead?.customerName || 'Direct Contact'
                            )}
                          </td>
                          <td className="p-3.5 text-slate-600">
                            <a href={`tel:${c.lead?.phone || ''}`} className="hover:text-blue-600 hover:underline">
                              {c.lead?.phone || 'N/A'}
                            </a>
                          </td>
                          <td className="p-3.5 font-semibold text-slate-800">
                            {c.caller?.fullName || 'System Agent'}
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                              {c.callType || 'OUTBOUND'}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-blue-600">{durationStr}</td>
                          <td className="p-3.5"><Badge statusText={c.result} /></td>
                          <td className="p-3.5 text-slate-600 max-w-xs truncate" title={c.notes}>
                            {c.notes ? (
                              <span
                                className="cursor-pointer hover:text-blue-600"
                                onClick={() => {
                                  setViewCall(c);
                                  setEditingNote(c.notes || '');
                                }}
                              >
                                {c.notes.length > 30 ? `${c.notes.substring(0, 30)}... View more` : c.notes}
                              </span>
                            ) : (
                              'No notes logged'
                            )}
                          </td>
                          <td className="p-3.5 text-slate-500">{formatDate(c.date || c.createdAt)}</td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  setViewCall(c);
                                  setEditingNote(c.notes || '');
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                                title="View Call Details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setDeleteTarget(c)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                title="Delete Call Log"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* View Call Record Details & Follow-up Modal */}
      {viewCall && (
        <Modal isOpen={!!viewCall} onClose={() => setViewCall(null)} title="Outbound Call Details">
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-bold text-slate-900">{viewCall.lead?.customerName || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Phone Number:</span>
                <a href={`tel:${viewCall.lead?.phone || ''}`} className="font-bold text-blue-600 hover:underline">
                  {viewCall.lead?.phone || 'N/A'}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Caller Agent:</span>
                <span className="font-bold text-slate-800">{viewCall.caller?.fullName || 'System Agent'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Call Type:</span>
                <span className="font-bold text-slate-800">{viewCall.callType || 'OUTBOUND'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Call Duration:</span>
                <span className="font-bold text-blue-600">{Math.floor((viewCall.duration || 0) / 60)}m {(viewCall.duration || 0) % 60}s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Outcome / Result:</span>
                <Badge statusText={viewCall.result} />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-500">Logged Timestamp:</span>
                <span className="font-medium text-slate-700">{formatDate(viewCall.date || viewCall.createdAt)}</span>
              </div>
            </div>

            {/* Interaction Notes Editor */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Edit Interaction Notes</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                value={editingNote}
                onChange={(e) => setEditingNote(e.target.value)}
                placeholder="Add call notes..."
              />
              <button
                type="button"
                onClick={handleUpdateNote}
                disabled={isUpdatingNote}
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                {isUpdatingNote ? 'Updating Note...' : 'Save Note Update'}
              </button>
            </div>

            {/* Footer Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
              <Link href="/tasks">
                <Button variant="outline" size="sm" className="gap-1 text-slate-700">
                  <Calendar className="h-4 w-4 text-blue-600" /> Schedule Task Follow-up
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                {viewCall.lead?.phone && (
                  <a href={`tel:${viewCall.lead.phone}`}>
                    <Button variant="primary" size="sm" className="gap-1.5">
                      <PhoneCall className="h-4 w-4" /> Call Again
                    </Button>
                  </a>
                )}
                <Button variant="outline" size="sm" onClick={() => setViewCall(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Log New Call Modal */}
      <Modal isOpen={isLogModalOpen} onClose={() => !isSubmitting && setIsLogModalOpen(false)} title="Log Outbound Call Interaction">
        <form onSubmit={handleLogCall} className="space-y-4 text-xs">
          
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase">Select Target Customer Lead *</label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
              value={newCall.leadId}
              onChange={(e) => setNewCall({ ...newCall, leadId: e.target.value })}
              required
            >
              <option value="">-- Choose Lead --</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>{l.leadId} - {l.customerName} ({l.phone})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Call Type</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
                value={newCall.callType}
                onChange={(e) => setNewCall({ ...newCall, callType: e.target.value })}
              >
                <option value="OUTBOUND">Outbound Call</option>
                <option value="INBOUND">Inbound Call</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Call Outcome *</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs font-semibold focus:outline-none"
                value={newCall.result}
                onChange={(e) => setNewCall({ ...newCall, result: e.target.value })}
              >
                {outcomeOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Call Duration (Seconds) *"
            type="number"
            value={newCall.duration}
            onChange={(e) => setNewCall({ ...newCall, duration: parseInt(e.target.value) || 0 })}
            required
          />

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase">Interaction Notes</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              placeholder="e.g. Discussed home loan ROI options. Customer requested callback tomorrow at 3 PM."
              value={newCall.notes}
              onChange={(e) => setNewCall({ ...newCall, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsLogModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isSubmitting}>
              Log Call Activity
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Call Log Modal */}
      {deleteTarget && (
        <Modal isOpen={!!deleteTarget} onClose={() => !isSubmitting && setDeleteTarget(null)} title="Delete Call Record?">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to delete call record for <strong className="text-slate-900">{deleteTarget.lead?.customerName || 'Lead'}</strong>?
            </p>
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>This action cannot be undone.</span>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setDeleteTarget(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="button" variant="danger" size="sm" onClick={handleDeleteCall} isLoading={isSubmitting} disabled={isSubmitting}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

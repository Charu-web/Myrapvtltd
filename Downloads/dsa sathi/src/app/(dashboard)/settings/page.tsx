'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Settings, Shield, Check, X, AlertCircle, CheckCircle2, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'company' | 'rbac' | 'billing'>('company');

  // Form State
  const [name, setName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // UI Feedback States
  const [isFetchingSettings, setIsFetchingSettings] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch initial organization settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsFetchingSettings(true);
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setName(data.name || 'LoanPilot Capital & Financial Services');
          setLegalName(data.legalName || 'LoanPilot India Private Limited');
          setEmail(data.email || 'contact@loanpilot.in');
          setPhone(data.phone || '+91 98765 43210');
        }
      }
    } catch {
      setErrorMsg('Failed to load existing organization settings.');
    } finally {
      setIsFetchingSettings(false);
    }
  };

  // Validate form fields prior to opening confirmation modal
  const handleOpenConfirmModal = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Company name is required.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Work email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Phone number is required.');
      return;
    }

    // Open confirmation popup
    setIsConfirmModalOpen(true);
  };

  // Execute Save API Request
  const handleConfirmSave = async () => {
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          legalName: legalName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg('Organization settings saved successfully.');
        setIsConfirmModalOpen(false);
        if (refreshUser) refreshUser();
      } else {
        const message = data.error || `Server error (${res.status}). Failed to save settings.`;
        setErrorMsg(message);
        setIsConfirmModalOpen(false);
      }
    } catch (err: any) {
      setErrorMsg('Network error: Unable to connect to the server. Please try again.');
      setIsConfirmModalOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const rbacMatrix = [
    { module: 'Dashboard Analytics', admin: true, sales: true, ops: true, finance: true, hr: true, partner: true, banker: true },
    { module: 'Leads Directory (All)', admin: true, sales: false, ops: true, finance: true, hr: false, partner: false, banker: false },
    { module: 'Create / Assign Lead', admin: true, sales: true, ops: true, finance: false, hr: false, partner: true, banker: false },
    { module: 'Loan Application Pipeline', admin: true, sales: true, ops: true, finance: true, hr: false, partner: true, banker: true },
    { module: 'Commission Engine & Ledger', admin: true, sales: false, ops: false, finance: true, hr: false, partner: true, banker: false },
    { module: 'Document Vault Access', admin: true, sales: true, ops: true, finance: true, hr: false, partner: true, banker: true },
    { module: 'HR & Payroll Directory', admin: true, sales: false, ops: false, finance: false, hr: true, partner: false, banker: false },
    { module: 'Bank Scheme Submissions', admin: true, sales: false, ops: true, finance: false, hr: false, partner: false, banker: true },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="h-6 w-6 text-slate-700" /> Organization Settings & RBAC Permissions
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure agency branding, role access rules, bank integrations, and billing subscription.
        </p>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'company' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Company Profile
        </button>
        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'rbac' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Role-Based Access Control (RBAC)
        </button>
      </div>

      {/* Feedback Messages */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in-50">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in-50">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {activeTab === 'company' ? (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-600" /> Agency Details & Branding
          </h3>

          {isFetchingSettings ? (
            <div className="py-12 text-center text-xs text-slate-400 font-medium">
              Loading organization details...
            </div>
          ) : (
            <form onSubmit={handleOpenConfirmModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Company Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="LoanPilot Capital & Financial Services"
                  required
                />
                <Input
                  label="Legal Entity Name"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  placeholder="LoanPilot India Private Limited"
                />
                <Input
                  label="Work Email *"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@loanpilot.in"
                  required
                />
                <Input
                  label="Phone *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSaving}
                  disabled={isSaving}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </Card>
      ) : (
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" /> Active RBAC Permission Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">Module</th>
                  <th className="p-3">Admin</th>
                  <th className="p-3">Sales Agent</th>
                  <th className="p-3">Ops</th>
                  <th className="p-3">Finance</th>
                  <th className="p-3">HR</th>
                  <th className="p-3">Partner</th>
                  <th className="p-3">Banker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {rbacMatrix.map((row) => (
                  <tr key={row.module} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{row.module}</td>
                    <td className="p-3">{row.admin ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-slate-300" />}</td>
                    <td className="p-3">{row.sales ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-slate-300" />}</td>
                    <td className="p-3">{row.ops ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-slate-300" />}</td>
                    <td className="p-3">{row.finance ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-slate-300" />}</td>
                    <td className="p-3">{row.hr ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-slate-300" />}</td>
                    <td className="p-3">{row.partner ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-slate-300" />}</td>
                    <td className="p-3">{row.banker ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-slate-300" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Save Settings Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => !isSaving && setIsConfirmModalOpen(false)}
        title="Save Organization Settings?"
        description="Are you sure you want to update the official agency profile and active RBAC permissions?"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Company Name:</span>
              <span className="font-bold text-slate-900">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Legal Name:</span>
              <span className="font-bold text-slate-900">{legalName || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Work Email:</span>
              <span className="font-bold text-blue-600">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Phone Number:</span>
              <span className="font-bold text-slate-900">{phone}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsConfirmModalOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleConfirmSave}
              isLoading={isSaving}
              disabled={isSaving}
            >
              Confirm & Save
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

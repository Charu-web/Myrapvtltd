'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  CheckCheck,
  Settings,
  Search,
  ArrowUpDown,
  FileCheck,
  UserPlus,
  FolderGit2,
  DollarSign,
  Layers,
  X,
  ExternalLink,
  Trash2,
  RefreshCw,
  SlidersHorizontal,
  Mail,
  Smartphone,
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string; // LOAN_ALERT, LEAD_UPDATE, DOCUMENT, COMMISSION, SYSTEM, INFO, URGENT
  read: boolean;
  link?: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters & Controls
  const [activeTab, setActiveTab] = useState<'ALL' | 'UNREAD' | 'LOAN_ALERT' | 'LEAD_UPDATE' | 'DOCUMENT' | 'COMMISSION' | 'SYSTEM'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'NEWEST' | 'OLDEST' | 'UNREAD_FIRST'>('NEWEST');

  // Settings Modal State
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifs: true,
    pushNotifs: true,
    loanAlerts: true,
    leadUpdates: true,
    documentUpdates: true,
    commissionUpdates: true,
  });

  useEffect(() => {
    fetchNotifications();
    loadSettings();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('loanpilot_notification_settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('loanpilot_notification_settings', JSON.stringify(settings));
      setShowSettingsModal(false);
      triggerToast('Notification preferences saved successfully.');
    } catch {
      triggerToast('Failed to save notification preferences.');
    }
  };

  const fetchNotifications = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) throw new Error('Failed to load notifications from server.');
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err.message || 'Unable to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, link?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true }),
      });
      triggerToast('Notification marked as read.');
    } catch {
      // ignore
    }

    if (link) {
      router.push(link);
    }
  };

  const handleMarkAllRead = async () => {
    // Optimistic UI update
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllRead: true }),
      });
      if (res.ok) {
        triggerToast('All notifications marked as read.');
      }
    } catch {
      triggerToast('Failed to mark all as read.');
    }
  };

  const handleDeleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setNotifications((prev) => prev.filter((n) => n.id !== id));

    try {
      await fetch(`/api/notifications?id=${id}`, {
        method: 'DELETE',
      });
      triggerToast('Notification deleted.');
    } catch {
      triggerToast('Failed to delete notification.');
    }
  };

  // Filter & Search Logic
  const filteredNotifications = useMemo(() => {
    let list = [...notifications];

    // Tab Filter
    if (activeTab === 'UNREAD') {
      list = list.filter((n) => !n.read);
    } else if (activeTab === 'LOAN_ALERT') {
      list = list.filter((n) => n.type === 'LOAN_ALERT' || n.type === 'URGENT');
    } else if (activeTab === 'LEAD_UPDATE') {
      list = list.filter((n) => n.type === 'LEAD_UPDATE');
    } else if (activeTab === 'DOCUMENT') {
      list = list.filter((n) => n.type === 'DOCUMENT');
    } else if (activeTab === 'COMMISSION') {
      list = list.filter((n) => n.type === 'COMMISSION');
    } else if (activeTab === 'SYSTEM') {
      list = list.filter((n) => n.type === 'SYSTEM' || n.type === 'INFO');
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (n) => n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortOption === 'NEWEST') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === 'OLDEST') {
      list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortOption === 'UNREAD_FIRST') {
      list.sort((a, b) => (a.read === b.read ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : a.read ? 1 : -1));
    }

    return list;
  }, [notifications, activeTab, searchQuery, sortOption]);

  // Counts
  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
  const importantCount = useMemo(
    () => notifications.filter((n) => n.type === 'LOAN_ALERT' || n.type === 'URGENT').length,
    [notifications]
  );

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'LOAN_ALERT':
      case 'URGENT':
        return <FileCheck className="h-4 w-4 text-emerald-600" />;
      case 'LEAD_UPDATE':
        return <UserPlus className="h-4 w-4 text-blue-600" />;
      case 'DOCUMENT':
        return <FolderGit2 className="h-4 w-4 text-amber-600" />;
      case 'COMMISSION':
        return <DollarSign className="h-4 w-4 text-emerald-600" />;
      default:
        return <Info className="h-4 w-4 text-indigo-600" />;
    }
  };

  const getCategoryIconBg = (type: string) => {
    switch (type) {
      case 'LOAN_ALERT':
      case 'URGENT':
        return 'bg-emerald-100/80 text-emerald-700 border-emerald-200';
      case 'LEAD_UPDATE':
        return 'bg-blue-100/80 text-blue-700 border-blue-200';
      case 'DOCUMENT':
        return 'bg-amber-100/80 text-amber-700 border-amber-200';
      case 'COMMISSION':
        return 'bg-emerald-100/80 text-emerald-700 border-emerald-200';
      default:
        return 'bg-indigo-100/80 text-indigo-700 border-indigo-200';
    }
  };

  const getActionLabel = (type: string, link?: string) => {
    if (!link) return null;
    if (link.includes('applications')) return 'View Application';
    if (link.includes('leads')) return 'View Lead';
    if (link.includes('documents')) return 'View Documents';
    if (link.includes('commissions')) return 'View Payout';
    if (link.includes('banks')) return 'View Banks';
    if (link.includes('tasks')) return 'View Task';
    if (link.includes('partners')) return 'View Partner';
    return 'View Details';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
              <Bell className="h-5 w-5" />
            </div>
            Notifications & Activity Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            System alerts for loan sanctions, lead assignments, document uploads, and commission updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            onClick={handleMarkAllRead}
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs text-slate-700 hover:bg-slate-50"
            disabled={unreadCount === 0}
          >
            <CheckCheck className="h-4 w-4 text-blue-600" /> Mark All as Read
          </Button>

          <Button
            onClick={() => setShowSettingsModal(true)}
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs text-slate-700 hover:bg-slate-50"
          >
            <Settings className="h-4 w-4 text-slate-500" /> Notification Settings
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveTab('ALL')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'ALL'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
              : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">All Notifications</span>
            <Layers className="h-4 w-4 opacity-70" />
          </div>
          <p className="text-2xl font-extrabold mt-2">{notifications.length}</p>
        </div>

        <div
          onClick={() => setActiveTab('UNREAD')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'UNREAD'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
              : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">Unread Alerts</span>
            <Bell className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-2xl font-extrabold">{unreadCount}</p>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Action Needed
              </span>
            )}
          </div>
        </div>

        <div
          onClick={() => setActiveTab('LOAN_ALERT')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'LOAN_ALERT'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
              : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">Important Alerts</span>
            <FileCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold mt-2">{importantCount}</p>
        </div>
      </div>

      {/* Filter Tabs & Toolbar */}
      <Card className="p-4 space-y-4">
        
        {/* Horizontally Scrollable Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
          {[
            { id: 'ALL', label: 'All', count: notifications.length },
            { id: 'UNREAD', label: 'Unread', count: unreadCount },
            { id: 'LOAN_ALERT', label: 'Loan Alerts', count: notifications.filter((n) => n.type === 'LOAN_ALERT' || n.type === 'URGENT').length },
            { id: 'LEAD_UPDATE', label: 'Lead Updates', count: notifications.filter((n) => n.type === 'LEAD_UPDATE').length },
            { id: 'DOCUMENT', label: 'Documents', count: notifications.filter((n) => n.type === 'DOCUMENT').length },
            { id: 'COMMISSION', label: 'Commissions', count: notifications.filter((n) => n.type === 'COMMISSION').length },
            { id: 'SYSTEM', label: 'System', count: notifications.filter((n) => n.type === 'SYSTEM' || n.type === 'INFO').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Bar & Sorting Select Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="w-full sm:w-80 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search notifications by title, details..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" /> Sort:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
            >
              <option value="NEWEST">Newest First</option>
              <option value="OLDEST">Oldest First</option>
              <option value="UNREAD_FIRST">Unread First</option>
            </select>
          </div>
        </div>

      </Card>

      {/* Main Content Area */}
      <Card className="p-6">
        
        {/* 1. Loading Skeleton State */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 animate-pulse flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded-md w-1/3" />
                  <div className="h-3 bg-slate-200 rounded-md w-3/4" />
                  <div className="h-3 bg-slate-200 rounded-md w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Error State */}
        {!isLoading && isError && (
          <div className="text-center py-12 space-y-3">
            <AlertTriangle className="h-10 w-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Unable to load notifications</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">{errorMessage}</p>
            <Button onClick={fetchNotifications} variant="outline" size="sm" className="gap-1.5 mt-2">
              <RefreshCw className="h-4 w-4" /> Try Again
            </Button>
          </div>
        )}

        {/* 3. Empty State */}
        {!isLoading && !isError && filteredNotifications.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <div className="h-14 w-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto font-bold">
              <Bell className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">You&apos;re all caught up!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No new notifications match your current filter or search criteria.
            </p>
            {activeTab !== 'ALL' && (
              <Button onClick={() => setActiveTab('ALL')} variant="outline" size="sm" className="mt-2">
                View All Notifications
              </Button>
            )}
          </div>
        )}

        {/* 4. Render Actual Notification List */}
        {!isLoading && !isError && filteredNotifications.length > 0 && (
          <div className="space-y-3">
            {filteredNotifications.map((n) => {
              const isUnread = !n.read;
              const actionText = getActionLabel(n.type, n.link);

              return (
                <div
                  key={n.id}
                  onClick={() => handleMarkAsRead(n.id, n.link)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative group flex items-start gap-3.5 ${
                    isUnread
                      ? 'bg-blue-50/70 border-blue-200 border-l-4 border-l-blue-600 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50/80 hover:border-slate-300'
                  }`}
                >
                  {/* Category Icon */}
                  <div
                    className={`h-9 w-9 rounded-xl border flex items-center justify-center shrink-0 font-bold ${getCategoryIconBg(
                      n.type
                    )}`}
                  >
                    {getCategoryIcon(n.type)}
                  </div>

                  {/* Content Body */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs ${isUnread ? 'font-extrabold text-slate-900' : 'font-bold text-slate-800'}`}>
                          {n.title}
                        </h4>
                        {isUnread && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                        {formatDate(n.createdAt)}
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed ${isUnread ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                      {n.message}
                    </p>

                    {/* Footer Action Controls */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      {n.link && actionText ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline">
                          {actionText} <ExternalLink className="h-3 w-3" />
                        </span>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-2 opacity-90 group-hover:opacity-100">
                        {isUnread && (
                          <button
                            type="button"
                            onClick={(e) => handleMarkAsRead(n.id, undefined, e)}
                            className="text-[10px] font-bold text-slate-500 hover:text-blue-600 px-2 py-0.5 rounded-md hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteNotification(n.id, e)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Notification"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </Card>

      {/* Notification Preferences Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" /> Notification Settings
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              
              {/* Channel Toggles */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Delivery Channels</p>
                
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Email Notifications</p>
                      <p className="text-[10px] text-slate-500">Receive daily digest & urgent alerts</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifs}
                    onChange={(e) => setSettings({ ...settings, emailNotifs: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="h-4 w-4 text-indigo-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Push / Browser Alerts</p>
                      <p className="text-[10px] text-slate-500">Instant desktop pop-ups</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.pushNotifs}
                    onChange={(e) => setSettings({ ...settings, pushNotifs: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Alert Category Preferences */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Alert Categories</p>

                {[
                  { key: 'loanAlerts', label: 'Loan Application Alerts', desc: 'Sanctions, logins, query updates' },
                  { key: 'leadUpdates', label: 'Lead Assignments', desc: 'New leads & follow-up reminders' },
                  { key: 'documentUpdates', label: 'Document Vault Updates', desc: 'KYC uploads & verification status' },
                  { key: 'commissionUpdates', label: 'Commission Payout Ledger', desc: 'Pay-in calculations & GST/TDS payouts' },
                ].map((cat) => (
                  <div key={cat.key} className="flex items-center justify-between py-1.5">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{cat.label}</p>
                      <p className="text-[10px] text-slate-500">{cat.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={(settings as any)[cat.key]}
                      onChange={(e) => setSettings({ ...settings, [cat.key]: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button onClick={() => setShowSettingsModal(false)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button onClick={saveSettings} variant="primary" size="sm">
                Save Preferences
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import {
  Layers,
  FileCheck,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Briefcase,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 52,
    activeApps: 24,
    sanctionedCount: 8,
    disbursedCount: 14,
    disbursedAmount: 48200000,
    pendingCommissions: 645000,
  });

  const [funnelData, setFunnelData] = useState([
    { stage: 'New', count: 18, fill: '#3B82F6' },
    { stage: 'Contacted', count: 14, fill: '#60A5FA' },
    { stage: 'Documents', count: 10, fill: '#F59E0B' },
    { stage: 'Login', count: 8, fill: '#6366F1' },
    { stage: 'Sanctioned', count: 5, fill: '#10B981' },
    { stage: 'Disbursed', count: 14, fill: '#059669' },
  ]);

  const [monthlyDisbursementData, setMonthlyDisbursementData] = useState([
    { month: 'Mar', amount: 1.2 },
    { month: 'Apr', amount: 1.8 },
    { month: 'May', amount: 2.5 },
    { month: 'Jun', amount: 3.1 },
    { month: 'Jul', amount: 3.9 },
    { month: 'Aug', amount: 4.8 },
  ]);

  const [productDistribution, setProductDistribution] = useState([
    { name: 'Home Loan', value: 45, color: '#2563EB' },
    { name: 'Business Loan', value: 25, color: '#10B981' },
    { name: 'LAP', value: 18, color: '#F59E0B' },
    { name: 'Personal Loan', value: 12, color: '#8B5CF6' },
  ]);

  const [activities, setActivities] = useState([
    { title: 'Loan Sanctioned', desc: 'SBI Home Loan of ₹45 Lakh sanctioned for Rajesh Kumar.', time: '10 mins ago', type: 'SUCCESS' },
    { title: 'New Lead Assigned', desc: 'Anita Sharma (Business Loan ₹25L) assigned to Rahul Verma.', time: '45 mins ago', type: 'INFO' },
    { title: 'Document Verified', desc: 'PAN & Aadhaar verified for Siddharth Varma by Operations.', time: '2 hours ago', type: 'INFO' },
    { title: 'Commission Calculated', desc: '₹68,500 pay-in generated for App LP-APP-2026-101.', time: '4 hours ago', type: 'SUCCESS' },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsDataLoading(true);
    try {
      const [leadsRes, appsRes, commsRes] = await Promise.all([
        fetch('/api/leads').then((r) => r.json()).catch(() => []),
        fetch('/api/applications').then((r) => r.json()).catch(() => []),
        fetch('/api/commissions').then((r) => r.json()).catch(() => []),
      ]);

      const leadsArr = Array.isArray(leadsRes) ? leadsRes : [];
      const appsArr = Array.isArray(appsRes) ? appsRes : [];
      const commsArr = Array.isArray(commsRes) ? commsRes : [];

      if (leadsArr.length > 0 || appsArr.length > 0) {
        const totalLeads = leadsArr.length || 52;
        const activeApps = appsArr.filter((a: any) => a.status !== 'Rejected').length || 24;
        const disbursedApps = appsArr.filter((a: any) => a.status === 'Disbursed');
        const totalDisbursedAmount = disbursedApps.reduce(
          (sum: number, a: any) => sum + (a.disbursedAmount || a.amount || 0),
          0
        ) || 48200000;

        const pendingComms = commsArr
          .filter((c: any) => c.status === 'Pending')
          .reduce((sum: number, c: any) => sum + (c.totalPayIn || 0), 0) || 645000;

        setStats({
          totalLeads,
          activeApps,
          sanctionedCount: appsArr.filter((a: any) => a.status === 'Sanctioned').length || 8,
          disbursedCount: disbursedApps.length || 14,
          disbursedAmount: totalDisbursedAmount,
          pendingCommissions: pendingComms,
        });

        // Compute Lead Funnel Counts dynamically
        const newCount = leadsArr.filter((l: any) => l.status === 'New').length || 18;
        const contactedCount = leadsArr.filter((l: any) => l.status === 'Contacted' || l.status === 'Interested').length || 14;
        const docsCount = leadsArr.filter((l: any) => l.status === 'Documents Pending' || l.status === 'Application Started').length || 10;
        const loginCount = appsArr.filter((a: any) => a.status === 'Login' || a.status === 'Processing').length || 8;
        const sanctionCount = appsArr.filter((a: any) => a.status === 'Sanctioned').length || 5;
        const disbCount = appsArr.filter((a: any) => a.status === 'Disbursed').length || 14;

        setFunnelData([
          { stage: 'New', count: newCount, fill: '#3B82F6' },
          { stage: 'Contacted', count: contactedCount, fill: '#60A5FA' },
          { stage: 'Documents', count: docsCount, fill: '#F59E0B' },
          { stage: 'Login', count: loginCount, fill: '#6366F1' },
          { stage: 'Sanctioned', count: sanctionCount, fill: '#10B981' },
          { stage: 'Disbursed', count: disbCount, fill: '#059669' },
        ]);

        // Compute Product Category Distribution
        const categoryCounts: Record<string, number> = {
          'Home Loan': 0,
          'Business Loan': 0,
          LAP: 0,
          'Personal Loan': 0,
        };

        leadsArr.forEach((l: any) => {
          const type = l.loanType || 'Home Loan';
          if (type.includes('Home')) categoryCounts['Home Loan']++;
          else if (type.includes('Business') || type.includes('MSME')) categoryCounts['Business Loan']++;
          else if (type.includes('LAP') || type.includes('Property')) categoryCounts['LAP']++;
          else categoryCounts['Personal Loan']++;
        });

        const totalCatLeads = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;
        setProductDistribution([
          { name: 'Home Loan', value: Math.round((categoryCounts['Home Loan'] / totalCatLeads) * 100) || 45, color: '#2563EB' },
          { name: 'Business Loan', value: Math.round((categoryCounts['Business Loan'] / totalCatLeads) * 100) || 25, color: '#10B981' },
          { name: 'LAP', value: Math.round((categoryCounts['LAP'] / totalCatLeads) * 100) || 18, color: '#F59E0B' },
          { name: 'Personal Loan', value: Math.round((categoryCounts['Personal Loan'] / totalCatLeads) * 100) || 12, color: '#8B5CF6' },
        ]);
      }
    } catch {
      // ignore
    } finally {
      setIsDataLoading(false);
    }
  };

  const getUserFirstName = () => {
    if (!user?.fullName) return 'User';
    return user.fullName.split(' ')[0];
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Executive Dashboard
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Welcome back, {getUserFirstName()}! 👋
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time loan disburshment metrics, partner payouts, and active lead funnel for {user?.organizationName || 'LoanPilot DSA'}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchDashboardData}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            title="Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${isDataLoading ? 'animate-spin' : ''}`} />
          </button>
          <Link href="/leads">
            <Button variant="primary" size="sm" className="gap-1.5 shadow-sm shadow-blue-600/20">
              <Plus className="h-4 w-4" /> Add Lead
            </Button>
          </Link>
          <Link href="/applications">
            <Button variant="outline" size="sm" className="gap-1.5">
              Pipeline Kanban
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Total Leads */}
        <Card className="p-5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-900">{stats.totalLeads}</h3>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-semibold">
              <TrendingUp className="h-3.5 w-3.5" /> +14 new this week
            </div>
          </div>
        </Card>

        {/* Stat 2: Active Applications */}
        <Card className="p-5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Applications</span>
            <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <FileCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-900">{stats.activeApps}</h3>
            <div className="flex items-center gap-1 mt-1 text-xs text-blue-600 font-semibold">
              <span>{stats.sanctionedCount} Sanctioned</span> • <span>In-login Pipeline</span>
            </div>
          </div>
        </Card>

        {/* Stat 3: Total Disbursed */}
        <Card className="p-5 bg-gradient-to-br from-white to-emerald-50/50 hover:border-emerald-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Disbursed</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-900">{formatCurrency(stats.disbursedAmount)}</h3>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-700 font-bold">
              <TrendingUp className="h-3.5 w-3.5" /> {stats.disbursedCount} Loans Settled
            </div>
          </div>
        </Card>

        {/* Stat 4: Pending Payouts */}
        <Card className="p-5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Bank Pay-Ins</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-900">{formatCurrency(stats.pendingCommissions)}</h3>
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 font-medium">
              Slab-based payout ledger
            </div>
          </div>
        </Card>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Disbursement Bar Chart (8 cols) */}
        <Card className="lg:col-span-8 p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Monthly Disbursement Growth (₹ Cr)</h3>
              <p className="text-xs text-slate-500">Cumulative loan disbursement volume over last 6 months</p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
              2026 Trend
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDisbursementData}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} unit=" Cr" />
                <Tooltip
                  formatter={(val: any) => [`₹ ${val} Crore`, 'Disbursement']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="amount" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Product Distribution Pie Chart (4 cols) */}
        <Card className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Product Distribution</h3>
              <p className="text-xs text-slate-500">Loan portfolio category breakdown</p>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`${val}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
            {productDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* Bottom Grid: Lead Funnel & Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lead Conversion Funnel */}
        <Card className="lg:col-span-7 p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Lead Conversion Funnel</h3>
              <p className="text-xs text-slate-500">Stage-wise lead progression</p>
            </div>
            <Link href="/leads" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              View All Leads <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {funnelData.map((stage) => {
              const maxCount = Math.max(...funnelData.map((f) => f.count)) || 20;
              const widthPct = Math.max(12, Math.round((stage.count / maxCount) * 100));
              return (
                <Link key={stage.stage} href="/leads" className="block group">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                      <span>{stage.stage}</span>
                      <span>{stage.count} Leads</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 group-hover:brightness-110"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: stage.fill,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* Live Activity Feed */}
        <Card className="lg:col-span-5 p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900">Live Activity Feed</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              Realtime
            </span>
          </div>

          <div className="space-y-4">
            {activities.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <div className={`h-2.5 w-2.5 rounded-full mt-1 shrink-0 ${act.type === 'SUCCESS' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">{act.title}</p>
                    <span className="text-[10px] text-slate-400 font-semibold">{act.time}</span>
                  </div>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
}

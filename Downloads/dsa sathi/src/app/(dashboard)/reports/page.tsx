'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { BarChart3, Download, TrendingUp, Landmark, Layers, RefreshCw, AlertCircle } from 'lucide-react';

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch('/api/reports');
      if (!res.ok) throw new Error('Failed to load reports');
      const json = await res.json();
      setData(json);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const csvRows = [
        ['Metric', 'Value'],
        ['Conversion Rate', `${data?.metrics?.conversionRate}%`],
        ['Total Applications', data?.metrics?.totalApplications],
        ['Total Disbursed Amount', data?.metrics?.totalDisbursedAmount],
      ];
      const csvString = csvRows.map((e) => e.join(',')).join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `LoanPilot_BI_Report_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold shrink-0">
              <BarChart3 className="h-5 w-5" />
            </div>
            Business Intelligence & Exportable Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Analyze lead conversion ratios, bank approval rates, and total disbursement performance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button onClick={fetchReports} variant="outline" size="sm" className="gap-1.5 text-xs">
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          <Button onClick={handleExportCSV} variant="primary" size="sm" className="gap-1.5 text-xs" isLoading={isExporting}>
            <Download className="h-4 w-4" /> Download CSV Export
          </Button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-5 animate-pulse space-y-3">
                <div className="h-3 bg-slate-200 rounded-md w-1/3" />
                <div className="h-6 bg-slate-200 rounded-md w-2/3" />
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="p-6 animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded-md w-1/3" />
                <div className="h-12 bg-slate-200 rounded-xl" />
                <div className="h-12 bg-slate-200 rounded-xl" />
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && isError && (
        <Card className="p-12 text-center space-y-3">
          <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Unable to generate reports</h3>
          <p className="text-xs text-slate-500">Please verify connection and try again.</p>
          <Button onClick={fetchReports} variant="outline" size="sm" className="mt-2">
            Try Again
          </Button>
        </Card>
      )}

      {/* Analytics Content */}
      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</span>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-2">{data?.metrics?.conversionRate}%</h3>
              <p className="text-xs text-slate-500 mt-1">Lead to Disbursed Ratio</p>
            </Card>

            <Card className="p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Applications</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{data?.metrics?.totalApplications}</h3>
              <p className="text-xs text-slate-500 mt-1">Across 8 Partner Banks</p>
            </Card>

            <Card className="p-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Disbursement</span>
              <h3 className="text-2xl font-extrabold text-blue-600 mt-2">
                {formatCurrency(data?.metrics?.totalDisbursedAmount || 0)}
              </h3>
              <p className="text-xs text-slate-500 mt-1">Year-to-date volume</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
                <span>Lead Source ROI Breakdown</span>
                <Layers className="h-4 w-4 text-blue-600" />
              </h3>
              <div className="space-y-3">
                {data?.leadSources?.map((ls: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900">{ls.source}</span>
                    <span className="font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {ls._count?.id || ls.count} Leads
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
                <span>Bank Sanction Volume</span>
                <Landmark className="h-4 w-4 text-emerald-600" />
              </h3>
              <div className="space-y-3">
                {data?.bankPerformance?.map((bp: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900">{bp.bankName}</span>
                    <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      {bp._count?.id || bp.count || 0} Applications
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

    </div>
  );
}

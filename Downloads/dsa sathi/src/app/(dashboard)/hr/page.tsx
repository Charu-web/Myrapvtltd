'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import {
  UserCheck,
  Users,
  Calendar,
  MapPin,
  Award,
  Search,
  RefreshCw,
  AlertCircle,
  Briefcase,
} from 'lucide-react';

export default function HRPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  useEffect(() => {
    fetchHR();
  }, []);

  const fetchHR = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch('/api/hr');
      if (!res.ok) throw new Error('Failed to fetch HR data');
      const data = await res.json();
      if (Array.isArray(data)) setEmployees(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEmployees = useMemo(() => {
    let list = [...employees];
    if (departmentFilter !== 'ALL') {
      list = list.filter((e) => e.department?.toUpperCase() === departmentFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.user?.fullName?.toLowerCase().includes(q) ||
          e.empCode?.toLowerCase().includes(q) ||
          e.designation?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [employees, departmentFilter, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">
              <UserCheck className="h-5 w-5" />
            </div>
            HR Directory, Attendance & Sales Targets
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage sales team members, check-in attendance, monthly salary slips, and monthly disbursement achievements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button onClick={fetchHR} variant="outline" size="sm" className="gap-1.5 text-xs">
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="p-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Employees</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{employees.length}</p>
          </Card>
          <Card className="p-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Present Today</span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{employees.length}</p>
          </Card>
          <Card className="p-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sales Target</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {formatCurrency(employees.reduce((sum, e) => sum + (e.targetAmount || 0), 0))}
            </p>
          </Card>
          <Card className="p-4 bg-indigo-50/50 border-indigo-200">
            <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Achieved Disbursement</span>
            <p className="text-2xl font-extrabold text-indigo-700 mt-1">
              {formatCurrency(employees.reduce((sum, e) => sum + (e.achievedAmount || 0), 0))}
            </p>
          </Card>
        </div>
      )}

      {/* Controls Bar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search employee by name, code, designation..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'SALES', 'OPERATIONS', 'FINANCE', 'HR'].map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                departmentFilter === dept
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </Card>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 space-y-4 animate-pulse">
              <div className="h-4 bg-slate-200 rounded-md w-1/3" />
              <div className="h-6 bg-slate-200 rounded-md w-2/3" />
              <div className="h-12 bg-slate-200 rounded-xl" />
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && isError && (
        <Card className="p-12 text-center space-y-3">
          <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Unable to load HR directory</h3>
          <p className="text-xs text-slate-500">Please verify connection and try again.</p>
          <Button onClick={fetchHR} variant="outline" size="sm" className="mt-2">
            Try Again
          </Button>
        </Card>
      )}

      {/* Employee Cards Grid */}
      {!isLoading && !isError && (
        <>
          {filteredEmployees.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((emp) => (
                <Card key={emp.id} className="p-6 space-y-4 hover:border-indigo-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {emp.empCode}
                    </span>
                    <Badge variant="emerald">Present Today</Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{emp.user?.fullName || 'Sales Agent'}</h3>
                    <p className="text-xs text-slate-500">{emp.designation} • {emp.department}</p>
                  </div>

                  <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Target:</span>
                      <span className="font-bold text-slate-900">{formatCurrency(emp.targetAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Achieved Disbursement:</span>
                      <span className="font-extrabold text-emerald-600">{formatCurrency(emp.achievedAmount)}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, (emp.achievedAmount / (emp.targetAmount || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                    <p className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Check-in: DLF Cyber City Office (09:15 AM)</p>
                    <p className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-amber-500" /> Salary: {formatCurrency(emp.salary)} / mo</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center text-xs text-slate-500">
              No employee records match your search or department filter.
            </Card>
          )}
        </>
      )}

    </div>
  );
}

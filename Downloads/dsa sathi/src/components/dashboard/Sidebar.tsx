'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  LayoutDashboard,
  Layers,
  FileCheck,
  Landmark,
  DollarSign,
  Users,
  FolderGit2,
  CalendarCheck,
  Phone,
  MessageSquare,
  Calculator,
  UserCheck,
  BarChart3,
  Bot,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  X,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Automatically close mobile drawer when route changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (onMobileClose) {
      onMobileClose();
    }
  }, [pathname]);

  const mainNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/leads', icon: Layers },
    { name: 'Loan Applications', href: '/applications', icon: FileCheck },
    { name: 'Banks', href: '/banks', icon: Landmark },
    { name: 'Commissions', href: '/commissions', icon: DollarSign },
    { name: 'Sub-DSA Partners', href: '/partners', icon: Users },
    { name: 'Document Vault', href: '/documents', icon: FolderGit2 },
    { name: 'Tasks', href: '/tasks', icon: CalendarCheck },
    { name: 'Call Tracking', href: '/calls', icon: Phone },
    { name: 'WhatsApp Module', href: '/whatsapp', icon: MessageSquare },
    { name: 'Accounting', href: '/accounting', icon: Calculator },
    { name: 'HR & Payroll', href: '/hr', icon: UserCheck },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
    { name: 'Bank Schemes', href: '/schemes', icon: BookOpen },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
              <ShieldCheck className="h-5 w-5" />
            </div>
            {(!collapsed || mobileOpen) && (
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight flex items-center gap-0.5">
                  Loan<span className="text-blue-500">Pilot</span>
                </span>
                <span className="block text-[9px] font-semibold uppercase tracking-widest text-slate-400 -mt-1">
                  DSA CRM v1.0
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>

          {/* Mobile Close Button */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Main Navigation List */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                )}
                title={collapsed && !mobileOpen ? item.name : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {(!collapsed || mobileOpen) && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          href="/notifications"
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors',
            pathname === '/notifications' && 'bg-slate-800 text-white'
          )}
          title={collapsed && !mobileOpen ? 'Notifications' : undefined}
        >
          <Bell className="h-4 w-4 shrink-0" />
          {(!collapsed || mobileOpen) && <span>Notifications</span>}
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          title={collapsed && !mobileOpen ? 'Logout' : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {(!collapsed || mobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex relative flex-col justify-between bg-slate-900 text-slate-300 transition-all duration-300 z-30 h-screen sticky top-0',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {navContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={onMobileClose}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 text-slate-300 shadow-2xl z-50">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}

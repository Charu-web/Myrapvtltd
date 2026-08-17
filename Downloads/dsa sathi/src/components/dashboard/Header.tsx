'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Calendar as CalendarIcon,
  LogOut,
  Building,
  Shield,
  Menu,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Moon,
  Sun,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onMobileNavToggle?: () => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type?: string;
}

export function Header({ onMobileNavToggle }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  // User Profile Dropdown State
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Calendar Popover State
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 18));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 7, 18));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);

  const seedEvents: CalendarEvent[] = [
    { id: 'ev-1', title: 'Loan document verification (HDFC)', date: '2026-08-18', type: 'DOCUMENT' },
    { id: 'ev-2', title: 'Customer follow-up with Rajesh Kumar', date: '2026-08-18', type: 'CALL' },
    { id: 'ev-3', title: 'SBI Home Loan Login Review', date: '2026-08-21', type: 'APPLICATION' },
    { id: 'ev-4', title: 'Partner payout ledger reconciliation', date: '2026-08-25', type: 'COMMISSION' },
  ];

  useEffect(() => {
    fetchTasksForCalendar();
  }, []);

  const fetchTasksForCalendar = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mappedTasks: CalendarEvent[] = data.map((t: any) => ({
            id: t.id,
            title: t.title,
            date: t.dueDate ? new Date(t.dueDate).toISOString().split('T')[0] : '2026-08-18',
            type: 'TASK',
          }));
          setEvents([...seedEvents, ...mappedTasks]);
          return;
        }
      }
      setEvents(seedEvents);
    } catch {
      setEvents(seedEvents);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setCalendarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return 'LP';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const roleLabels: Record<string, string> = {
    ADMIN: 'Admin / Owner',
    SALES_AGENT: 'Sales Agent',
    OPERATIONS: 'Operations',
    FINANCE: 'Finance',
    HR: 'HR Manager',
    PARTNER: 'Sub-DSA Partner',
    BANKER: 'Banker',
  };

  const userRoleDisplay = user?.role ? roleLabels[user.role] || user.role : 'User';

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleSelectToday = () => {
    const today = new Date(2026, 7, 18);
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const selectedDateKey = useMemo(() => {
    return formatDateKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  }, [selectedDate]);

  const selectedDateEvents = useMemo(() => {
    return events.filter((e) => e.date === selectedDateKey);
  }, [events, selectedDateKey]);

  const buttonMonthYearText = `${shortMonthNames[currentMonth]} ${currentYear}`;

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs font-sans">
      
      {/* Left Group: Mobile Menu Button + Global Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        {onMobileNavToggle && (
          <button
            onClick={onMobileNavToggle}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Drawer"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search leads, application #, customers..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 ml-2">
        
        {/* Interactive Calendar Popover Controls */}
        <div className="relative" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setCalendarOpen(!calendarOpen)}
            aria-label="Open calendar"
            aria-expanded={calendarOpen}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              calendarOpen
                ? 'bg-blue-50 text-blue-600 border-blue-300 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200/80'
            }`}
          >
            <CalendarIcon className="h-4 w-4 text-blue-600 shrink-0" />
            <span className="hidden sm:inline">{buttonMonthYearText}</span>
          </button>

          {/* Calendar Popover Drawer */}
          {calendarOpen && (
            <div className="absolute right-0 sm:-right-12 mt-2.5 w-[310px] sm:w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in-50 duration-100 text-slate-900">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  {monthNames[currentMonth]} {currentYear}
                </h4>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center text-[10px] font-extrabold text-slate-400 uppercase py-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-8" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const dateKey = formatDateKey(currentYear, currentMonth, dayNum);
                  const isToday = currentYear === 2026 && currentMonth === 7 && dayNum === 18;
                  const isSelected =
                    selectedDate.getFullYear() === currentYear &&
                    selectedDate.getMonth() === currentMonth &&
                    selectedDate.getDate() === dayNum;
                  const hasEvents = events.some((e) => e.date === dateKey);

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => setSelectedDate(new Date(currentYear, currentMonth, dayNum))}
                      className={`h-8 w-full rounded-lg font-bold flex flex-col items-center justify-center relative transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : isToday
                          ? 'bg-blue-50 text-blue-600 font-black border border-blue-200'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{dayNum}</span>
                      {hasEvents && (
                        <span
                          className={`h-1 w-1 rounded-full absolute bottom-1 ${
                            isSelected ? 'bg-white' : 'bg-blue-600'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-1 text-slate-800">
                    <Clock className="h-3.5 w-3.5 text-blue-600" />
                    {shortMonthNames[selectedDate.getMonth()]} {selectedDate.getDate()} Tasks
                  </span>
                  <span>{selectedDateEvents.length} Event(s)</span>
                </div>

                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                    {selectedDateEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] font-semibold text-slate-800 flex items-start gap-2"
                      >
                        <span className="h-2 w-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                        <span className="leading-snug truncate">{ev.title}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic py-1 text-center">
                    No scheduled tasks for {shortMonthNames[selectedDate.getMonth()]} {selectedDate.getDate()}.
                  </p>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleSelectToday}
                  className="text-xs font-bold text-blue-600 hover:underline px-2 py-1 rounded-md hover:bg-blue-50"
                >
                  Today (Aug 18)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCalendarOpen(false);
                    router.push('/tasks');
                  }}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100"
                >
                  View Calendar <ExternalLink className="h-3 w-3" />
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Global Dark Mode / Night Mode Switcher Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Night Mode'}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Night Mode'}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors focus:outline-none"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-slate-600" />
          )}
        </button>

        {/* Notifications Bell with Active Badge */}
        <Link href="/notifications" className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse" />
        </Link>

        {/* User Profile Info Dropdown Header */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3 border-l border-slate-200 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              {getInitials(user?.fullName)}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-none">{user?.fullName || 'Active User'}</p>
              <p className="text-[10px] text-blue-600 font-semibold mt-0.5">{userRoleDisplay}</p>
            </div>
          </button>

          {/* User Menu Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in-50 duration-100">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.fullName}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-flex">
                  <Building className="h-3 w-3" /> {user?.organizationName || 'LoanPilot DSA'}
                </div>
              </div>

              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Shield className="h-4 w-4 text-slate-400" /> Account Settings
              </Link>

              <button
                type="button"
                onClick={toggleTheme}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-400" />}
                {theme === 'dark' ? 'Light Mode' : 'Night Mode'}
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-100 mt-1"
              >
                <LogOut className="h-4 w-4 text-rose-500" /> Sign Out
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function getStatusBadgeClass(status: string): string {
  switch (status?.toLowerCase()) {
    case 'disbursed':
    case 'sanctioned':
    case 'approved':
    case 'verified':
    case 'completed':
    case 'present':
    case 'active':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'login':
    case 'processing':
    case 'in progress':
    case 'interested':
    case 'contacted':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'new':
    case 'draft':
    case 'pending':
    case 'documents pending':
    case 'application started':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'rejected':
    case 'lost':
    case 'overdue':
    case 'absent':
    case 'expired':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
}

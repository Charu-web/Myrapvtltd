import React from 'react';
import { cn, getStatusBadgeClass } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'status' | 'default' | 'outline' | 'blue' | 'emerald' | 'rose' | 'amber';
  statusText?: string;
}

export function Badge({ className, variant = 'status', statusText, children, ...props }: BadgeProps) {
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

  if (variant === 'status' && statusText) {
    badgeStyle = getStatusBadgeClass(statusText);
  } else if (variant === 'blue') {
    badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (variant === 'emerald') {
    badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (variant === 'rose') {
    badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (variant === 'amber') {
    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors',
        badgeStyle,
        className
      )}
      {...props}
    >
      {children || statusText}
    </span>
  );
}

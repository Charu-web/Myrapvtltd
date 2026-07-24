import React from 'react'

export default function MealCardSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-3 rounded-xl bg-white/70 p-3">
      <div className="h-14 w-14 shrink-0 rounded-lg bg-slate-200" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 w-3/4 rounded bg-slate-200" />
        <div className="h-2.5 w-full rounded bg-slate-200" />
        <div className="h-2.5 w-1/3 rounded bg-slate-200" />
      </div>
    </div>
  )
}

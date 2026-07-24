import React from 'react'

export default function PackageSkeleton() {
  return (
    <div className="animate-pulse rounded-xl bg-slate-100 p-4">
      <div className="mb-3 h-4 w-2/3 rounded bg-slate-200" />
      <div className="mb-2 h-3 w-full rounded bg-slate-200" />
      <div className="mb-4 h-3 w-4/5 rounded bg-slate-200" />
      <div className="h-3 w-1/4 rounded bg-slate-200" />
    </div>
  )
}

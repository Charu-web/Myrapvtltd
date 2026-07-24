import React from 'react'

export default function CampaignTypeSkeleton() {
  return (
    <div className="flex-1 animate-pulse rounded-xl bg-slate-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-9 w-9 rounded-lg bg-slate-200" />
        <div className="h-4 w-4 rounded-full bg-slate-200" />
      </div>
      <div className="mb-2 h-4 w-2/3 rounded bg-slate-200" />
      <div className="h-3 w-full rounded bg-slate-200" />
    </div>
  )
}

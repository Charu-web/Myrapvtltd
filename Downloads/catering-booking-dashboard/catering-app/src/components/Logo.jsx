import React from 'react'

export default function Logo() {
  return (
    <div className="flex items-center gap-2 px-4 md:px-8">
      <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="12" r="8" stroke="#3B9FE0" strokeWidth="3" />
        <circle cx="19" cy="12" r="8" stroke="#1F2430" strokeWidth="3" />
      </svg>
      <div className="leading-tight">
        <span className="block text-[13px] font-extrabold text-slate-900">Business</span>
        <span className="block text-[10px] font-medium tracking-wide text-slate-500">
          Account
        </span>
      </div>
    </div>
  )
}

import React from 'react'

/**
 * Numbered section heading used to break the meal plan form into steps
 * (e.g. "1. Plan Identity", "2. Delivery Cadence", "3. Launch Schedule").
 */
export default function SectionHeading({ number, title }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
        {number}
      </span>
      <h3 className="text-[14px] font-semibold text-slate-800">{title}</h3>
    </div>
  )
}

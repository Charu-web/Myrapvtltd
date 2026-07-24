import React from 'react'
import { motion } from 'framer-motion'
import Button from './Button.jsx'

const currency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

/**
 * Right-hand financial summary card. Purely presentational — all figures
 * are computed by the parent (CateringBooking) and passed in as props.
 */
export default function FinancialSummary({
  guestCount,
  basePrice,
  estimatedTotal,
  deposit,
  onConfirm,
  onSaveDraft,
  confirmLoading,
  draftLoading,
}) {
  return (
    <div className="rounded-xl2 bg-white p-5 shadow-card lg:sticky lg:top-6">
      <h3 className="mb-4 text-[15px] font-semibold text-slate-800">Financial Summary</h3>

      <dl className="space-y-3 text-[13.5px]">
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">Est. Guests</dt>
          <dd className="font-medium text-slate-700">{guestCount}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">Base Price</dt>
          <dd className="font-medium text-slate-700">{currency(basePrice)}</dd>
        </div>
      </dl>

      <div className="my-4 border-t border-dashed border-slate-200" />

      <div className="flex items-center justify-between">
        <span className="text-[13.5px] text-slate-500">Estimated Total</span>
        <motion.span
          key={estimatedTotal}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[17px] font-bold text-red-500"
        >
          {currency(estimatedTotal)}
        </motion.span>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-blue-50 px-3.5 py-3">
        <span className="text-[12.5px] font-medium text-slate-600">
          Deposit Required
          <br />
          (30%)
        </span>
        <motion.span
          key={deposit}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[15px] font-bold text-brand-blue"
        >
          {currency(deposit)}
        </motion.span>
      </div>

      <div className="mt-5 space-y-2.5">
        <Button variant="primary" onClick={onConfirm} loading={confirmLoading}>
          Confirm Booking
        </Button>
        <Button variant="secondary" onClick={onSaveDraft} loading={draftLoading}>
          Save as Draft
        </Button>
      </div>
    </div>
  )
}

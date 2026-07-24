import { DollarSign } from 'lucide-react'
import Card from './Card'

const formatCurrency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export default function FinancialSummary({ totals }) {
  const rows = [
    { label: 'Subtotal', value: totals.subtotal },
    { label: 'Custom Options', value: totals.customOptionsTotal },
    { label: 'Service Fee (10%)', value: totals.serviceFee },
    { label: 'Taxes (8%)', value: totals.tax },
  ]

  return (
    <Card title="Financials" icon={DollarSign}>
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{row.label}</span>
            <span className="font-medium text-gray-700">{formatCurrency(row.value)}</span>
          </div>
        ))}
      </div>

      <hr className="my-3 border-gray-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Final Total</span>
        <span className="text-lg font-bold text-gray-900">{formatCurrency(totals.grandTotal)}</span>
      </div>

      <div className="mt-4 rounded-lg bg-blue-50 px-3 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-blueDark">
          Deposit Required
        </p>
        <p className="text-xs text-gray-500">30% due upon confirmation</p>
        <p className="mt-1 text-lg font-bold text-brand-blueDark">
          {formatCurrency(totals.deposit)}
        </p>
      </div>
    </Card>
  )
}

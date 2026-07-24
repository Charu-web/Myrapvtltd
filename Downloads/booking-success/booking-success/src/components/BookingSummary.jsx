const formatCurrency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export default function BookingSummary({ booking }) {
  const items = [
    { label: 'Event Name', value: booking.eventName, align: 'left' },
    { label: 'Date & Time', value: `${booking.date} · ${booking.time}`, align: 'left' },
    { label: 'Total Value', value: formatCurrency(booking.total), align: 'right', accent: true },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-brand-panel/60 px-4 py-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className={item.align === 'right' ? 'sm:text-right' : ''}>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            {item.label}
          </p>
          <p
            className={`mt-0.5 text-sm font-semibold ${
              item.accent ? 'text-brand-blueDark' : 'text-gray-800'
            }`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}

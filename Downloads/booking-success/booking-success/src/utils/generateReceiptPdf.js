import { jsPDF } from 'jspdf'

/**
 * Generates and triggers a download of a simple booking receipt PDF.
 * Kept framework-agnostic so it can be unit tested independently of React.
 */
export function generateReceiptPdf(booking) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const marginX = 48
  let y = 64

  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Calorye Hive Business', marginX, y)

  y += 20
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100)
  doc.text('Booking Receipt', marginX, y)
  doc.setTextColor(0)

  y += 36
  doc.setDrawColor(230)
  doc.line(marginX, y, 548, y)

  y += 32
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text(`Event ID: ${booking.id}`, marginX, y)

  const rows = [
    ['Event Name', booking.eventName],
    ['Date', booking.date],
    ['Time', booking.time],
    ['Status', booking.status],
    ['Total Value', `$${booking.total.toFixed(2)}`],
  ]

  y += 28
  doc.setFontSize(11)
  rows.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(120)
    doc.text(label, marginX, y)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(20)
    doc.text(String(value), marginX + 160, y)
    y += 22
  })

  y += 20
  doc.setDrawColor(230)
  doc.line(marginX, y, 548, y)

  y += 28
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(150)
  doc.text('Thank you for booking with Calorye Hive Business.', marginX, y)

  doc.save(`receipt-${booking.id}.pdf`)
}

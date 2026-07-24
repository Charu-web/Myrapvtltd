import { useState } from 'react'
import toast from 'react-hot-toast'
import { generateReceiptPdf } from '../utils/generateReceiptPdf'

export function useDownloadReceipt(booking) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadReceipt = async () => {
    if (!booking) return
    setIsDownloading(true)
    try {
      // Simulate brief processing time so the loading state is visible.
      await new Promise((resolve) => setTimeout(resolve, 600))
      generateReceiptPdf(booking)
      toast.success('Receipt downloaded.')
    } catch {
      toast.error('Could not generate the receipt. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return { downloadReceipt, isDownloading }
}

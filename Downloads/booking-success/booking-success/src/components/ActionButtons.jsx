import { LayoutDashboard, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { useDownloadReceipt } from '../hooks/useDownloadReceipt'

export default function ActionButtons({ booking }) {
  const navigate = useNavigate()
  const { downloadReceipt, isDownloading } = useDownloadReceipt(booking)

  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/60 px-6 py-4 sm:flex-row sm:justify-end">
      <Button variant="dark" icon={LayoutDashboard} onClick={() => navigate('/dashboard')}>
        Go To Catering Dashboard
      </Button>
      <Button variant="blue" icon={Download} isLoading={isDownloading} onClick={downloadReceipt}>
        Download Receipt
      </Button>
    </div>
  )
}

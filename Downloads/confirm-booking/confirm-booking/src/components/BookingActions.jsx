import { ArrowRight } from 'lucide-react'
import Button from './Button'

export default function BookingActions({ onEdit, onConfirm, isSubmitting }) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/60 px-6 py-4">
      <Button variant="outline" onClick={onEdit} disabled={isSubmitting}>
        Edit Details
      </Button>
      <Button variant="dark" icon={ArrowRight} iconPosition="right" isLoading={isSubmitting} onClick={onConfirm}>
        Confirm &amp; Submit
      </Button>
    </div>
  )
}

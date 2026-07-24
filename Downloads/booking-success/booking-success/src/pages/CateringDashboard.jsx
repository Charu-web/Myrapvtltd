import { Link } from 'react-router-dom'
import { ChefHat } from 'lucide-react'

export default function CateringDashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-100 text-center">
      <ChefHat size={32} className="text-brand-blue" />
      <h1 className="text-xl font-bold text-gray-800">Catering Dashboard</h1>
      <p className="max-w-sm text-sm text-gray-500">
        This is a placeholder route reached from the booking confirmation screen.
      </p>
      <Link to="/booking/success" className="text-sm font-medium text-brand-blue hover:underline">
        ← Back to booking confirmation
      </Link>
    </div>
  )
}

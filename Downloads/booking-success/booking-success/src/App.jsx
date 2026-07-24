import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import BookingSuccess from './pages/BookingSuccess'
import CateringDashboard from './pages/CateringDashboard'

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <Routes>
        <Route path="/" element={<Navigate to="/booking/success" replace />} />
        <Route path="/booking/success" element={<BookingSuccess />} />
        <Route path="/dashboard" element={<CateringDashboard />} />
        <Route path="*" element={<Navigate to="/booking/success" replace />} />
      </Routes>
    </>
  )
}

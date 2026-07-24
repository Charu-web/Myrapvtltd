import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ConfirmBooking from './pages/ConfirmBooking'

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <Routes>
        <Route path="/" element={<Navigate to="/booking/confirm" replace />} />
        <Route path="/booking/confirm" element={<ConfirmBooking />} />
        <Route path="*" element={<Navigate to="/booking/confirm" replace />} />
      </Routes>
    </>
  )
}

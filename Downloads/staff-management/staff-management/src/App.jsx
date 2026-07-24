import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import StaffManagement from './pages/StaffManagement'

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <Routes>
        <Route path="/" element={<Navigate to="/staff" replace />} />
        <Route path="/staff" element={<StaffManagement />} />
        <Route path="*" element={<Navigate to="/staff" replace />} />
      </Routes>
    </>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Toaster from './components/Toaster'
import Offers from './pages/Offers'

export default function App() {
  return (
    <div className="flex min-h-screen w-full bg-[#f4f4f2]">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Navigate to="/offers" replace />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="*" element={<Navigate to="/offers" replace />} />
        </Routes>
        <Footer />
      </div>
      <Toaster />
    </div>
  )
}

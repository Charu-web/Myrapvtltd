import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { SidebarProvider } from './context/SidebarContext.jsx'
import CateringBooking from './pages/CateringBooking.jsx'

export default function App() {
  return (
    <SidebarProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3200,
          style: {
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 500,
          },
          success: {
            iconTheme: { primary: '#22C55E', secondary: '#fff' },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<CateringBooking />} />
        <Route path="/catering" element={<CateringBooking />} />
      </Routes>
    </SidebarProvider>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { BookingSuccessProvider } from './context/BookingSuccessContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookingSuccessProvider>
        <App />
      </BookingSuccessProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  const toggleSidebar = useCallback(() => setSidebarCollapsed((v) => !v), [])
  const openDrawer = useCallback(() => setMobileDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setMobileDrawerOpen(false), [])

  const pushToast = useCallback((toast) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, type: 'success', duration: 3200, ...toast }])
    return id
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      sidebarCollapsed,
      toggleSidebar,
      mobileDrawerOpen,
      openDrawer,
      closeDrawer,
      toasts,
      pushToast,
      dismissToast,
    }),
    [sidebarCollapsed, toggleSidebar, mobileDrawerOpen, openDrawer, closeDrawer, toasts, pushToast, dismissToast],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within a UIProvider')
  return ctx
}

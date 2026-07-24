import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useUI } from '../context/UIContext'

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration)
    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  const isError = toast.type === 'error'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      className="flex w-80 items-start gap-3 rounded-2xl bg-ink-900 p-4 text-white shadow-pop"
      role="status"
    >
      {isError ? (
        <XCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-red-400" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-400" />
      )}
      <div className="min-w-0">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.message && <p className="mt-0.5 text-xs text-white/60">{toast.message}</p>}
      </div>
    </motion.div>
  )
}

export default function Toaster() {
  const { toasts, dismissToast } = useUI()

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

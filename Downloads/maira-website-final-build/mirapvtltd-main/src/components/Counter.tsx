import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type CounterProps = {
  value: string
  duration?: number
  className?: string
}

export function Counter({ value = '0', duration = 1.6, className = '' }: CounterProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [displayValue, setDisplayValue] = useState(0)

  // Safe parsing of number and suffix
  const strVal = String(value || '')
  const match = strVal.match(/([0-9,.]+)\s*(.*)/)
  const targetNumber = match ? Number(String(match[1]).replace(/,/g, '')) : 0
  const suffix = match && match[2] ? match[2] : ''

  useEffect(() => {
    if (!inView || isNaN(targetNumber) || targetNumber <= 0) {
      if (inView) setDisplayValue(targetNumber)
      return
    }

    let startTimestamp: number | null = null
    const durationMs = duration * 1000

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1)
      const current = Math.floor(progress * targetNumber)
      setDisplayValue(current)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setDisplayValue(targetNumber)
      }
    }

    const animId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(animId)
  }, [inView, targetNumber, duration])

  return (
    <div ref={ref} className={`counter ${className}`.trim()} aria-live="polite">
      <strong>
        {inView ? displayValue : 0}
        {suffix}
      </strong>
    </div>
  )
}

export default Counter

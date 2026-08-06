import type { ReactNode } from 'react'

type PrimaryButtonProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function PrimaryButton({ children, className = '', onClick, href }: PrimaryButtonProps) {
  if (href) {
    return (
      <a className={`btn btn-primary ${className}`.trim()} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button className={`btn btn-primary ${className}`.trim()} onClick={onClick}>
      {children}
    </button>
  )
}

export default PrimaryButton

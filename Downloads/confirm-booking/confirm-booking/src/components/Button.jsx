import { motion } from 'framer-motion'

const variants = {
  dark: 'bg-gray-900 text-white hover:bg-black',
  blue: 'bg-brand-blue text-white hover:bg-brand-blueDark',
  outline: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  ghost: 'bg-transparent text-gray-500 hover:bg-gray-100',
}

export default function Button({
  children,
  variant = 'dark',
  className = '',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      disabled={disabled || isLoading}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        Icon && iconPosition === 'left' && <Icon size={16} />
      )}
      {children}
      {!isLoading && Icon && iconPosition === 'right' && <Icon size={16} />}
    </motion.button>
  )
}

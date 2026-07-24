import { useForm } from 'react-hook-form'
import { Percent, CalendarDays, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Input from './Input'
import Button from './Button'
import { launchDiscount } from '../services/api'
import { useUI } from '../context/UIContext'

export default function DiscountForm() {
  const { pushToast } = useUI()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { value: 20, days: 7 },
  })

  const onSubmit = async (data) => {
    try {
      await launchDiscount(data)
      pushToast({
        type: 'success',
        title: 'Promotion launched',
        message: `${data.value}% off for ${data.days} day${data.days === '1' ? '' : 's'} is now live.`,
      })
      reset({ value: 20, days: 7 })
    } catch {
      pushToast({ type: 'error', title: 'Launch failed', message: 'Please try again in a moment.' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-blue-50/80 p-6 shadow-card"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-blue-500" />
        <h3 className="font-display text-lg font-bold text-ink-900">Create New Discount</h3>
      </div>
      <p className="mt-1 text-[13px] text-ink-700/60">
        Setup flash sales or seasonal price adjustments.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Discount Value"
            icon={Percent}
            type="number"
            min={1}
            max={100}
            error={errors.value?.message}
            {...register('value', {
              required: 'Required',
              min: { value: 1, message: 'Min 1%' },
              max: { value: 100, message: 'Max 100%' },
            })}
          />
          <Input
            label="Duration (Days)"
            icon={CalendarDays}
            type="number"
            min={1}
            max={90}
            error={errors.days?.message}
            {...register('days', {
              required: 'Required',
              min: { value: 1, message: 'Min 1 day' },
              max: { value: 90, message: 'Max 90 days' },
            })}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full" loading={isSubmitting}>
          Launch Discount Promotion
        </Button>
      </form>
    </motion.div>
  )
}

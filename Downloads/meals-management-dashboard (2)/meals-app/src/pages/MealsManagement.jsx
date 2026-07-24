import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'
import MealPlanForm from '../components/MealPlanForm.jsx'
import DeliveryCalendar from '../components/DeliveryCalendar.jsx'
import ScheduleSection from '../components/ScheduleSection.jsx'
import MealSelectionPanel from '../components/MealSelectionPanel.jsx'

import { useMeals } from '../hooks/useMeals.js'
import { createMealPlan } from '../services/api.js'
import { validateMealSelection } from '../utils/validation.js'

const DEFAULT_VALUES = {
  planName: '',
  description: '',
  pricingModel: '',
  price: '',
  startDate: '',
  lifecycle: '',
}

function CreateMealPlanModal({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULT_VALUES })

  const { meals, loading: mealsLoading } = useMeals()

  const [activeDays, setActiveDays] = useState(['tue', 'wed', 'thu', 'fri'])
  const [mealsPerDay, setMealsPerDay] = useState(2)
  const [selectedMealIds, setSelectedMealIds] = useState([])
  const [dayError, setDayError] = useState(null)
  const [mealError, setMealError] = useState(null)
  const [draftLoading, setDraftLoading] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)

  const toggleDay = (key) => {
    setDayError(null)
    setActiveDays((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    )
  }

  const toggleMeal = (id) => {
    setMealError(null)
    setSelectedMealIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const buildPayload = (values) => ({
    planName: values.planName,
    description: values.description,
    pricingModel: values.pricingModel,
    price: Number(values.price) || 0,
    deliveryDays: activeDays,
    mealsPerDay,
    startDate: values.startDate,
    lifecycle: values.lifecycle,
    selectedMeals: meals.filter((m) => selectedMealIds.includes(m.id)),
  })

  const runValidation = () => {
    let valid = true
    if (activeDays.length === 0) {
      setDayError('Select at least one delivery day.')
      valid = false
    }
    const mealSelectionError = validateMealSelection(selectedMealIds)
    if (mealSelectionError) {
      setMealError(mealSelectionError)
      valid = false
    }
    return valid
  }

  const resetAll = () => {
    reset(DEFAULT_VALUES)
    setActiveDays([])
    setMealsPerDay(2)
    setSelectedMealIds([])
    setDayError(null)
    setMealError(null)
  }

  const onCancel = () => {
    resetAll()
    onClose()
  }

  const onPublish = handleSubmit(
    async (values) => {
      if (!runValidation()) return
      setPublishLoading(true)
      try {
        await createMealPlan(buildPayload(values))
        toast.success('Meal plan published!')
        resetAll()
        onClose()
      } catch (err) {
        toast.error(err.message || 'Could not publish the meal plan.')
      } finally {
        setPublishLoading(false)
      }
    },
    () => toast.error('Please fill in all required fields.')
  )

  const onSaveDraft = handleSubmit(async (values) => {
    setDraftLoading(true)
    try {
      await createMealPlan({ ...buildPayload(values), status: 'draft' })
      toast.success('Draft saved.')
    } catch (err) {
      toast.error(err.message || 'Could not save draft.')
    } finally {
      setDraftLoading(false)
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 py-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl overflow-hidden rounded-xl2 bg-white shadow-modal"
      >
        {/* Blue header */}
        <div className="flex items-start justify-between bg-gradient-to-r from-brand-blue to-brand-blueDark px-6 py-5">
          <div>
            <h2 className="text-[17px] font-bold text-white">Create New Meal Plan</h2>
            <p className="mt-0.5 max-w-md text-[12.5px] text-white/85">
              Design your recurring culinary experience. Define the structure, frequency, and
              signature dishes for your subscribers.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-white/90 transition-colors hover:bg-white/15"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_260px]">
          <div className="space-y-7">
            <MealPlanForm register={register} errors={errors} />
            <DeliveryCalendar
              activeDays={activeDays}
              onToggleDay={toggleDay}
              mealsPerDay={mealsPerDay}
              onIncrement={() => setMealsPerDay((n) => Math.min(n + 1, 6))}
              onDecrement={() => setMealsPerDay((n) => Math.max(n - 1, 1))}
              error={dayError}
            />
            <ScheduleSection register={register} errors={errors} />
          </div>

          <MealSelectionPanel
            meals={meals}
            loading={mealsLoading}
            selectedIds={selectedMealIds}
            onToggleMeal={toggleMeal}
            error={mealError}
          />
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-brand-blueLight/60 px-6 py-4">
          <button
            onClick={onCancel}
            className="text-[13px] font-medium text-slate-500 transition-colors hover:text-slate-700"
          >
            Cancel
          </button>
          <div className="flex gap-2.5">
            <Button variant="secondary" onClick={onSaveDraft} loading={draftLoading}>
              Save as Draft
            </Button>
            <Button variant="primary" onClick={onPublish} loading={publishLoading}>
              Publish Plan
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MealsManagement() {
  const [modalOpen, setModalOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-[#F4F5F7]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onCreateMealPlan={() => setModalOpen(true)} />

        <main className="flex-1 px-4 pb-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h1 className="text-[22px] font-bold text-slate-900">Meals Management</h1>
            <p className="mt-1 text-[13.5px] text-slate-500">
              Manage your meal plans and delivery schedules.
            </p>
          </motion.div>
        </main>

        <Footer />
      </div>

      <AnimatePresence>
        {modalOpen && <CreateMealPlanModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

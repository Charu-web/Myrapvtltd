import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import BookingForm from '../components/BookingForm.jsx'
import FinancialSummary from '../components/FinancialSummary.jsx'
import PackageCard from '../components/PackageCard.jsx'
import PackageSkeleton from '../components/PackageSkeleton.jsx'
import Footer from '../components/Footer.jsx'

import { usePackages } from '../hooks/usePackages.js'
import { createBooking } from '../services/api.js'
import { calculateEstimatedTotal, calculateDeposit } from '../utils/pricing.js'

export default function CateringBooking() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventName: '',
      eventType: '',
      date: '',
      time: '',
      guestCount: 150,
      venue: '',
      instructions: '',
    },
  })

  const { packages, loading: packagesLoading } = usePackages()
  const [selectedPackageId, setSelectedPackageId] = useState(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [draftLoading, setDraftLoading] = useState(false)

  const guestCount = Number(watch('guestCount')) || 0

  const selectedPackage = useMemo(
    () => packages.find((p) => p.id === selectedPackageId) || null,
    [packages, selectedPackageId]
  )

  const basePrice = selectedPackage?.price ?? 0
  const estimatedTotal = useMemo(
    () => calculateEstimatedTotal(guestCount, basePrice),
    [guestCount, basePrice]
  )
  const deposit = useMemo(() => calculateDeposit(estimatedTotal), [estimatedTotal])

  const buildPayload = (formValues) => ({
    eventName: formValues.eventName,
    eventType: formValues.eventType,
    date: formValues.date,
    time: formValues.time,
    guestCount: Number(formValues.guestCount) || 0,
    venue: formValues.venue,
    instructions: formValues.instructions,
    package: selectedPackage,
    estimatedTotal,
    deposit,
  })

  const onConfirm = handleSubmit(
    async (values) => {
      if (!selectedPackage) {
        toast.error('Please select a menu package first.')
        return
      }
      setConfirmLoading(true)
      try {
        await createBooking(buildPayload(values))
        toast.success('Booking confirmed!')
        reset()
        setSelectedPackageId(null)
      } catch (err) {
        toast.error(err.message || 'Something went wrong. Please try again.')
      } finally {
        setConfirmLoading(false)
      }
    },
    () => {
      toast.error('Please fill in all required fields.')
    }
  )

  const onSaveDraft = async () => {
    setDraftLoading(true)
    try {
      const values = watch()
      await createBooking({ ...buildPayload(values), status: 'draft' })
      toast.success('Draft saved.')
    } catch (err) {
      toast.error(err.message || 'Could not save draft.')
    } finally {
      setDraftLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F4F5F7]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 px-4 pb-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden rounded-xl2 bg-white shadow-card"
          >
            {/* Blue header */}
            <div className="flex items-start justify-between bg-gradient-to-r from-brand-blue to-brand-blueDark px-6 py-5">
              <div>
                <h1 className="text-[18px] font-bold text-white">Create New Booking</h1>
                <p className="mt-0.5 text-[13px] text-white/85">
                  Configure event details and menu selection.
                </p>
              </div>
              <button
                aria-label="Close"
                className="rounded-full p-1 text-white/90 transition-colors hover:bg-white/15"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-[1fr_280px]">
              <div className="space-y-8">
                <BookingForm register={register} errors={errors} guestCount={guestCount} />

                <section>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[13px] font-bold uppercase tracking-wide text-slate-400">
                      Menu Package
                    </h3>
                    <button className="text-[12.5px] font-medium text-brand-blue hover:underline">
                      View Custom Options
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {packagesLoading ? (
                      <>
                        <PackageSkeleton />
                        <PackageSkeleton />
                      </>
                    ) : (
                      packages.map((pkg) => (
                        <PackageCard
                          key={pkg.id}
                          pkg={pkg}
                          selected={selectedPackageId === pkg.id}
                          onSelect={setSelectedPackageId}
                        />
                      ))
                    )}
                  </div>
                </section>
              </div>

              <FinancialSummary
                guestCount={guestCount}
                basePrice={basePrice}
                estimatedTotal={estimatedTotal}
                deposit={deposit}
                onConfirm={onConfirm}
                onSaveDraft={onSaveDraft}
                confirmLoading={confirmLoading}
                draftLoading={draftLoading}
              />
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

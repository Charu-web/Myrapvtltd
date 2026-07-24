import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import CampaignTypeCard from '../components/CampaignTypeCard.jsx'
import CampaignTypeSkeleton from '../components/CampaignTypeSkeleton.jsx'
import CampaignForm from '../components/CampaignForm.jsx'
import AdPreview from '../components/AdPreview.jsx'

import { useCampaignFormats } from '../hooks/useCampaignFormats.js'
import { createCampaign } from '../services/api.js'

export default function MarketingCampaign() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { campaignName: '', campaignDescription: '' },
  })

  const { formats, loading: formatsLoading, error: formatsError } = useCampaignFormats()
  const [selectedFormatId, setSelectedFormatId] = useState(null)
  const [formatError, setFormatError] = useState(null)
  const [draftLoading, setDraftLoading] = useState(false)
  const [launchLoading, setLaunchLoading] = useState(false)

  // Default the first format to selected once formats load, matching the Figma.
  React.useEffect(() => {
    if (formats.length > 0 && selectedFormatId === null) {
      setSelectedFormatId(formats[0].id)
    }
  }, [formats, selectedFormatId])

  const campaignName = watch('campaignName')

  const selectedFormat = useMemo(
    () => formats.find((f) => f.id === selectedFormatId) || null,
    [formats, selectedFormatId]
  )

  const buildPayload = (values) => ({
    campaignName: values.campaignName,
    campaignDescription: values.campaignDescription,
    campaignType: selectedFormat?.title || null,
  })

  const onLaunch = handleSubmit(
    async (values) => {
      if (!selectedFormat) {
        setFormatError('Please select a campaign format.')
        toast.error('Please select a campaign format.')
        return
      }
      setLaunchLoading(true)
      try {
        await createCampaign(buildPayload(values))
        toast.success('Campaign launched!')
        reset()
        setSelectedFormatId(formats[0]?.id ?? null)
      } catch (err) {
        toast.error(err.message || 'Could not launch the campaign.')
      } finally {
        setLaunchLoading(false)
      }
    },
    () => toast.error('Please fill in all required fields.')
  )

  const onSaveDraft = handleSubmit(async (values) => {
    setDraftLoading(true)
    try {
      await createCampaign({ ...buildPayload(values), status: 'draft' })
      toast.success('Draft saved.')
    } catch (err) {
      toast.error(err.message || 'Could not save draft.')
    } finally {
      setDraftLoading(false)
    }
  })

  const handleSelectFormat = (id) => {
    setFormatError(null)
    setSelectedFormatId(id)
  }

  return (
    <div className="flex min-h-screen gap-2 bg-[#F4F5F7] p-2">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onSaveDraft={onSaveDraft}
          onLaunch={onLaunch}
          draftLoading={draftLoading}
          launchLoading={launchLoading}
        />

        <main className="flex-1 px-4 pb-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h1 className="text-[22px] font-bold text-slate-900">Launch Campaign</h1>
            <p className="mt-1 max-w-xl text-[13.5px] text-slate-500">
              Design and deploy targeted marketing initiatives to drive foot traffic and
              increase order volume.
            </p>
            <div className="mt-3 h-0.5 w-14 bg-slate-800" />
          </motion.div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
            <div className="space-y-6">
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
                    1
                  </span>
                  <h2 className="text-[14px] font-semibold text-slate-800">Select Format</h2>
                </div>

                {formatsError ? (
                  <p className="rounded-xl bg-red-50 p-4 text-[13px] text-red-500">
                    Couldn&apos;t load campaign formats. Please try again.
                  </p>
                ) : (
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {formatsLoading ? (
                      <>
                        <CampaignTypeSkeleton />
                        <CampaignTypeSkeleton />
                      </>
                    ) : formats.length > 0 ? (
                      formats.map((format) => (
                        <CampaignTypeCard
                          key={format.id}
                          format={format}
                          selected={selectedFormatId === format.id}
                          onSelect={handleSelectFormat}
                        />
                      ))
                    ) : (
                      <p className="text-[13px] text-slate-400">No campaign formats available.</p>
                    )}
                  </div>
                )}
                {formatError && (
                  <p className="mt-2 text-[12px] font-medium text-red-500">{formatError}</p>
                )}
              </section>

              <CampaignForm register={register} errors={errors} />
            </div>

            <AdPreview campaignName={campaignName} selectedFormat={selectedFormat} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

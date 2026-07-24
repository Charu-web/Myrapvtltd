import React from 'react'
import Input from './Input.jsx'
import TextArea from './TextArea.jsx'

/**
 * Blue "Campaign Details" information card.
 * Collects the campaign name and internal description via React Hook Form.
 */
export default function CampaignForm({ register, errors }) {
  return (
    <div className="rounded-xl2 bg-brand-blueLight p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
          i
        </span>
        <h3 className="text-[14px] font-semibold text-slate-800">Campaign Details</h3>
      </div>

      <div className="space-y-4">
        <Input
          label="Campaign Name"
          placeholder="e.g., Summer Lunch Rush Promo"
          error={errors.campaignName?.message}
          {...register('campaignName', { required: 'Campaign name is required' })}
        />
        <TextArea
          label="Description (Internal)"
          placeholder="Describe your intent."
          rows={3}
          error={errors.campaignDescription?.message}
          {...register('campaignDescription', {
            required: 'Campaign description is required',
          })}
        />
      </div>
    </div>
  )
}

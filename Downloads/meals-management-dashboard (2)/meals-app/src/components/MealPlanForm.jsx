import React from 'react'
import SectionHeading from './SectionHeading.jsx'
import Input from './Input.jsx'
import Select from './Select.jsx'
import TextArea from './TextArea.jsx'

const PRICING_MODELS = ['Weekly Subscription', 'Monthly Subscription', 'Pay As You Go']

/**
 * Section 1 — Plan Identity.
 * Collects the plan's name, subscriber-facing description, pricing model, and price.
 */
export default function MealPlanForm({ register, errors }) {
  return (
    <section>
      <SectionHeading number={1} title="Plan Identity" />

      <div className="space-y-4">
        <Input
          label="Plan Name"
          placeholder="e.g., Executive Wellness Weekly"
          error={errors.planName?.message}
          {...register('planName', { required: 'Plan name is required' })}
        />

        <TextArea
          label="Description (Subscriber View)"
          placeholder="Describe the culinary theme and dietary focus."
          rows={2}
          error={errors.description?.message}
          {...register('description', { required: 'Description is required' })}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Pricing Model"
            placeholder="Select pricing model"
            options={PRICING_MODELS}
            error={errors.pricingModel?.message}
            {...register('pricingModel', { required: 'Pricing model is required' })}
          />
          <Input
            label="Base Price ($)"
            type="number"
            min={0}
            step="0.01"
            placeholder="0.00"
            error={errors.price?.message}
            {...register('price', {
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be greater than 0' },
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
    </section>
  )
}

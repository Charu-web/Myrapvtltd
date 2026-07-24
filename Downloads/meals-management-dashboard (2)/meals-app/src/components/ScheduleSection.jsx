import React from 'react'
import SectionHeading from './SectionHeading.jsx'
import Input from './Input.jsx'
import Select from './Select.jsx'

const LIFECYCLE_OPTIONS = ['Ongoing (No end date)', 'Fixed Duration', 'Trial Period']

/**
 * Section 3 — Launch Schedule.
 * First delivery date plus the plan's lifecycle (ongoing, fixed duration, trial).
 */
export default function ScheduleSection({ register, errors }) {
  return (
    <section>
      <SectionHeading number={3} title="Launch Schedule" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First Delivery Date"
          type="date"
          error={errors.startDate?.message}
          {...register('startDate', { required: 'First delivery date is required' })}
        />
        <Select
          label="Lifecycle"
          placeholder="Select lifecycle"
          options={LIFECYCLE_OPTIONS}
          error={errors.lifecycle?.message}
          {...register('lifecycle', { required: 'Lifecycle is required' })}
        />
      </div>
    </section>
  )
}

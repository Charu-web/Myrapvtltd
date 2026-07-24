import React from 'react'
import Input from './Input.jsx'
import Select from './Select.jsx'
import TextArea from './TextArea.jsx'

const EVENT_TYPES = ['Wedding', 'Corporate', 'Birthday', 'Conference', 'Private Party']

/**
 * Controlled booking form fields. Registration + validation rules are
 * supplied by the parent via react-hook-form's `register` and `errors`.
 */
export default function BookingForm({ register, errors, guestCount }) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-slate-400">
          Event Basics
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Event Name"
            placeholder="e.g. Smith Wedding Reception"
            error={errors.eventName?.message}
            {...register('eventName', { required: 'Event name is required' })}
          />
          <Select
            label="Event Type"
            placeholder="Select type"
            options={EVENT_TYPES}
            error={errors.eventType?.message}
            {...register('eventType', { required: 'Event type is required' })}
          />
          <Input
            label="Date"
            type="date"
            error={errors.date?.message}
            {...register('date', { required: 'Date is required' })}
          />
          <Input
            label="Time"
            type="time"
            error={errors.time?.message}
            {...register('time', { required: 'Time is required' })}
          />
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-slate-400">
          Guest &amp; Logistics
        </h3>
        <div className="space-y-4">
          <Input
            label="Guest Count (Estimated)"
            type="number"
            min={0}
            placeholder="0"
            error={errors.guestCount?.message}
            {...register('guestCount', {
              required: 'Guest count is required',
              min: { value: 1, message: 'Must be at least 1 guest' },
              valueAsNumber: true,
            })}
          />
          <Input
            label="Venue Address"
            placeholder="Full address"
            error={errors.venue?.message}
            {...register('venue', { required: 'Venue address is required' })}
          />
          <TextArea
            label="Special Instructions"
            placeholder="Dietary restrictions, loading dock details, etc."
            {...register('instructions')}
          />
        </div>
      </section>
    </div>
  )
}

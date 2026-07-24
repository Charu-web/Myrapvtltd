import { Building2, Briefcase } from 'lucide-react'
import Select from './Select'
import { departments, roles } from '../data/mockStaff'

export default function WorkDetailsSection({ register, errors }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-xs font-semibold text-white">
          B
        </span>
        <h3 className="text-sm font-semibold text-gray-800">Work Details</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Department"
          icon={Building2}
          placeholder="Select Department"
          options={departments}
          error={errors?.department?.message}
          {...register('department', { required: 'Select a department' })}
        />
        <Select
          label="Role"
          icon={Briefcase}
          placeholder="Select Role"
          options={roles}
          error={errors?.role?.message}
          {...register('role', { required: 'Select a role' })}
        />
      </div>
    </section>
  )
}

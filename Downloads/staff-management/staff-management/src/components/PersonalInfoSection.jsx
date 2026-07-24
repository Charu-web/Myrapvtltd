import { Mail, Phone } from 'lucide-react'
import Input from './Input'
import UploadAvatar from './UploadAvatar'

export default function PersonalInfoSection({ register, errors, avatar, onAvatarChange }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-xs font-semibold text-white">
          A
        </span>
        <h3 className="text-sm font-semibold text-gray-800">Personal Information</h3>
      </div>

      <div className="mb-4">
        <UploadAvatar preview={avatar} onChange={onAvatarChange} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Full Name"
          placeholder="e.g. Jane Doe"
          error={errors?.name?.message}
          {...register('name', { required: 'Full name is required' })}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="jane@company.com"
            error={errors?.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
          />
          <Input
            label="Phone Number"
            icon={Phone}
            placeholder="(555) 123-4567"
            error={errors?.phone?.message}
            {...register('phone', { required: 'Phone number is required' })}
          />
        </div>
      </div>
    </section>
  )
}

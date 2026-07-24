import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { X, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from './Button'
import PersonalInfoSection from './PersonalInfoSection'
import WorkDetailsSection from './WorkDetailsSection'
import PermissionsSection from './PermissionsSection'
import { defaultPermissions } from '../data/mockStaff'

export default function AddStaffModal({ isOpen, onClose, onSubmit, isSubmitting, editingStaff }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [avatar, setAvatar] = useState(null)
  const [permissions, setPermissions] = useState(defaultPermissions)

  useEffect(() => {
    if (isOpen) {
      reset(
        editingStaff
          ? {
              name: editingStaff.name,
              email: editingStaff.email,
              phone: editingStaff.phone,
              department: editingStaff.department,
              role: editingStaff.role,
            }
          : {}
      )
      setAvatar(editingStaff?.avatar || null)
      setPermissions(editingStaff?.permissions || defaultPermissions)
    }
  }, [isOpen, editingStaff, reset])

  const togglePermission = (key) => {
    setPermissions((prev) =>
      prev.map((p) => (p.key === key ? { ...p, enabled: !p.enabled } : p))
    )
  }

  const submitForm = (formValues) => {
    if (!avatar) {
      toast('Tip: add a profile photo to help teammates recognize each other.', { icon: '💡' })
    }
    onSubmit({ ...formValues, avatar, permissions })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-staff-title"
            className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl2 bg-white shadow-modal"
          >
            {/* Header */}
            <div className="flex items-start justify-between bg-gradient-to-r from-brand-blue to-brand-blueDark px-6 py-5 text-white">
              <div>
                <h2 id="add-staff-title" className="text-lg font-semibold">
                  {editingStaff ? 'Edit Staff' : 'Add New Staff'}
                </h2>
                <p className="mt-1 text-xs text-white/80">
                  {editingStaff
                    ? 'Update details for this team member.'
                    : 'Enter details to onboard a new team member before joining.'}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="focus-ring rounded-full p-1.5 hover:bg-white/15"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
                <PersonalInfoSection
                  register={register}
                  errors={errors}
                  avatar={avatar}
                  onAvatarChange={setAvatar}
                />
                <hr className="border-gray-100" />
                <WorkDetailsSection register={register} errors={errors} />
                <hr className="border-gray-100" />
                <PermissionsSection permissions={permissions} onToggle={togglePermission} />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/60 px-6 py-4">
                <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" variant="blue" icon={UserPlus} isLoading={isSubmitting}>
                  {editingStaff ? 'Save Changes' : 'Add to Team'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useCallback, useState } from 'react'
import { Camera } from 'lucide-react'
import toast from 'react-hot-toast'

const MAX_SIZE_MB = 3
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp']

export default function UploadAvatar({ preview, onChange }) {
  const [dragActive, setDragActive] = useState(false)

  const validateAndSet = useCallback(
    (file) => {
      if (!file) return
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error('Please upload a PNG, JPG or WEBP image.')
        return
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`Image must be under ${MAX_SIZE_MB}MB.`)
        return
      }
      const reader = new FileReader()
      reader.onload = () => onChange(reader.result)
      reader.readAsDataURL(file)
    },
    [onChange]
  )

  return (
    <div className="flex items-center gap-4">
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          validateAndSet(e.dataTransfer.files?.[0])
        }}
        className={`focus-ring flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed bg-gray-50 transition-colors ${
          dragActive ? 'border-brand-blue bg-blue-50' : 'border-gray-300'
        }`}
      >
        {preview ? (
          <img src={preview} alt="Avatar preview" className="h-full w-full object-cover" />
        ) : (
          <Camera size={20} className="text-gray-400" />
        )}
        <input
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          className="sr-only"
          onChange={(e) => validateAndSet(e.target.files?.[0])}
        />
      </label>
      <div>
        <p className="text-sm font-medium text-gray-700">Upload Photo</p>
        <p className="text-xs text-gray-400">PNG, JPG up to {MAX_SIZE_MB}MB</p>
      </div>
    </div>
  )
}

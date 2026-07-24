import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StatsCards from '../components/StatsCards'
import StaffTable from '../components/StaffTable'
import AddStaffModal from '../components/AddStaffModal'
import Footer from '../components/Footer'
import { getStaff, createStaff, updateStaff, deleteStaff } from '../services/api'

export default function StaffManagement() {
  const [staff, setStaff] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    getStaff()
      .then(({ data }) => {
        if (mounted) setStaff(data)
      })
      .catch(() => toast.error('Failed to load staff list.'))
      .finally(() => mounted && setIsLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const filteredStaff = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return staff
    return staff.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q)
    )
  }, [staff, search])

  const openAddModal = () => {
    setEditingStaff(null)
    setIsModalOpen(true)
  }

  const openEditModal = (person) => {
    setEditingStaff(person)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    if (isSubmitting) return
    setIsModalOpen(false)
    setEditingStaff(null)
  }

  const handleSubmit = async (payload) => {
    setIsSubmitting(true)
    try {
      if (editingStaff) {
        const { data } = await updateStaff(editingStaff.id, payload)
        setStaff((prev) => prev.map((s) => (s.id === data.id ? data : s)))
        toast.success(`${data.name} was updated.`)
      } else {
        const { data } = await createStaff(payload)
        setStaff((prev) => [data, ...prev])
        toast.success(`${data.name} was added to the team.`)
      }
      setIsModalOpen(false)
      setEditingStaff(null)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    const target = staff.find((s) => s.id === id)
    const prevStaff = staff
    setStaff((prev) => prev.filter((s) => s.id !== id))
    try {
      await deleteStaff(id)
      toast.success(`${target?.name || 'Staff member'} was removed.`)
    } catch {
      setStaff(prevStaff)
      toast.error('Could not remove staff member.')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header search={search} onSearchChange={setSearch} onAddStaff={openAddModal} />

        <main className="flex-1 space-y-6 px-4 py-6 md:px-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage team roles, schedules and track operational performance.
            </p>
          </div>

          <StatsCards staff={staff} />

          <StaffTable
            staff={filteredStaff}
            isLoading={isLoading}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </main>

        <Footer />
      </div>

      <AddStaffModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        editingStaff={editingStaff}
      />
    </div>
  )
}

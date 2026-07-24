import { useMemo, useState } from 'react'
import { MoreVertical, Pencil, Trash2, ChevronLeft, ChevronRight, Users as UsersIcon } from 'lucide-react'

const PAGE_SIZE = 5

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
  Pending: 'bg-amber-50 text-amber-600 ring-amber-200',
  Inactive: 'bg-gray-100 text-gray-500 ring-gray-200',
}

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-redDeep text-xs font-semibold text-white">
      {initials}
    </div>
  )
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-gray-100">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="h-4 w-full max-w-[120px] rounded bg-gray-200" />
        </td>
      ))}
    </tr>
  )
}

export default function StaffTable({ staff, isLoading, onEdit, onDelete }) {
  const [page, setPage] = useState(1)
  const [openMenuId, setOpenMenuId] = useState(null)

  const totalPages = Math.max(1, Math.ceil(staff.length / PAGE_SIZE))
  const pageItems = useMemo(
    () => staff.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [staff, page]
  )

  const columns = ['Staff', 'Department', 'Role', 'Status', '']

  return (
    <div className="overflow-hidden rounded-xl2 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {columns.map((col) => (
                <th key={col} className="px-4 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

            {!isLoading && pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <UsersIcon size={28} />
                    <p className="text-sm font-medium text-gray-500">No staff found</p>
                    <p className="text-xs">Try adjusting your search or add a new team member.</p>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading &&
              pageItems.map((person) => (
                <tr key={person.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={person.name} />
                      <div>
                        <p className="font-medium text-gray-800">{person.name}</p>
                        <p className="text-xs text-gray-400">{person.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{person.department}</td>
                  <td className="px-4 py-3 text-gray-600">{person.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusStyles[person.status]}`}
                    >
                      {person.status}
                    </span>
                  </td>
                  <td className="relative px-4 py-3 text-right">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === person.id ? null : person.id)}
                      className="focus-ring rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                      aria-label="Row actions"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenuId === person.id && (
                      <div className="absolute right-4 top-10 z-10 w-32 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-modal">
                        <button
                          onClick={() => {
                            onEdit(person)
                            setOpenMenuId(null)
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-50"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => {
                            onDelete(person.id)
                            setOpenMenuId(null)
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!isLoading && staff.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="focus-ring rounded-md p-1.5 hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="focus-ring rounded-md p-1.5 hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

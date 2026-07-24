import { initialStaff, generateId } from '../data/mockStaff'

// In-memory mock "database" — simulates a real backend with network latency.
let staffDB = [...initialStaff]

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

/** GET /api/staff */
export async function getStaff() {
  await delay(600)
  return { data: staffDB }
}

/** POST /api/staff */
export async function createStaff(payload) {
  await delay(900)
  const newStaff = {
    id: generateId(),
    status: 'Pending',
    avatar: payload.avatar || null,
    ...payload,
  }
  staffDB = [newStaff, ...staffDB]
  return { data: newStaff }
}

/** PUT /api/staff/:id */
export async function updateStaff(id, payload) {
  await delay(700)
  staffDB = staffDB.map((s) => (s.id === id ? { ...s, ...payload } : s))
  return { data: staffDB.find((s) => s.id === id) }
}

/** DELETE /api/staff/:id */
export async function deleteStaff(id) {
  await delay(500)
  staffDB = staffDB.filter((s) => s.id !== id)
  return { data: { id } }
}

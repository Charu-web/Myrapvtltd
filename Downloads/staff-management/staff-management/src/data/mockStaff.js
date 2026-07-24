export const departments = [
  'Kitchen',
  'Operations',
  'Marketing',
  'Delivery',
  'Customer Support',
  'Finance',
]

export const roles = [
  'Manager',
  'Head Chef',
  'Staff',
  'Cashier',
  'Delivery Executive',
  'Marketing Executive',
]

export const defaultPermissions = [
  { key: 'dashboardAccess', label: 'Dashboard Access', description: 'View high-level insights and dashboard metrics', enabled: true },
  { key: 'canViewReports', label: 'Can View Reports', description: 'View sales and performance reports', enabled: false },
  { key: 'manageOrders', label: 'Manage Orders', description: 'Create, update and cancel customer orders', enabled: false },
  { key: 'manageInventory', label: 'Manage Inventory', description: 'Update stock levels and inventory items', enabled: false },
  { key: 'manageStaff', label: 'Manage Staff', description: 'Add, edit or remove staff members', enabled: false },
  { key: 'receiveNotifications', label: 'Receive Notifications', description: 'Get notified about important activity', enabled: true },
]

let idCounter = 100

export const generateId = () => idCounter++

export const initialStaff = [
  {
    id: 1,
    avatar: null,
    name: 'Jane Doe',
    email: 'jane.doe@company.com',
    phone: '(555) 123-4567',
    department: 'Kitchen',
    role: 'Head Chef',
    status: 'Active',
    permissions: defaultPermissions,
  },
  {
    id: 2,
    avatar: null,
    name: 'Marcus Lee',
    email: 'marcus.lee@company.com',
    phone: '(555) 234-5678',
    department: 'Operations',
    role: 'Manager',
    status: 'Active',
    permissions: defaultPermissions,
  },
  {
    id: 3,
    avatar: null,
    name: 'Priya Nair',
    email: 'priya.nair@company.com',
    phone: '(555) 345-6789',
    department: 'Marketing',
    role: 'Marketing Executive',
    status: 'Pending',
    permissions: defaultPermissions,
  },
  {
    id: 4,
    avatar: null,
    name: 'Tom Rivera',
    email: 'tom.rivera@company.com',
    phone: '(555) 456-7890',
    department: 'Delivery',
    role: 'Delivery Executive',
    status: 'Active',
    permissions: defaultPermissions,
  },
  {
    id: 5,
    avatar: null,
    name: 'Aisha Khan',
    email: 'aisha.khan@company.com',
    phone: '(555) 567-8901',
    department: 'Finance',
    role: 'Cashier',
    status: 'Inactive',
    permissions: defaultPermissions,
  },
]

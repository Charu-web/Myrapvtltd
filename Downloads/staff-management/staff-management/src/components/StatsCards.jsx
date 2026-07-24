import { motion } from 'framer-motion'
import { Users, UserCheck, Clock } from 'lucide-react'

const iconMap = { Users, UserCheck, Clock }

const gradients = [
  'from-brand-red to-brand-redDeep',
  'from-rose-400 to-brand-red',
  'from-gray-800 to-gray-900',
]

export default function StatsCards({ staff }) {
  const stats = [
    { id: 1, title: 'Total Staff', count: staff.length, icon: 'Users' },
    {
      id: 2,
      title: 'Active Staff',
      count: staff.filter((s) => s.status === 'Active').length,
      icon: 'UserCheck',
    },
    {
      id: 3,
      title: 'Pending Approval',
      count: staff.filter((s) => s.status === 'Pending').length,
      icon: 'Clock',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => {
        const Icon = iconMap[stat.icon]
        return (
          <motion.div
            key={stat.id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className={`relative overflow-hidden rounded-xl2 bg-gradient-to-br ${gradients[i]} p-5 text-white shadow-card`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold">{stat.count}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <Icon size={22} />
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10" />
          </motion.div>
        )
      })}
    </div>
  )
}

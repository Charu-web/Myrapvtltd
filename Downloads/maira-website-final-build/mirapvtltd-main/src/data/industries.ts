export type Industry = {
  name: string
  description: string
  icon: string
  accent: string
}

export const industries: Industry[] = [
  { name: 'Data Centers', description: 'Precision power and cooling for mission-critical facilities.', icon: 'Server', accent: '#6366f1' },
  { name: 'Healthcare', description: 'Reliable systems for safe patient care and compliance.', icon: 'HeartPulse', accent: '#0ea5e9' },
  { name: 'Pharmaceutical', description: 'Controlled environments built for cleanroom and lab operations.', icon: 'FlaskConical', accent: '#22c55e' },
  { name: 'Commercial', description: 'Efficient building services for office campuses and retail spaces.', icon: 'BuildingStore', accent: '#f97316' },
  { name: 'Hospitality', description: 'Guest-ready facilities with premium comfort and hygiene.', icon: 'BedDouble', accent: '#8b5cf6' },
  { name: 'Manufacturing', description: 'Robust infrastructure for safe high-throughput production.', icon: 'Factory', accent: '#ec4899' },
]

export type FeatureCard = {
  title: string
  description: string
  icon: string
  accent: string
}

export const features: FeatureCard[] = [
  { title: 'Integrated Planning', description: 'One team managing MEP, safety, and building services end-to-end.', icon: 'Layers', accent: '#6366f1' },
  { title: 'Digital Reporting', description: 'Actionable dashboards, accountability, and transparent tracking.', icon: 'BarChart3', accent: '#0ea5e9' },
  { title: 'Safety First', description: 'Compliance-driven work practices and risk mitigation for every phase.', icon: 'ShieldCheck', accent: '#22c55e' },
  { title: 'Sustainable Ops', description: 'Energy efficiency and low-carbon strategies that cut costs and emissions.', icon: 'Leaf', accent: '#14b8a6' },
  { title: 'Adaptive Teams', description: 'Scalable workforce models that align with project needs and service levels.', icon: 'Users', accent: '#f97316' },
  { title: 'Premium Support', description: 'Priority response and lifecycle support for mission-critical assets.', icon: 'Headset', accent: '#8b5cf6' },
]

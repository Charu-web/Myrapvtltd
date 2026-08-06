export type ProcessStep = {
  title: string
  description: string
  icon: string
}

export const processSteps: ProcessStep[] = [
  { title: 'Assess', description: 'Site surveys, requirements gathering, and technical feasibility analysis.', icon: 'Search' },
  { title: 'Plan', description: 'Custom MEP and service roadmaps built around your facility lifecycle.', icon: 'Map' },
  { title: 'Design', description: 'Engineering layouts, coordination, and compliance documentation.', icon: 'Pencil' },
  { title: 'Deliver', description: 'Safe installation, commissioning, and handover with detailed reporting.', icon: 'CheckCircle' },
  { title: 'Optimize', description: 'Performance tuning, preventive maintenance, and operational support.', icon: 'TrendingUp' },
  { title: 'Support', description: '24/7 facility management backed by responsive communication.', icon: 'LifeBuoy' },
]

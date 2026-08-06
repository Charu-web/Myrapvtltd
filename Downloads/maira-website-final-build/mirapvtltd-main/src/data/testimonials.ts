export type Testimonial = {
  quote: string
  name: string
  company: string
  designation: string
  avatar: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'MAIRA delivered our MEP retrofit ahead of schedule with zero disruption to live operations. Their communication was transparent and their technical execution was world-class.',
    name: 'S. Kumar',
    company: 'JSW Power',
    designation: 'Head of Operations',
    avatar: 'SK',
    rating: 5,
  },
  {
    quote:
      'A truly reliable partner for our large-scale retrofit project. They combined engineering rigour with a genuine focus on quality and safety throughout every phase of delivery.',
    name: 'R. Mehta',
    company: 'Adani Enterprises',
    designation: 'Project Director',
    avatar: 'RM',
    rating: 5,
  },
  {
    quote:
      "Responsive teams and expert technical support made our HVAC rollout seamless. MAIRA's preventive maintenance framework has significantly reduced our downtime incidents.",
    name: 'P. Rao',
    company: 'L&T Construction',
    designation: 'Facilities Lead',
    avatar: 'PR',
    rating: 5,
  },
  {
    quote:
      'From cleanroom design to commissioning, the MAIRA team demonstrated exceptional domain expertise. Our pharma facility is now fully compliant and operating at peak efficiency.',
    name: 'A. Sharma',
    company: 'Aurobindo Pharma',
    designation: 'VP Engineering',
    avatar: 'AS',
    rating: 5,
  },
  {
    quote:
      'Their electrical infrastructure team handled our campus-wide power distribution upgrade flawlessly. On time, on budget, and with full documentation for future maintenance teams.',
    name: 'N. Singh',
    company: 'Infosys Ltd.',
    designation: 'Director – Facilities',
    avatar: 'NS',
    rating: 5,
  },
]

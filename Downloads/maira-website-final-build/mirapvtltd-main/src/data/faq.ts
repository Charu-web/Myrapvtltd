export type FaqItem = {
  question: string
  answer: string
}

export const faq: FaqItem[] = [
  {
    question: 'What services do you provide?',
    answer: 'We provide end-to-end MEP, HVAC, electrical, plumbing, fire safety, and facility management services.'
  },
  {
    question: 'Do you work with commercial and industrial clients?',
    answer: 'Yes — our teams are experienced across commercial campuses, industrial facilities, and cleanroom environments.'
  },
  {
    question: 'How do I request a quote or site assessment?',
    answer: 'Use the contact form or email us at hello@maira-facilities.com to request a site assessment and proposal.'
  }
]

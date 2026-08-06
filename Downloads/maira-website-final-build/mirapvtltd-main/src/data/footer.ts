export type FooterLink = {
  label: string
  href: string
}

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

export type SocialLink = {
  label: string
  href: string
  icon: string
}

export const footerLinks: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About Us', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Industries', href: '#industries' },
      { label: 'Our Process', href: '#process' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Our Services',
    links: [
      { label: 'Electrical Infrastructure', href: '#services' },
      { label: 'HVAC & Climate Control', href: '#services' },
      { label: 'Fire & Safety Systems', href: '#services' },
      { label: 'Plumbing & Utility Piping', href: '#services' },
      { label: 'Cleanroom & Lab Solutions', href: '#services' },
      { label: 'Facility Management', href: '#services' },
    ],
  },
  {
    title: 'Contact Info',
    links: [
      { label: 'hello@maira-facilities.com', href: 'mailto:hello@maira-facilities.com' },
      { label: '+91 40 1234 5678', href: 'tel:+914012345678' },
      { label: 'Hyderabad, Telangana, India', href: 'https://maps.google.com' },
      { label: 'Mon–Sat: 8:00 AM – 7:00 PM', href: '#contact' },
    ],
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
]

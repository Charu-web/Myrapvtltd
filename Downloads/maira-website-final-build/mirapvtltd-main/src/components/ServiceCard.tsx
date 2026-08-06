import type { Service } from '../data/siteContent'
import { ArrowRight } from 'lucide-react'

type ServiceCardProps = {
  item: Service
  index: number
  onContactClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function ServiceCard({ item, index, onContactClick }: ServiceCardProps) {
  const Icon = item.icon

  return (
    <article className="glass-service-card">
      <div className="service-card-top">
        <div className="service-icon-box">
          <Icon size={26} />
        </div>
        <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="service-card-body">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      <a
        href="#contact"
        className="service-card-footer"
        onClick={onContactClick}
      >
        <span>Request Consultation</span>
        <ArrowRight size={15} />
      </a>
    </article>
  )
}

export default ServiceCard

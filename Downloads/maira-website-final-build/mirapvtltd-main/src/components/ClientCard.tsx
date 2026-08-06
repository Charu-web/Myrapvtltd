import type { ClientLogo } from '../data/clients'

type ClientCardProps = {
  item: ClientLogo
}

export function ClientCard({ item }: ClientCardProps) {
  return (
    <figure className="client-logo-card" aria-label={`Client: ${item.name}`}>
      <div className="client-logo-mark" style={{ background: `linear-gradient(135deg, ${item.accent}, rgba(255,255,255,0.25))` }}>
        <span>{item.name.charAt(0)}</span>
      </div>
      <figcaption>
        <span className="client-logo-name">{item.name}</span>
        <small>{item.tagline}</small>
      </figcaption>
    </figure>
  )
}

export default ClientCard

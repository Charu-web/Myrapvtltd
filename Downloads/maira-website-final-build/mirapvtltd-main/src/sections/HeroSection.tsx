import { ArrowRight } from 'lucide-react'
import { Container } from '../components/Container'
import { heroBadge, heroCategories, heroDescription, heroFeatures, heroPrimaryCta, heroSecondaryCta, heroTitle, stats } from '../data/siteContent'

export function HeroSection() {
  return (
    <section className="hero-section dark-hero">
      <Container className="hero-shell">
        <div className="hero-copy">
          <p className="hero-label">{heroBadge}</p>
          <h1>
            {heroTitle.split(' ').slice(0, 3).join(' ')}
            <br />
            {heroTitle.split(' ').slice(3, 5).join(' ')}
            <span>{heroTitle.split(' ').slice(5).join(' ')}</span>
          </h1>
          <p className="hero-description">{heroDescription}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#services">
              {heroPrimaryCta}
              <ArrowRight size={18} />
            </a>
            <a className="btn btn-outline" href="#projects">
              {heroSecondaryCta}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-shell">
            <div className="hero-image-panel">
              <div className="hero-image-overlay" />
              <div className="hero-image-placeholder">3D facility visual</div>
            </div>
            <div className="hero-category-list">
              {heroCategories.map((category) => (
                <article key={category.title} className="hero-category-card">
                  <p className="hero-category-title">{category.title}</p>
                  <ul>
                    {category.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container className="hero-bottom">
        <div className="hero-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="hero-services-row">
          {heroFeatures.map((service) => (
            <article key={service.title} className="service-feature-card">
              <div className="feature-icon">
                <service.icon size={20} />
              </div>
              <div>
                <h3>{service.title}</h3>
                <p>{service.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

import { Container } from '../components/Container'
import { SectionTitle } from '../components/SectionTitle'
import Accordion from '../components/Accordion'
import { faq } from '../data/faq'

export function FaqSection() {
  return (
    <section className="section" id="faq">
      <Container>
        <SectionTitle eyebrow="FAQ" title="Frequently asked questions" description="Helpful answers to common questions about our services and process." />
        <div className="faq-grid">
          <Accordion items={faq} />
        </div>
      </Container>
    </section>
  )
}

export default FaqSection

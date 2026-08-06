import { useState } from 'react'

type AccordionItem = {
  question: string
  answer: string
}

type AccordionProps = {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="accordion">
      {items.map((it, idx) => (
        <div key={it.question} className={`accordion-item ${openIndex === idx ? 'open' : ''}`}>
          <button
            className="accordion-toggle"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span>{it.question}</span>
            <span className="chev">{openIndex === idx ? '−' : '+'}</span>
          </button>
          <div className="accordion-panel" role="region">
            <p>{it.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion

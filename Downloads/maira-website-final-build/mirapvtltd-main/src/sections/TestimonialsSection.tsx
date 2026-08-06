import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, MessageSquareQuote } from 'lucide-react'
import './TestimonialsSection.css'
import { testimonials } from '../data/testimonials'

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.97, transition: { duration: 0.35 } }),
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback(
    (next: number) => {
      const clamped = (next + testimonials.length) % testimonials.length
      setDirection(next > index ? 1 : -1)
      setIndex(clamped)
    },
    [index]
  )

  useEffect(() => {
    const timer = setInterval(() => goTo(index + 1), 6000)
    return () => clearInterval(timer)
  }, [index, goTo])

  const t = testimonials[index]

  return (
    <section className="testimonials-section-container" id="testimonials">
      <div className="testimonials-bg-glow" />

      <div className="testimonials-shell">
        <div className="testimonials-header">
          <div className="testimonials-eyebrow">
            <MessageSquareQuote size={13} />
            <span>TESTIMONIALS</span>
          </div>

          <h2 className="testimonials-title">
            What Our Partners Say About{' '}
            <span className="testimonials-title-accent">MAIRA</span>
          </h2>

          <p className="testimonials-desc">
            Real feedback from organisations we've partnered with across India's most demanding engineering and facility environments.
          </p>
        </div>

        <div className="testimonial-slider-shell">
          <button
            className="testimonial-nav-btn"
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="testimonial-viewport-frame">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                className="glass-testimonial-card"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Stars */}
                <div className="testimonial-stars" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="testimonial-quote">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="testimonial-author-box">
                  <div className="testimonial-avatar-circle" aria-hidden="true">
                    {t.name.charAt(0)}
                  </div>
                  <div className="testimonial-author-meta">
                    <strong className="author-name">{t.name}</strong>
                    <span className="author-role">{t.designation}</span>
                    <span className="author-company">{t.company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="testimonial-nav-btn"
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="testimonial-dots-row" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`testimonial-dot-btn ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

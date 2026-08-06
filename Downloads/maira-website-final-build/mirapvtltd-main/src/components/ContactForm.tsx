import { useState } from 'react'
import { PrimaryButton } from './PrimaryButton'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const valid = name.trim() && email.includes('@') && message.trim().length >= 10

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    // fallback: open mail client with prefilled content
    const subject = encodeURIComponent('Contact request from website')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:hello@maira-facilities.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
      <div className="form-row">
        <label>
          <span className="sr-only">Name</span>
          <input
            aria-label="Your name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          <span className="sr-only">Email</span>
          <input
            aria-label="Your email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>

      <label>
        <span className="sr-only">Message</span>
        <textarea
          aria-label="Message"
          placeholder="Tell us about your project (10+ characters)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
        />
      </label>

      <div className="form-actions">
        <PrimaryButton className="submit-btn" onClick={() => {}}>
          Send message
        </PrimaryButton>
        {sent && <span className="sent-note">Opening your mail client…</span>}
      </div>
    </form>
  )
}

export default ContactForm

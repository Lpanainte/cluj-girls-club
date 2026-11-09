
import { useState, type FormEvent } from 'react'
import { supabase } from '../supabase'
import './RegistrationForm.css'

type RegistrationFormProps = {
  eventId: number
  eventTitle: string
  onClose: () => void
}

function RegistrationForm({
  eventId,
  eventTitle,
  onClose,
}: RegistrationFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading || !consent) return

    setLoading(true)
    setError('')

    const { error: supabaseError } = await supabase
      .from('registrations')
      .insert({
        event_id: eventId,
        full_name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      })

    setLoading(false)

    if (supabaseError) {
      setError('Registration failed. Please try again.')
      console.error(supabaseError)
      return
    }

    setSuccess(true)
  }

  return (
    <div className="registration-overlay" onClick={onClose}>
      <div
        className="registration-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="registration-close"
          onClick={onClose}
          aria-label="Close registration form"
        >
          ×
        </button>

        {success ? (
          <div className="registration-success" role="status">
            <span className="eyebrow">CLJ GIRLS CLUB</span>
            <h2>You're on the list! 🎀</h2>
            <p>
              Your registration for {eventTitle} has been received.
              We'll contact you with more details.
            </p>
            <button
              type="button"
              className="registration-submit"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">SAVE YOUR SPOT</span>
            <h2 id="registration-title">Join the experience.</h2>
            <p className="registration-subtitle">{eventTitle}</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="reg-name">Full name</label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                maxLength={100}
                required
              />

              <label htmlFor="reg-email">Email address</label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                maxLength={254}
                required
              />

              <label htmlFor="reg-phone">Phone number</label>
              <input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+40 7..."
                maxLength={25}
                required
              />

              <label className="registration-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  required
                />
                <span>
                  I agree to be contacted about this event.
                </span>
              </label>

              {error && <p role="alert">{error}</p>}

              <button
                type="submit"
                className="registration-submit"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Register ↗'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default RegistrationForm

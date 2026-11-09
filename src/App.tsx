
import { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/Hero'
import AdminLogin from './components/AdminLogin'
import RegistrationForm from './components/RegistrationForm'
import { events, type ClubEvent } from './events'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null)
  const [registrationEvent, setRegistrationEvent] =
    useState<ClubEvent | null>(null)

  const filteredEvents = events.filter(event => {
    const matchesCategory =
      selectedCategory === 'All' ||
      event.category === selectedCategory

    const query = searchTerm.toLowerCase().trim()

    const matchesSearch =
      event.title.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    if (!selectedEvent) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null)
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedEvent])

  if (window.location.pathname === '/admin') {
    return <AdminLogin />
  }

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="logo">
          CGC 🎀
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <Hero />

        <section id="events" className="events-section">
          <span className="eyebrow">
            LET'S MAKE MEMORIES
          </span>

          <h2>Discover our events</h2>
          <p>New experiences are better together.</p>

          <div className="search-container">
            <input
              type="search"
              placeholder="Search events, activities, locations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Search events"
            />
          </div>

          <div className="filters">
            {['All', 'Social', 'Wellness', 'Activities'].map(
              category => (
                <button
                  type="button"
                  key={category}
                  className={
                    selectedCategory === category
                      ? 'filter active'
                      : 'filter'
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              )
            )}
          </div>

          <div className="event-grid">
            {filteredEvents.map(event => (
              <article className="event-card" key={event.id}>
                <div className="event-image">
                  <img
                    src={event.image}
                    alt={event.title}
                  />
                </div>

                <div className="event-content">
                  <span className="category">
                    {event.category}
                  </span>

                  <h3>{event.title}</h3>
                  <small>{event.date}</small>

                  <div className="event-details">
                    <span>📍 {event.location}</span>
                    <span>🎟️ {event.price}</span>
                    <span>
                      {event.status === 'upcoming'
                        ? 'Upcoming'
                        : event.status === 'past'
                        ? 'Past event'
                        : 'In planning'}
                    </span>
                  </div>

                  <p>{event.description}</p>

                  <button
                    type="button"
                    className="event-button"
                    onClick={() => setSelectedEvent(event)}
                  >
                    View details ↗
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <p className="no-results">
              No events found. Try another search.
            </p>
          )}
        </section>

        <section id="about" className="about-section">
          <span className="eyebrow">
            YOU BELONG HERE
          </span>

          <h2>More than a community.</h2>

          <p>
            Cluj Girls Club brings women together through
            friendships, events, workshops and shared experiences.
            Whether you're new in town or simply looking for
            new friends, there's a place for you here.
          </p>

          <a
            href="https://www.instagram.com/clujgirlsclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button"
          >
            Join our community ↗
          </a>
        </section>
      </main>

      {selectedEvent && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedEvent(null)}
        >
          <section
            className="event-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event details"
            >
              ×
            </button>

            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
            />

            <div className="modal-content">
              <span className="category">
                {selectedEvent.category}
              </span>

              <h2 id="event-modal-title">
                {selectedEvent.title}
              </h2>

              <p>{selectedEvent.description}</p>
              <p>📅 {selectedEvent.date}</p>
              <p>📍 {selectedEvent.location}</p>
              <p>🎟️ {selectedEvent.price}</p>

              <p>
                {selectedEvent.status === 'upcoming'
                  ? 'Upcoming event'
                  : selectedEvent.status === 'past'
                  ? 'This event has ended.'
                  : 'Details will be announced soon.'}
              </p>

              {selectedEvent.status === 'upcoming' && (
                <button
                  type="button"
                  className="registration-submit"
                  onClick={() => {
                    setRegistrationEvent(selectedEvent)
                    setSelectedEvent(null)
                  }}
                >
                  Register for this event ↗
                </button>
              )}

              <a
                href="https://www.instagram.com/clujgirlsclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button"
              >
                Contact CGC ↗
              </a>
            </div>
          </section>
        </div>
      )}

      {registrationEvent && (
        <RegistrationForm
          eventId={registrationEvent.id}
          eventTitle={registrationEvent.title}
          onClose={() => setRegistrationEvent(null)}
        />
      )}

      <footer>
        <strong>Cluj Girls Club 🎀</strong>
        <p>Come alone. Leave with friends.</p>
        <small>
          © {new Date().getFullYear()} Cluj Girls Club
        </small>
      </footer>
    </div>
  )
}

export default App

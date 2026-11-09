
import './Hero.css'

export default function Hero() {
  return (
    <section className="cgc-hero" id="home">
      <div className="cgc-hero-content">
        <span className="cgc-hero-label">
          THE SOCIAL CLUB FOR WOMEN IN CLUJ
        </span>

        <h1>
          Your people.
          <br />
          Your kind of <em>place.</em>
        </h1>

        <p className="cgc-hero-tagline">
          Come alone. Leave with friends.
        </p>

        <p className="cgc-hero-description">
          New friendships, spontaneous plans and experiences
          worth sharing. A community built around bringing
          women together, one event at a time.
        </p>

        <a href="#events" className="cgc-hero-button">
          Discover our events
          <span aria-hidden="true">↗</span>
        </a>

        <div className="cgc-hero-bottom">
          BASED IN CLUJ-NAPOCA, ROMANIA
        </div>
      </div>

      <div className="cgc-hero-visual">
        <img
          src="/images/girls-group.jpeg"
          alt="Cluj Girls Club community gathering outdoors"
        />
        <span className="cgc-photo-caption">
          REAL PEOPLE. REAL CONNECTIONS.
        </span>
      </div>
    </section>
  )
}

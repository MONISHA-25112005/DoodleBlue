
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="about-section">
      <div className="about-card">
        <span className="section-kicker">OUR STORY · OUR HERITAGE</span>
        <div className="about-symbol">ॐ</div>
        <h1>About Sacred Heritage</h1>

        <p>
          Sacred Heritage is a temple discovery website celebrating
          India's spiritual traditions, ancient architecture, and
          cultural history.
        </p>

        <p>
          Explore sacred places, learn about their history, and save
          your favorite temples to your personal collection.
        </p>

        <div className="about-values">
          <div>
            <span>✧</span>
            <h3>Discover</h3>
            <p>Explore India's sacred temples.</p>
          </div>
          <div>
            <span>ॐ</span>
            <h3>Connect</h3>
            <p>Celebrate spiritual traditions.</p>
          </div>
          <div>
            <span>❋</span>
            <h3>Preserve</h3>
            <p>Appreciate our cultural heritage.</p>
          </div>
        </div>

        <Link to="/" className="hero-button">Explore Temples</Link>
      </div>
    </section>
  );
}

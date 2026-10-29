
import { Link } from "react-router-dom";
import { useTempleData } from "../App.jsx";

export default function Favorites() {
  const { favorites, toggleFavorite } = useTempleData();

  return (
    <section className="subpage-section">
      <div className="section-heading">
        <h1>My Favorite Temples</h1>
        <p>Total Favorites: {favorites.length}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="status-panel">
          <h2>No favorite temples yet</h2>
          <p>Home page-ku poi unakku pudicha temples-ah save pannu.</p>
          <Link to="/" className="hero-button">Explore Temples</Link>
        </div>
      ) : (
        <div className="temple-grid">
          {favorites.map((temple) => (
            <article className="temple-card" key={temple.id}>
              <div className="temple-image-container">
                {temple.image ? (
                  <img
                    src={temple.image}
                    alt={temple.name}
                    className="temple-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="image-placeholder">
                    <span>ॐ</span>
                    <p>Image unavailable</p>
                  </div>
                )}
              </div>

              <div className="temple-info">
                <h2>{temple.name}</h2>
                <p className="temple-location">
                  📍 {[temple.district, temple.state]
                    .filter(Boolean)
                    .join(", ") || "India"}
                </p>
                <p className="temple-description">
                  {temple.description}
                </p>
                <button
                  className="favorite-button saved"
                  onClick={() => toggleFavorite(temple)}
                >
                  ♥ Remove Favorite
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

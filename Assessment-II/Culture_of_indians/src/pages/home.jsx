
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTempleData } from "../App.jsx";

const PAGE_SIZE = 9;

export default function Home() {
  const {
    temples,
    favorites,
    loading,
    error,
    fetchTemples,
    toggleFavorite,
  } = useTempleData();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredTemples = useMemo(() => {
    const query = search.trim().toLowerCase();

    return temples.filter((temple) =>
      temple.name.toLowerCase().includes(query)
    );
  }, [temples, search]);

  const totalPages = Math.ceil(filteredTemples.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const displayedTemples = filteredTemples.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loading) {
    return (
      <div className="status-screen">
        <div className="loader">ॐ</div>
        <h2>Please wait, exploring sacred heritage…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-screen">
        <h2>Unable to load temples</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={fetchTemples}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
     
<section className="hero-section">
  <div className="hero-content">
    <span className="section-kicker">
      A JOURNEY THROUGH DIVINITY
    </span>

    <h1>Discover the Divine Heritage of India</h1>

    <p>
      Explore sacred temples and India's timeless traditions.
      Witness divine architecture, rich history and spiritual
      heritage across every corner of Bharat.
    </p>

    <a href="#temples" className="hero-button">
      Explore Temples ↓
    </a>
  </div>

  <div className="hero-image">
    <img
      src="/temples/hero-temple.png"
      alt="Beautiful Indian temple at sunset"
    />
  </div>
</section>


      <section className="temples-section" id="temples">
        <div className="section-heading">
          <h2>Temples of India</h2>
          <p>Total temples: {temples.length}</p>
          <p>Total favorites: {favorites.length}</p>
        </div>

        <div className="search-row">
          <input
            className="temple-search"
            type="search"
            placeholder="Search by temple name..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
          <span>{filteredTemples.length} temples found</span>
        </div>

        {displayedTemples.length === 0 ? (
          <div className="status-panel">
            <h2>No temples found</h2>
            <p>Try another temple name.</p>
          </div>
        ) : (
          <div className="temple-grid">
            {displayedTemples.map((temple) => {
              const isFavorite = favorites.some(
                (item) => item.id === temple.id
              );

              return (
                <article className="temple-card" key={temple.id}>
                  <div className="temple-image-container">
                    {temple.image ? (
                      <img
                        src={temple.image}
                        alt={temple.name}
                        className="temple-image"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="image-placeholder">
                        <span>ॐ</span>
                        <p>Image unavailable</p>
                      </div>
                    )}
                  </div>

                  <div className="temple-info">
                    <h3>{temple.name}</h3>
                    <p className="temple-location">
                      📍 {[temple.district, temple.state]
                        .filter(Boolean)
                        .join(", ") || "India"}
                    </p>
                    <p className="temple-description">
                      {temple.description}
                    </p>

                    {temple.architecture && (
                      <p className="temple-architecture">
                        Architecture: {temple.architecture}
                      </p>
                    )}

                    <button
                      className={`favorite-button ${isFavorite ? "saved" : ""}`}
                      onClick={() => toggleFavorite(temple)}
                    >
                      {isFavorite ? "♥ Remove Favorite" : "♡ Add Favorite"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              ← Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        )}

        <p className="favorites-summary">
          ♥ Your Favorites: <strong>{favorites.length}</strong>{" "}
          <Link to="/favorites">View Favorites</Link>
        </p>
      </section>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cats, setCats] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState('home');
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const[name,setName]=useState('')
  const [show,setShow] = useState(false)
  const [form, setForm] = useState({
  firstName: '',
  email: '',
  age: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((pre) => ({
    ...pre,
    [name]:value
  }));
};


useEffect(() => {
  async function fetchCats() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=10'
      );

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error('Failed to fetch cats');
      }

      const data = await response.json();
      setCats(data);

    } catch (err) {
      console.error('Network error:', err);

      setError(
        'Network error! Unable to load cats. Please check your internet connection.'
      );

      setCats([]);

    } finally {
      setLoading(false);
    }
  }

  fetchCats();
}, []);


  // Add or remove favorites
  function toggleFavorite(cat) {
    setFavorites((previous) => {
      const exists = previous.some((item) => item.id === cat.id);

      if (exists) {
        return previous.filter((item) => item.id !== cat.id);
      }

      return [...previous, cat];
    });
  }

  // Navigate between pages
  function goToPage(nextPage) {
    setPage(nextPage);
    setSelectedCat(null);
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Navigate to About section
  function openAbout() {
    setSelectedCat(null);
    setPage('home');

    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 0);
  }

  // Search cats on Home or Favorites page
  const displayedCats = page === 'favorites' ? favorites : cats;

  const filteredCats = displayedCats.filter((cat) =>
    cat.id.toLowerCase().includes(search.trim().toLowerCase())
  );

 if (loading && !error) {
  return <h1>Page is loading....</h1>;
}

  return (
    <div className="app" id="home">
      <header className="site-header">
        <a
          href="#home"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            goToPage('home');
          }}
        >
          <span className="brand-icon">♥</span>

          <span className="brand-text">
            <strong>Cat World</strong>
            <small>Every cat has a story</small>
          </span>
        </a>

        <nav className="main-nav">
          <button
            className={
              page === 'home' && !selectedCat
                ? 'nav-link selected'
                : 'nav-link'
            }
            onClick={() => goToPage('home')}
          >
            Home
          </button>

          <button
            className={
              page === 'favorites'
                ? 'nav-link selected'
                : 'nav-link'
            }
            onClick={() => goToPage('favorites')}
          >
            <span className="nav-count">{favorites.length}</span>
            Favorites
          </button>

          <button className="nav-link" onClick={openAbout}>
            About
          </button>
        </nav>
      </header>

      <main>
        {selectedCat ? (
          <section className="detail-section">
            <button
              className="back-button"
              onClick={() => setSelectedCat(null)}
            >
              ← Back to cats
            </button>

            <div className="detail-card">
              <img src={selectedCat.url} alt="Selected cat" />

              <div className="detail-content">
                <span className="section-tag">
                  MEET YOUR NEW FRIEND
                </span>

                <h1>A little more about this cat</h1>

                <p>
                  Every cat is unique. Take a closer look at this
                  adorable friend and add it to your collection.
                </p>

                <p className="image-id">
                  Image ID: {selectedCat.id}
                </p>

                <button
                  className="primary-button"
                  onClick={() => toggleFavorite(selectedCat)}
                >
                  {favorites.some(
                    (cat) => cat.id === selectedCat.id
                  )
                    ? '♥ Remove from Favourites'
                    : '♡ Add to Favourites'}
                </button>
              </div>
            </div>
          </section>
        ) : (
          <>
            {page === 'home' && (
              <section className="hero">
                <div className="hero-content">
                  <span className="hero-badge">
                    🐾 WELCOME TO CAT WORLD
                  </span>

                  <h1>
                    Discover the wonderful
                    <br />
                    world of <span>cats.</span>
                  </h1>

                  <p>
                    From playful kittens to curious companions,
                    explore adorable cats from around the world.
                    Find your favourites and create your own
                    collection!
                  </p>

                  <div className="hero-actions">
                    <button
                      className="primary-button"
                      onClick={() =>
                        document
                          .getElementById('gallery')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                    >
                      Explore Cats <span>→</span>
                    </button>

                    <button
                      className="outline-button"
                      onClick={() => goToPage('favorites')}
                    >
                      ♥ My Favourites ({favorites.length})
                    </button>
                  </div>

                  <div className="hero-stats">
                    <div>
                      <strong>{cats.length}</strong>
                      <span>Cats discovered</span>
                    </div>

                    <div>
                      <strong>{favorites.length}</strong>
                      <span>Cats loved</span>
                    </div>

                    <div>
                      <strong>∞</strong>
                      <span>Love for cats</span>
                    </div>
                  </div>
                </div>
              </section>
            )}
            

            <section className="gallery-section" id="gallery">
              <div className="section-heading">
                <div>
                  <span className="section-tag">
                    {page === 'favorites'
                      ? 'YOUR PERSONAL COLLECTION'
                      : 'EXPLORE & DISCOVER'}
                  </span>

                  <h2>
                    {page === 'favorites'
                      ? 'Your Favourite Cats'
                      : 'Meet the Cat World'}
                  </h2>

                  <p>
                    {page === 'favorites'
                      ? 'All your favourite furry friends in one place.'
                      : 'Find a face you love and save it with a heart.'}
                  </p>
                </div>

                <span className="gallery-count">
                  {filteredCats.length} images
                </span>
              </div>
              <section className="gallery-section">
             <input type="text"  value={name}  onChange={(e) => setName(e.target.value)}  />
             <p>Current Value:{name}</p>
             </section>
               
            <section className="form-section">
              <label>First Name</label>
             <input  type="text"name="firstName" value={form.firstName} onChange={handleChange} />
             <label>Email</label>
             <input type="email" name="email" value={form.email} onChange={handleChange}/>
            <label>Age</label>
            <input type="number"  name="age" value={form.age}  onChange={handleChange} />
            <button onClick={()=>setShow(true)}></button>
          <p>First Name: {form.firstName}</p>
          <p>Email: {form.email}</p>
          <p>Age: {form.age}</p>
          </section>

            
              {/* Network error*/}
              {error ? (
                <div className="status-message">
                  <h3>Unable to load cats</h3>
                  <p>{error}</p>
                </div>
              
              ) : filteredCats.length === 0 ? (
                <div className="empty-message">
                  <span>🐱</span>

                  <h3>
                    {page === 'favorites'
                      ? 'No favourites yet!'
                      : 'No cats available'}
                  </h3>

                  <p>
                    {page === 'favorites'
                      ? 'Go to Home and click the heart on any cat.'
                      : 'Please try again later.'}
                  </p>

                  {page === 'favorites' && (
                    <button
                      className="primary-button"
                      onClick={() => goToPage('home')}
                    >
                      Explore Cats
                    </button>
                  )}
                </div>
              ) : (
                <div className="cat-grid">
                  {filteredCats.map((cat, index) => {
                    const isFavorite = favorites.some(
                      (item) => item.id === cat.id
                    );

                    return (
                      <article className="cat-card" key={cat.id}>
                        <button
                          className="cat-image-button"
                          onClick={() => setSelectedCat(cat)}
                          aria-label={`View cat ${cat.id}`}
                        >
                          <img
                            src={cat.url}
                            alt="Cute cat"
                            loading={index > 7 ? 'lazy' : 'eager'}
                          />

                          <span className="image-overlay">
                            View Details ↗
                          </span>
                        </button>

                        <div className="cat-card-content">
                          <div>
                            <span className="cat-label">
                              CAT COMPANION
                            </span>

                            <h3>Cat #{cat.id.slice(0, 7)}</h3>
                          </div>

                          <button
                            className={
                              isFavorite
                                ? 'heart-button liked'
                                : 'heart-button'
                            }
                            onClick={() => toggleFavorite(cat)}
                            aria-label={
                              isFavorite
                                ? 'Remove from favourites'
                                : 'Add to favourites'
                            }
                          >
                            {isFavorite ? '♥' : '♡'}
                          </button>
                        </div>

                        <button
                          className="card-details-link"
                          onClick={() => setSelectedCat(cat)}
                        >
                          Discover this cat <span>→</span>
                        </button>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}

        {/* About section */}
        <section className="about-section" id="about">
          <span className="section-tag">A LITTLE ABOUT US</span>

          <h2>A happy place for cat lovers.</h2>

          <p>
            Cat World brings adorable cat photography into one
            simple gallery. Explore images, discover your
            favourites, and collect your favourite cats in one place.
          </p>

          <div className="about-features">
            <div>
              <span>🐾</span>
              <h3>Explore</h3>
              <p>Discover new cat images from The Cat API.</p>
            </div>

            <div>
              <span>♥</span>
              <h3>Collect</h3>
              <p>Save and remove your favourite cats with one click.</p>
            </div>

            <div>
              <span>🐱</span>
              <h3>Discover</h3>
              <p>Open each image to see its details.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <a
          href="#home"
          className="footer-brand"
          onClick={(event) => {
            event.preventDefault();
            goToPage('home');
          }}
        >
          ♥ Cat World
        </a>

        <p>Made with love for every cat lover. 🐾</p>

        <span className="copyright">
          Powered by The Cat API
        </span>
      </footer>
    </div>
  );
}

export default App;






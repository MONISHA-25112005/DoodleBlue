
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import headerImage from "../assets/header-img.png";

function Home() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("chicken");

  useEffect(() => {
    dispatch(fetchProducts("chicken"));
  }, [dispatch]);

  function handleSearch(event) {
    event.preventDefault();
    const query = search.trim();

    if (query) {
      dispatch(fetchProducts(query));
    }
  }

  function handleRetry() {
    dispatch(fetchProducts(search.trim() || "chicken"));
  }

  return (
    <main className="page-container home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>ShopKart Foods</h1>
          <p>Discover delicious meals for your day!</p>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search meals, e.g. chicken, biryani, pasta..."
              aria-label="Search meals"
            />

            <button type="submit" disabled={status === "loading"}>
              Search →
            </button>
          </form>
        </div>

        <div className="hero-image-container">
          <img
            src={headerImage}
            alt="Chicken biryani with floating tomatoes, herbs and chillies"
            className="hero-food-image"
          />
        </div>
      </section>

      {status === "loading" && (
        <p className="loading-message">Loading delicious meals...</p>
      )}

      {status === "failed" && (
        <div className="error-message">
          <p>{error || "Unable to load meals."}</p>
          <button type="button" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      )}

      {status === "succeeded" && items.length === 0 && (
        <div className="empty-results">
          <h2>No meals found</h2>
          <p>Try searching for chicken, pasta, curry or beef.</p>
        </div>
      )}

      {status === "succeeded" && items.length > 0 && (
        <section className="products-section">
          <div className="products-heading">
            <h2>Explore Our Meals</h2>
            <p>{items.length} meals found</p>
          </div>

          <div className="product-grid">
            {items.map((food) => (
              <ProductCard key={food.id} product={food} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Home;

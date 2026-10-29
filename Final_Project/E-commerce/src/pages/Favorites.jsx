
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../features/cart/cartSlice";
import { useShop } from "../context/ShopContext";
import headerImage from "../assets/header-img.png";

function Favorites() {
  const dispatch = useDispatch();
  const { favorites, toggleFavorite, showImages } = useShop();

  function clearFavorites() {
    favorites.forEach((food) => toggleFavorite(food));
  }

  return (
    <main className="favorites-page">
      <section className="favorites-hero">
        <div className="favorites-hero-content">
          <div className="favorites-heart">♥</div>

          <div>
            <p className="favorites-eyebrow">MADE WITH LOVE</p>
            <h1>My Favorite Meals</h1>
            <p className="favorites-subtitle">
              Your saved delicious moments
            </p>

            <span className="favorites-count">
              ♥ {favorites.length} favorite meals
            </span>
          </div>
        </div>

        <div className="favorites-hero-image">
          {showImages && (
            <img src={headerImage} alt="Delicious food" />
          )}
        </div>
      </section>

      <section className="favorites-content">
        <div className="favorites-heading">
          <div>
            <h2>Your Favorites</h2>
            <p>Here are the meals you love the most!</p>
          </div>

          {favorites.length > 0 && (
            <button
              type="button"
              className="clear-favorites-btn"
              onClick={clearFavorites}
            >
              ♡ Clear All Favorites
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <div className="empty-heart">♡</div>
            <h2>No favorite meals yet!</h2>
            <p>
              Save the foods you love and find them here anytime.
            </p>
            <Link to="/" className="explore-foods-btn">
              Explore Foods →
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((food) => (
              <article className="favorite-card" key={food.id}>
                <div className="favorite-card-image">
                  <Link to={`/product/${food.id}`}>
                    {showImages && food.image ? (
                      <img src={food.image} alt={food.title} />
                    ) : (
                      <div className="favorite-image-placeholder">
                        Food image
                      </div>
                    )}
                  </Link>

                  <button
                    type="button"
                    className="favorite-heart-btn"
                    onClick={() => toggleFavorite(food)}
                    aria-label={`Remove ${food.title} from favorites`}
                    title="Remove from favorites"
                  >
                    ♥
                  </button>
                </div>

                <div className="favorite-card-info">
                  <p className="favorite-category">
                    {food.category || "Meals"}
                  </p>

                  <Link
                    to={`/product/${food.id}`}
                    className="favorite-title"
                  >
                    {food.title}
                  </Link>

                  <p className="favorite-rating">
                    <span>★</span> {food.rating || 4.5}
                    <span className="rating-note">
                      {" "}· Demo rating
                    </span>
                  </p>

                  <p className="favorite-price">
                    ₹{Number(food.price || 0).toFixed(2)}
                  </p>

                  <div className="favorite-card-actions">
                    <Link
                      to={`/product/${food.id}`}
                      className="view-details-btn"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      className="favorite-add-btn"
                      onClick={() => dispatch(addToCart(food))}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Favorites;

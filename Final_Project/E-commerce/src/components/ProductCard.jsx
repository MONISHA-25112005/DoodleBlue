
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

import { useShop } from "../context/ShopContext";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find(
      (item) => String(item.id) === String(product.id)
    )
  );

  const { favorites, toggleFavorite, showImages } = useShop();

  const isFavorite = favorites.some(
    (item) => String(item.id) === String(product.id)
  );

  return (
    <article className="product-card">
      <button
        type="button"
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={() => toggleFavorite(product)}
        aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
      >
        {isFavorite ? "♥" : "♡"}
      </button>

      <Link to={`/product/${product.id}`} className="product-image-link">
        {showImages && product.image ? (
          <img
            className="product-image"
            src={product.image}
            alt={product.title}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">Image unavailable</div>
        )}
      </Link>

      <div className="product-info">
        <p className="product-category">
          {product.category || "Meals"}
        </p>

        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <p className="rating">
          ★ {product.rating || 4.5}
          <span> · Demo rating</span>
        </p>

        <p className="product-price">
          ₹{Number(product.price || 0).toFixed(2)}
        </p>

        <div className="product-actions">
          {cartItem ? (
            <div className="quantity-control">
              <button
                type="button"
                onClick={() => dispatch(decreaseQuantity(product.id))}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="quantity">{cartItem.quantity}</span>

              <button
                type="button"
                onClick={() => dispatch(increaseQuantity(product.id))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="add-cart-btn"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

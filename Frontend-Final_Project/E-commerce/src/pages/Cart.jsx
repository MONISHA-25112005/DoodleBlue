
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  selectTotalItems,
  selectTotalPrice,
} from "../features/cart/cartSlice";

import { useShop } from "../context/ShopContext";

function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectTotalPrice);

  const { placeOrder } = useShop();

  const shipping = subtotal >= 100 ? 0 : items.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  function handleOrder() {
    if (items.length === 0) return;

    placeOrder(items, total);
    dispatch(clearCart());
    window.alert("Your demo order has been placed!");
  }

  if (items.length === 0) {
    return (
      <section className="page-container empty-cart">
        <h1>Your Cart Is Empty</h1>
        <p>Browse meals and add your favourites to the cart.</p>
        <Link to="/">Browse Products</Link>
      </section>
    );
  }

  return (
    <section className="page-container">
      <h1>Your Cart ({totalItems} items)</h1>

      <button type="button" onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>

      <div className="cart-layout">
        <div>
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              {item.image && (
                <img src={item.image} alt={item.title} />
              )}

              <div className="cart-item-info">
                <h3>{item.title}</h3>

                <p>₹{Number(item.price).toFixed(2)} each</p>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    −
                  </button>

                  <span className="quantity">{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>

                <p>
                  Line total: ₹
                  {(Number(item.price) * item.quantity).toFixed(2)}
                </p>

                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          <p>Items: {totalItems}</p>
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>
            Shipping: {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
          </p>
          <h3>Total: ₹{total.toFixed(2)}</h3>

          <button type="button" onClick={handleOrder}>
            Place Order
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Cart;

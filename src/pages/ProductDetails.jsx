
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { getProductById } from "../api/foodApi";
// import {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "../features/cart/cartSlice";

// function ProductDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const cartItems = useSelector((state) => state.cart.items);

//   const cartItem = cartItems.find(
//     (item) => String(item.id) === String(id)
//   );

//   useEffect(() => {
//     let cancelled = false;

//     async function loadProduct() {
//       setLoading(true);
//       setError("");
//       setProduct(null);
//       setQuantity(1);

//       try {
//         const data = await getProductById(id);

//         if (!cancelled) {
//           setProduct(data);
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setError(err.message || "Unable to load food details.");
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     }

//     loadProduct();

//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   function handleAddToCart() {
//     if (!product) return;

//     for (let i = 0; i < quantity; i++) {
//       dispatch(addToCart(product));
//     }
//   }

//   if (loading) {
//     return (
//       <main className="page-container">
//         <p>Loading food details...</p>
//       </main>
//     );
//   }

//   if (error || !product) {
//     return (
//       <main className="page-container">
//         <h2>Food details unavailable</h2>
//         <p>{error || "Food not found."}</p>

//         <button
//           onClick={() => {
//             setProduct(null);
//             setLoading(true);
//             setError("");

//             getProductById(id)
//               .then(setProduct)
//               .catch((err) =>
//                 setError(err.message || "Unable to load food details.")
//               )
//               .finally(() => setLoading(false));
//           }}
//         >
//           Retry
//         </button>

//         <p>
//           <Link to="/">Back to Home</Link>
//         </p>
//       </main>
//     );
//   }

//   return (
//     <main className="page-container">
//       <p>
//         <Link to="/">← Back to Foods</Link>
//       </p>

//       <section className="detail-layout">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="detail-image"
//         />

//         <div className="detail-info">
//           <h1>{product.title}</h1>

//           <p>Category: {product.category}</p>
//           <p>Cuisine: {product.area}</p>
//           <p>⭐ {product.rating}</p>

//           <h2>₹{product.price}</h2>
//           <p className="demo-price-note">
//             Demo price — not provided by the API.
//           </p>

//           <div className="quantity-controls">
//             <button
//               onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//               disabled={quantity <= 1}
//             >
//               −
//             </button>

//             <span>{quantity}</span>

//             <button onClick={() => setQuantity((q) => q + 1)}>
//               +
//             </button>
//           </div>

//           <button onClick={handleAddToCart}>
//             Add {quantity} to Cart
//           </button>

//           {cartItem && (
//             <div className="quantity-controls">
//               <button
//                 onClick={() => dispatch(decreaseQuantity(product.id))}
//               >
//                 −
//               </button>

//               <span>In cart: {cartItem.quantity}</span>

//               <button
//                 onClick={() => dispatch(increaseQuantity(product.id))}
//               >
//                 +
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       <section className="product-description">
//         <h2>Cooking Instructions</h2>
//         <p>{product.description || "No instructions available."}</p>
//       </section>

//       <section className="product-ingredients">
//         <h2>Ingredients</h2>

//         {product.ingredients.length > 0 ? (
//           <ul>
//             {product.ingredients.map((ingredient, index) => (
//               <li key={`${ingredient}-${index}`}>{ingredient}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No ingredients available.</p>
//         )}
//       </section>
//     </main>
//   );
// }

// export default ProductDetails;



import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductById } from "../api/foodApi";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cartItems = useSelector((state) => state.cart.items);

  const cartItem = cartItems.find(
    (item) => String(item.id) === String(id)
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const data = await getProductById(id);

        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load food details.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="page-container">
        <p>Loading food details...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page-container">
        <h2>Unable to load food</h2>
        <p>{error || "Food not found."}</p>

        <button
          onClick={() => {
            setLoading(true);
            setError("");

            getProductById(id)
              .then((data) => {
                setProduct(data);
                setError("");
              })
              .catch((err) => {
                setError(err.message || "Failed to load food details.");
              })
              .finally(() => setLoading(false));
          }}
        >
          Retry
        </button>

        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </main>
    );
  }

  const ingredients = product.ingredients || [];

  return (
    <main className="page-container">
      <p>
        <Link to="/">← Back to Foods</Link>
      </p>

      <section className="detail-layout">
        <img
          src={product.image}
          alt={product.title}
          className="detail-image"
        />

        <div className="detail-info">
          <h1>{product.title}</h1>

          <p>Category: {product.category}</p>
          <p>Cuisine: {product.area}</p>
          <p>⭐ {product.rating || 4.5}</p>

          <h2>₹{product.price}</h2>
          <small>Demo price</small>

          {cartItem ? (
            <div className="quantity-controls">
              <button
                onClick={() => dispatch(decreaseQuantity(product.id))}
              >
                −
              </button>

              <span>{cartItem.quantity} in cart</span>

              <button
                onClick={() => dispatch(increaseQuantity(product.id))}
              >
                +
              </button>
            </div>
          ) : (
            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          )}
        </div>
      </section>

      <section className="product-description">
        <h2>Cooking Instructions</h2>
        <p>{product.description || "No instructions available."}</p>
      </section>

      <section className="product-ingredients">
        <h2>Ingredients</h2>

        {ingredients.length > 0 ? (
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients available.</p>
        )}
      </section>
    </main>
  );
}

export default ProductDetails;

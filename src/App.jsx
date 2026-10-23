
import { Link, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Orders from "./pages/Orders";

import "./app.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />

          <Route
            path="*"
            element={
              <section className="page-container not-found">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <Link to="/">Back to Home</Link>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        ShopKart · E-commerce training project
      </footer>
    </>
  );
}

export default App;


import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../features/cart/cartSlice";
import { useShop } from "../context/ShopContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = useSelector(selectTotalItems);
  const { showImages, setShowImages } = useShop();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        ShopKart
      </Link>

      <div className="navbar-actions">
        <button
          type="button"
          className="image-toggle"
          onClick={() =>
            setShowImages((current) => !current)
          }
        >
          {showImages ? "Hide Images" : "Show Images"}
        </button>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "opened" : ""}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="menu-backdrop"
            aria-label="Close navigation"
            onClick={closeMenu}
          />

          <nav className="nav-links">
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/favorites" onClick={closeMenu}>
              Favorites
            </NavLink>

            <NavLink to="/orders" onClick={closeMenu}>
              Orders
            </NavLink>

            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>

            <NavLink to="/cart" onClick={closeMenu}>
              Cart ({cartCount})
            </NavLink>
          </nav>
        </>
      )}
    </header>
  );
}

export default Navbar;

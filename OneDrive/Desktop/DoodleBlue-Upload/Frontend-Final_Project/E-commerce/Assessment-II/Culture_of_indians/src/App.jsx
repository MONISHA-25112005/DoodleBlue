import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";

import Home from "./pages/home.jsx";
import Favorites from "./pages/favorites.jsx";
import About from "./pages/about.jsx";
import "./App.css";
import customTemples from "./data/customTemples.js";

const API_URL = "/temples-api?limit=100";

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sacred-favorites")) || [];
    } catch {
      return [];
    }
  });

  const fetchTemples = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json();

      if (!Array.isArray(result.data)) {
        throw new Error("Temple data is not available.");
      }

      const formattedTemples = result.data.map((temple, index) => ({
        id: String(temple.id ?? temple.slug ?? index),
        name: temple.name || temple.title || "Unnamed Temple",
        state: temple.state_name || "",
        district: temple.district_name || "",
        description:
          temple.description ||
          temple.history ||
          temple.bio ||
          `${temple.name || "This temple"} is a part of India's sacred heritage.`,
        image: temple.cover_image_url || "",
        architecture: temple.architecture_style || "",
      }));

      setTemples([...formattedTemples, ...customTemples]);
    } catch (err) {
      console.error("Temple API error:", err);
      setError(
        "Unable to load temples. Check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemples();
  }, [fetchTemples]);

  useEffect(() => {
    localStorage.setItem("sacred-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (temple) => {
    setFavorites((previous) => {
      const exists = previous.some((item) => item.id === temple.id);

      if (exists) {
        return previous.filter((item) => item.id !== temple.id);
      }

      return [...previous, temple];
    });
  };

  const sharedData = {
    temples,
    favorites,
    loading,
    error,
    fetchTemples,
    toggleFavorite,
  };

  return (
    <div className="app-shell">
      <header className="site-header">
  <NavLink to="/" className="brand">
    <span className="brand-symbol">ॐ</span>
    <span>
      <strong>Sacred Heritage</strong>
      <small>Temples of India</small>
    </span>
  </NavLink>

  <button
    className="menu-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Toggle navigation"
    aria-expanded={menuOpen}
  >
    {menuOpen ? "✕" : "☰"}
  </button>

  <nav className={`navigation ${menuOpen ? "open" : ""}`}>
    <NavLink to="/" end onClick={() => setMenuOpen(false)}>
      Home
    </NavLink>
    <NavLink to="/favorites" onClick={() => setMenuOpen(false)}>
      Favorites ({favorites.length})
    </NavLink>
    <NavLink to="/about" onClick={() => setMenuOpen(false)}>
      About
    </NavLink>
  </nav>
</header>
      <main className="page-content">
        <Outlet context={sharedData} />
      </main>

      <footer className="site-footer">
        <p>ॐ Preserve Our Heritage · Celebrate Our Divinity ॐ</p>
        <small>Discover the timeless spiritual treasures of India</small>
      </footer>
    </div>
  );
}

export function useTempleData() {
  return useOutletContext();
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

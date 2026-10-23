
import {
  createContext,
  useContext,
  useState,
} from "react";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showImages, setShowImages] = useState(true);

  function toggleFavorite(product) {
    setFavorites((previous) => {
      const exists = previous.some(
        (item) => item.id === product.id
      );

      return exists
        ? previous.filter((item) => item.id !== product.id)
        : [...previous, product];
    });
  }

  function placeOrder(items, total) {
    const newOrder = {
      id: Date.now(),
      items: items.map((item) => ({ ...item })),
      total,
      date: new Date().toLocaleString(),
      status: "Placed",
    };

    setOrders((previous) => [newOrder, ...previous]);
    return newOrder;
  }

  return (
    <ShopContext.Provider
      value={{
        favorites,
        toggleFavorite,
        orders,
        placeOrder,
        showImages,
        setShowImages,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShop must be used inside ShopProvider"
    );
  }

  return context;
}

import { useShop } from "../context/ShopContext";

function Orders() {
  const { orders } = useShop();

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    const value = (status || "Processing").toLowerCase();

    if (value.includes("deliver")) return "delivered";
    if (value.includes("cancel")) return "cancelled";
    if (
      value.includes("way") ||
      value.includes("ship") ||
      value.includes("transit")
    ) {
      return "on-the-way";
    }

    return "processing";
  };

  return (
    <section className="page-container orders-page">
      {/* Page heading */}
      <div className="orders-header">
        <div className="orders-icon">📦</div>

        <div>
          <h1>My Orders</h1>
          <p>Track your delicious journey</p>
        </div>
      </div>

      {/* Empty orders */}
      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon">🛍️</div>
          <h2>No orders yet</h2>
          <p>Your delicious journey starts with your first order!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const total = Number(order.total) || 0;

            return (
              <article className="order-card" key={order.id}>
                {/* First product image */}
                <div className="order-image-wrapper">
                  {order.items?.[0]?.image ? (
                    <img
                      src={order.items[0].image}
                      alt={order.items[0].title || "Ordered product"}
                      className="order-image"
                    />
                  ) : (
                    <div className="order-image-placeholder">🍽️</div>
                  )}
                </div>

                {/* Order information */}
                <div className="order-info">
                  <h3>Order #{order.id}</h3>

                  <p className="order-date">
                    {formatDate(order.date)}
                  </p>

                  <p className="order-items">
                    <span className="order-items-icon">🛒</span>{" "}
                    {order.items
                      ?.map(
                        (item) =>
                          `${item.title} × ${item.quantity}`
                      )
                      .join(", ") || "No items"}
                  </p>

                  <p className="order-total">
                    Total: ₹{total.toFixed(2)}
                  </p>
                </div>

                {/* Status and details */}
                <div className="order-actions">
                  <span
                    className={`order-status ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status || "Processing"}
                  </span>

                  <button
                    type="button"
                    className="order-details-btn"
                    onClick={() => {
                      alert(
                        `Order #${order.id}\n\n` +
                        `Status: ${order.status || "Processing"}\n` +
                        `Total: ₹${total.toFixed(2)}\n\n` +
                        (order.items || [])
                          .map(
                            (item) =>
                              `${item.title} × ${item.quantity}`
                          )
                          .join("\n")
                      );
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Orders;
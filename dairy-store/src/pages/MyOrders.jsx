import { useEffect, useState } from "react";

const API = "http://localhost:5001/v1/orders";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function request(url, options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      window.location.href = "/login";
      throw new Error("Please login again");
    }

    if (!response.ok) {
      throw new Error(result.message || "Request failed");
    }

    return result;
  }

  async function loadOrders() {
    try {
      const result = await request(API);
      setOrders(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function cancelOrder(orderId) {
    if (!window.confirm(`Order #${orderId} cancel karna hai?`)) return;

    try {
      await request(`${API}/${orderId}/cancel`, { method: "PUT" });
      await loadOrders();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>Aapne abhi tak koi order nahi diya.</p>
      )}

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <h3>Order #{order.id}</h3>

          <p>
            {new Date(order.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}{" "}
            | Status: {order.status}
          </p>

          <ul>
            {(order.items || []).map((item, index) => (
              <li key={index}>
                {item.name} × {item.quantity} = ₹
                {Number(item.price) * item.quantity}
              </li>
            ))}
          </ul>

          <p>Delivery: {order.address}</p>
          <strong>Total: ₹{Number(order.total)}</strong>

          {order.status === "placed" && (
            <p>
              <button onClick={() => cancelOrder(order.id)}>
                Cancel Order
              </button>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
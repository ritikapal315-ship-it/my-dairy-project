import { useEffect, useState } from "react";
import API_BASE from "../api";
const API = "http://localhost:5001/v1/wishlist";

function MyProducts({ addToCart }) {
  const [items, setItems] = useState([]);
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

  async function loadWishlist() {
    try {
      const result = await request(API);
      setItems(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWishlist();
  }, []);

  // item.id = product ki id, item.wishlist_id = wishlist row ki id
  async function removeItem(productId) {
    try {
      await request(`${API}/${productId}`, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishes Product</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p>Aapki wishlist khali hai. Products page par ♡ dabake saaman jodo.</p>
      )}

      {items.map((item) => (
        <div className="wishlist-item" key={item.wishlist_id}>
          <h2>{item.name}</h2>
          <p>₹{Number(item.price)}</p>

          {addToCart && (
            <button
              disabled={item.stock === 0}
              onClick={() => addToCart(item.id)}
            >
              {item.stock === 0 ? "Out of stock" : "Add to Cart"}
            </button>
          )}

          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default MyProducts;
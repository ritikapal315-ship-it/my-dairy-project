import { useEffect, useState } from "react";

const API = "http://localhost:5001/v1";
const categories = ["All", "Milk", "Curd", "Paneer", "Butter", "Ghee"];

const emojiByName = {
  milk: "🥛",
  curd: "🥣",
  paneer: "🧀",
  butter: "🧈",
  ghee: "🫙"
};

function Products({ addToCart }) {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${API}/products`);
        const result = await response.json();

        if (!response.ok) {
          setError(result.message || "Products load nahi hue");
          return;
        }

        setProducts(result.data);

        // Wishlist alag se laao, fail ho to bhi products dikhein
        if (token) {
          try {
            const wishResponse = await fetch(`${API}/wishlist`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const wishResult = await wishResponse.json();

            if (wishResponse.ok) {
              // item.id = product ki id
              setWishlistIds(wishResult.data.map((item) => item.id));
            }
          } catch (err) {
            // wishlist load na ho to bhi page chalega
          }
        }
      } catch (err) {
        setError("Server se connect nahi ho paya");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function toggleWishlist(productId) {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const alreadySaved = wishlistIds.includes(productId);

    try {
      const response = await fetch(
        alreadySaved ? `${API}/wishlist/${productId}` : `${API}/wishlist`,
        {
          method: alreadySaved ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: alreadySaved ? undefined : JSON.stringify({ productId })
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        alert(result.message || "Wishlist update nahi hui");
        return;
      }

      setWishlistIds((prev) =>
        alreadySaved
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    } catch (err) {
      alert("Server se connect nahi ho paya");
    }
  }

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) =>
          product.name.toLowerCase().includes(category.toLowerCase())
        );

  return (
    <div className="products">
      <h1>Our Dairy Products</h1>

      <p className="products-intro">
        Fresh and healthy dairy products for you.
      </p>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "active-filter" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && filteredProducts.length === 0 && (
        <p>Koi product nahi mila.</p>
      )}

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            {/* Wishlist */}
            <button
              className="wishlist-btn"
              onClick={() => toggleWishlist(product.id)}
            >
              {wishlistIds.includes(product.id) ? "♥" : "♡"}
            </button>

            {/* Product Image */}
            <div className="product-image">
              {emojiByName[product.name.toLowerCase()] || "🫙"}
            </div>

            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <strong>₹{Number(product.price)}</strong>

            {product.stock === 0 && <p>Out of stock</p>}

            {/* Add To Cart */}
            <button
              className="add-cart-btn"
              disabled={product.stock === 0}
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
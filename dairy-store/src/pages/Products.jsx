import { useEffect, useState } from "react";

const categories = ["All", "Milk", "Curd", "Paneer", "Butter", "Ghee"];

const emojiByName = {
  milk: "🥛",
  curd: "🥣",
  paneer: "🧀",
  butter: "🧈",
  ghee: "🫙"
};

function Products({ addToCart }) {
  const [wishlist, setWishlist] = useState([]);
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:5001/v1/products");
        const result = await response.json();

        if (!response.ok) {
          setError(result.message || "Products load nahi hue");
          return;
        }

        setProducts(result.data);
      } catch (err) {
        setError("Server se connect nahi ho paya");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (product) => product.name.toLowerCase().includes(category.toLowerCase())
        );

  const addToWishlist = (name) => {
    setWishlist((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

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
              onClick={() => addToWishlist(product.name)}
            >
              {wishlist.includes(product.name) ? "♥" : "♡"}
            </button>

            {/* Product Image */}
            <div className="product-image">
              {emojiByName[product.name.toLowerCase()] || "🥛"}
            </div>

            {/* Product Name */}
            <h2>{product.name}</h2>

            {/* Description */}
            <p>{product.description}</p>

            {/* Price */}
            <strong>₹{Number(product.price)}</strong>

            {product.stock === 0 && <p>Out of stock</p>}

            {/* Add To Cart */}
            <button
              className="add-cart-btn"
              disabled={product.stock === 0}
              onClick={() => addToCart(product.name)}
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
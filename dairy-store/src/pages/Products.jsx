function Products({ addToCart }) {
  return (
    <div className="products">

      <h1>Our Dairy Products</h1>

      <p className="products-intro">
        Fresh and healthy dairy products for you.
      </p>

      <div className="product-list">

        {/* Milk */}
        <div className="product-card">
          <div className="product-image">🥛</div>

          <h2>Milk</h2>

          <p>Fresh and pure milk.</p>

          <strong>₹60 / litre</strong>

          <button
            className="add-cart-btn"
            onClick={() => addToCart("Milk")}
          >
            Add to Cart
          </button>
        </div>


        {/* Curd */}
        <div className="product-card">
          <div className="product-image">🥣</div>

          <h2>Curd</h2>

          <p>Fresh and creamy curd.</p>

          <strong>₹50 / 500g</strong>

          <button
            className="add-cart-btn"
            onClick={() => addToCart("Curd")}
          >
            Add to Cart
          </button>
        </div>


        {/* Paneer */}
        <div className="product-card">
          <div className="product-image">🧀</div>

          <h2>Paneer</h2>

          <p>Soft and fresh paneer.</p>

          <strong>₹250 / kg</strong>

          <button
            className="add-cart-btn"
            onClick={() => addToCart("Paneer")}
          >
            Add to Cart
          </button>
        </div>


        {/* Butter */}
        <div className="product-card">
          <div className="product-image">🧈</div>

          <h2>Butter</h2>

          <p>Rich and creamy butter.</p>

          <strong>₹55 / 100g</strong>

          <button
            className="add-cart-btn"
            onClick={() => addToCart("Butter")}
          >
            Add to Cart
          </button>
        </div>


        {/* Ghee */}
        <div className="product-card">
          <div className="product-image">🫙</div>

          <h2>Ghee</h2>

          <p>Pure and healthy ghee.</p>

          <strong>₹550 / litre</strong>

          <button
            className="add-cart-btn"
            onClick={() => addToCart("Ghee")}
          >
            Add to Cart
          </button>
        </div>

      </div>

    </div>
  );
}

export default Products;



function Products({ cart, setCart }) {
  

  return (
    <div className="products">

      <p>Cart Items: {cart.length}</p>

      <h1>Our Dairy Products</h1>

      <p className="products-intro">
        Fresh and healthy dairy products for you.
      </p>

      <div className="product-list">

        <div className="product-card">
          <div className="product-image">🥛</div>
          <h2>Milk</h2>
          <p>Fresh and pure milk.</p>
          <strong>₹60 / litre</strong>

          <button
            className="add-cart-btn"
            onClick={() =>
               setCart([...cart, { name: "Milk", quantity: 1 }])
              }
          >
            Add to Cart
          </button>
        </div>

        <div className="product-card">
          <div className="product-image">🥣</div>
          <h2>Curd</h2>
          <p>Fresh and creamy curd.</p>
          <strong>₹50 / 500g</strong>

          <button
            className="add-cart-btn"
            onClick={() =>
                 setCart([...cart, { name: "Curd", quantity: 1 }])
             }
          >
            Add to Cart
          </button>
        </div>

        <div className="product-card">
          <div className="product-image">🧀</div>
          <h2>Paneer</h2>
          <p>Soft and fresh paneer.</p>
          <strong>₹250 / kg</strong>

          <button
            className="add-cart-btn"
            onClick={() =>
               setCart([...cart, { name: "Paneer", quantity: 1 }])
              }
          >
            Add to Cart
          </button>
        </div>

        <div className="product-card">
          <div className="product-image">🧈</div>
          <h2>Butter</h2>
          <p>Rich and creamy butter.</p>
          <strong>₹55 / 100g</strong>

          <button
            className="add-cart-btn"
            onClick={() =>
               setCart([...cart, { name: "Butter", quantity: 1 }])
              }
          >
            Add to Cart
          </button>
        </div>

        <div className="product-card">
          <div className="product-image">🫙</div>
          <h2>Ghee</h2>
          <p>Pure and healthy ghee.</p>
          <strong>₹550 / litre</strong>

          <button
            className="add-cart-btn"
            onClick={() =>
               setCart([...cart, { name: "Ghee", quantity: 1 }])
              }
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default Products;



import {useEffect, useState } from "react";

function Products({ addToCart }) {
  const [wishlist, setWishlist] = useState([]);
  const [category, setCategory] = useState("All");
  useEffect(() => {
  fetch("https://dummyjson.com/Products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.Products);
    });
}, []);

  const products = [
    {
      name: "Milk",
      category: "Milk",
      image: "🥛",
      description: "Fresh and pure milk.",
      price: "₹60 / litre"
    },
    {
      name: "Curd",
      category: "Curd",
      image: "🥣",
      description: "Fresh and creamy curd.",
      price: "₹50 / 500g"
    },
    {
      name: "Paneer",
      category: "Paneer",
      image: "🧀",
      description: "Soft and fresh paneer.",
      price: "₹250 / kg"
    },
    {
      name: "Butter",
      category: "Butter",
      image: "🧈",
      description: "Rich and creamy butter.",
      price: "₹55 / 100g"
    },
    {
      name: "Ghee",
      category: "Ghee",
      image: "🫙",
      description: "Pure and healthy ghee.",
      price: "₹550 / litre"
    }
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (product) => product.category === category
        );

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.includes(product)) {
        return prev;
      }

      return [...prev, product];
    });
  };

  return (
    <div className="products">

      <h1>Our Dairy Products</h1>

      <p className="products-intro">
        Fresh and healthy dairy products for you.
      </p>

      {/* Filter Buttons */}
      <div className="filter-buttons">

        <button
  className={category === "All" ? "active-filter" : ""}
  onClick={() => setCategory("All")}
>
  All
</button>
  <button
    className={category === "Milk" ? "active-filter" : ""}
    onClick={() => setCategory("Milk")}
  >
    Milk
  </button>

  <button
    className={category === "Curd" ? "active-filter" : ""}
    onClick={() => setCategory("Curd")}
  >
    Curd
  </button>

  <button
    className={category === "Paneer" ? "active-filter" : ""}
    onClick={() => setCategory("Paneer")}
  >
    Paneer
  </button>

  <button
    className={category === "Butter" ? "active-filter" : ""}
    onClick={() => setCategory("Butter")}
  >
    Butter
  </button>

  <button
    className={category === "Ghee" ? "active-filter" : ""}
    onClick={() => setCategory("Ghee")}
  >
    Ghee
  </button>


        
  
        

      </div>

      {/* Product List */}
      <div className="product-list">

        {filteredProducts.map((product) => (

          <div
            className="product-card"
            key={product.name}
          >

            {/* Wishlist */}
            <button
              className="wishlist-btn"
              onClick={() => addToWishlist(product.name)}
            >
              {wishlist.includes(product.name)
                ? "♥"
                : "♡"}
            </button>

            {/* Product Image */}
            <div className="product-image">
              {product.image}
            </div>

            {/* Product Name */}
            <h2>{product.name}</h2>

            {/* Description */}
            <p>{product.description}</p>

            {/* Price */}
            <strong>{product.price}</strong>

            {/* Add To Cart */}
            <button
              className="add-cart-btn"
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


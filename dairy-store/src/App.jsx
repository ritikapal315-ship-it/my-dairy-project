import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(productName) {
    const productExists = cart.find(
      (item) => item.name === productName
    );

    if (productExists) {
      const updatedCart = cart.map((item) => {
        if (item.name === productName) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      setCart(updatedCart);
    } else {
      const newProduct = {
        name: productName,
        quantity: 1,
      };

      setCart([...cart, newProduct]);
    }
  }

  function updateQuantity(index, change) {
    const updatedCart = [...cart];

    updatedCart[index].quantity += change;

    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }

    setCart(updatedCart);
  }

  function removeFromCart(index) {
    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);
  }

  return (
    <BrowserRouter>

      <Header cart={cart} />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

       <Route
  path="/products"
  element={
    <Products
      addToCart={addToCart}
    />
  }
/>

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
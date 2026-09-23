import { useState } from "react";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyProducts from "./pages/MyProducts";

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
     <div className="app">

      <Header cart={cart} />
      <main className="main-content">

      <Routes>
        <Route
           path="/signup"
           element={<Signup />}
        />
        <Route
            path="/login"
            element={<Login />}
        />
        <Route
             path="/about"
            element={<About />}
         />

       <Route
            path="/contact"
            element={<Contact />}
         />

        <Route
          path="/"
          element={<Home />}
        />

 <Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products addToCart={addToCart}  />
    </ProtectedRoute>
  }
/>
  

        <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart 
      cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart} />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-products"
  element={
    <ProtectedRoute>
   
      <MyProducts />
    </ProtectedRoute>
  }
/>
          
        

      </Routes>
      </main>



      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
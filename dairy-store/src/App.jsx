import { useState, useEffect } from "react";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
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
import GheePage from "./pages/GheePage";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const CART_API = "http://localhost:5001/v1/cart";
const ORDER_API = "http://localhost:5001/v1/orders";

// Har cart request token ke saath jaati hai
async function cartRequest(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  // Token expire ya galat: dobara login karwao
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

function App() {
  const [cart, setCart] = useState([]);

  async function loadCart() {
    if (!localStorage.getItem("token")) {
      setCart([]);
      return;
    }

    try {
      const result = await cartRequest(CART_API);
      setCart(result.data);
    } catch (err) {
      setCart([]);
    }
  }

  // Page khulte hi cart database se laao
  useEffect(() => {
    loadCart();
  }, []);

  async function addToCart(productId) {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
      return;
    }

    try {
      await cartRequest(CART_API, {
        method: "POST",
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });
      await loadCart();
    } catch (err) {
      alert(err.message);
    }
  }

  async function removeFromCart(productId) {
    try {
      await cartRequest(`${CART_API}/${productId}`, { method: "DELETE" });
      await loadCart();
    } catch (err) {
      alert(err.message);
    }
  }

  async function placeOrder(address) {
    try {
      const result = await cartRequest(ORDER_API, {
        method: "POST",
        body: JSON.stringify({ address }),
      });
      await loadCart();
      alert(`Order placed! Total: ₹${Number(result.data.total)}`);
      return true;
    } catch (err) {
      alert(err.message);
      return false;
    }
  }

  async function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      await cartRequest(`${CART_API}/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: newQuantity }),
      });
      await loadCart();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header cart={cart} />
        <main className="main-content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products addToCart={addToCart} />
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
                    removeFromCart={removeFromCart}
                    placeOrder={placeOrder}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-products"
              element={
                <ProtectedRoute>
                  <MyProducts addToCart={addToCart} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

            <Route path="/ghee" element={<GheePage addToCart={addToCart} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
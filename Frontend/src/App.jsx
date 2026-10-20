
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
import API_BASE from "./api";

const CART_API = `${API_BASE}/cart`;
const ORDER_API = `${API_BASE}/orders`;

// Har cart request token ke saath jaati hai
async function cartRequest(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  // Token expire ya galat ho toh dobara login karwao
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
  const [toast, setToast] = useState("");

  // Chhota message dikhao
  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(""), 2000);
  }

  // Database se cart load karo
  async function loadCart() {
    if (!localStorage.getItem("token")) {
      setCart([]);
      return;
    }

    try {
      const result = await cartRequest(CART_API);
      setCart(result.data || []);
    } catch (err) {
      setCart([]);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  // Cart mein product add karo
  async function addToCart(productId) {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
      return;
    }

    try {
      await cartRequest(CART_API, {
        method: "POST",
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      await loadCart();
      showToast("Added to cart");
    } catch (err) {
      alert(err.message || "Product cart mein add nahi hua");
      throw err;
    }
  }

  // Cart se product remove karo
  async function removeFromCart(productId) {
    try {
      await cartRequest(`${CART_API}/${productId}`, {
        method: "DELETE",
      });

      await loadCart();
    } catch (err) {
      alert(err.message || "Product remove nahi hua");
    }
  }

  // Order place karo
  async function placeOrder(address, paymentMethod) {
    try {
      const result = await cartRequest(ORDER_API, {
        method: "POST",
        body: JSON.stringify({
          address,
          paymentMethod,
        }),
      });

      await loadCart();

      alert(`Order placed! Total: ₹${Number(result.data.total)}`);

      return true;
    } catch (err) {
      alert(err.message || "Order place nahi ho paya");
      return false;
    }
  }

  // Product quantity update karo
  async function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      await cartRequest(`${CART_API}/${productId}`, {
        method: "PUT",
        body: JSON.stringify({
          quantity: newQuantity,
        }),
      });

      await loadCart();
    } catch (err) {
      alert(err.message || "Quantity update nahi hui");
    }
  }

  return (
    <BrowserRouter>
      <div className="app">
        {toast && <div className="toast">{toast}</div>}

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

            <Route
              path="/ghee"
              element={<GheePage addToCart={addToCart} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ cart }) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser")
  );

  // loggedInUser string hai, usme se role nikalne ke liye parse karte hain
  let user = null;
  try {
    user = loggedInUser ? JSON.parse(loggedInUser) : null;
  } catch (err) {
    user = null;
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setLoggedInUser(null);
    alert("Logged out successfully!");
    window.location.href = "/login";
  }

  return (
    <header className="header">
      <div className="logo">🥛 FreshDairy</div>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/my-products">My Wishes Product</Link>
        {loggedInUser && <Link to="/my-orders">My Orders</Link>}
        {user && user.role === "admin" && <Link to="/admin">Admin</Link>}
        <Link to="/ghee">Ghee</Link>

        {loggedInUser ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>

      <Link to="/cart" className="cart-btn">
        <span className="cart-icon">
          🛒
          {totalItems > 0 && (
            <span className="cart-count">{totalItems}</span>
          )}
        </span>
        <span>Cart</span>
      </Link>
    </header>
  );
}

export default Header;
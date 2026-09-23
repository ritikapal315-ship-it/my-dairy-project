import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";


function Header({ cart }) {

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
const [loggedInUser, setLoggedInUser] = useState(
  localStorage.getItem("loggedInUser")
);
const navigate = useNavigate();
console.log("Logged in user:", loggedInUser);
   function handleLogout() {
    localStorage.removeItem("loggedInUser");
     setLoggedInUser(null);
    alert("Logged out successfully!");
     navigate("/");
  }

  return (
    <header className="header">

      <div className="logo">
        🥛 FreshDairy
      </div>

      <nav className="navbar">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
        
        Products
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/contact">
          Contact
        </Link>
        <Link to="/my-products">My Wishes Product</Link>
       
        {loggedInUser ? (
  <button onClick={handleLogout}>
    Logout
  </button>
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
            <span className="cart-count">
              {totalItems}
            </span>
          )}

        </span>

        <span>
          Cart
        </span>

      </Link>

    </header>
  );
}

export default Header;
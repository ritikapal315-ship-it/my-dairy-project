import { Link } from "react-router-dom";

function Header({ cart }) {
  return (
    <header className="header">

      <div className="logo">
        🥛 FreshDairy
      </div>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Link to="/cart" className="cart-btn">

    

   <span className="cart-icon">
  🛒

  {cart.length > 0 && (
    <span className="cart-count">
      {cart.length}
    </span>
  )}
</span>
    

          

       

          

       

        <span>Cart</span>

      </Link>

    </header>
  );
}

export default Header;
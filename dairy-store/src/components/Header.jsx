import { Link } from "react-router-dom";

function Header({ cart }) {

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
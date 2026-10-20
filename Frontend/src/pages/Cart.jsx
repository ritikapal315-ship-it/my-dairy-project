
import { useState } from "react";

function Cart({ cart, updateQuantity, removeFromCart, placeOrder }) {
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);

  const totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  async function handlePlaceOrder() {
    if (address.trim() === "") {
      alert("Please enter your delivery address");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setPlacing(true);

    try {
      const ok = await placeOrder(address.trim(), "cod");

      if (ok) {
        setAddress("");
      }
    } catch (error) {
      alert("Order place nahi ho paya. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="cart-page">
      <h1>My Cart</h1>

      <h3>Total Items: {totalItems}</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <h2>{item.name}</h2>

              <p>
                ₹{Number(item.price)} × {item.quantity} = ₹
                {Number(item.price) * Number(item.quantity)}
              </p>

              <div className="quantity-controls">
                <button
                  type="button"
                  disabled={placing || item.quantity <= 1}
                  onClick={() =>
                    updateQuantity(item.product_id, item.quantity - 1)
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  disabled={placing}
                  onClick={() =>
                    updateQuantity(item.product_id, item.quantity + 1)
                  }
                >
                  +
                </button>

                <button
                  type="button"
                  disabled={placing}
                  onClick={() => removeFromCart(item.product_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{totalPrice}</h3>

          <div className="checkout">
            <label htmlFor="address">Delivery Address</label>

            <textarea
              id="address"
              placeholder="House no, street, city, pincode"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              rows={3}
              required
            />

            <p>
              <b>Payment:</b> Cash on Delivery
            </p>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={placing || cart.length === 0}
            >
              {placing ? "Placing order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

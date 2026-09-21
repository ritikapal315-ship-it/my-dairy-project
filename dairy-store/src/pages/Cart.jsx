function Cart({ cart, updateQuantity, removeFromCart }) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <h1>My Cart</h1>

      <h3>
        Total Items: {totalItems}
      </h3>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">

          {cart.map((item, index) => (
            <div className="cart-item" key={index}>

              <h2>{item.name}</h2>

              <div className="quantity-controls">

                <button
                  onClick={() => updateQuantity(index, -1)}
                >
                  -
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(index, 1)}
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Cart;
function Cart({ cart }) {
  return (
    <div>
      <h1>My Cart</h1>

     <p>Cart data: {JSON.stringify(cart)}</p>
    </div>
  );
}

export default Cart;
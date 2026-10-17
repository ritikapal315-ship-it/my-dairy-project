import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API = "http://localhost:5001/v1";
const STATUSES = ["placed", "shipped", "delivered"];

async function api(path, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const result = await response.json();

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

function ProductRow({ product, onSave, onDelete }) {
  const [price, setPrice] = useState(Number(product.price));
  const [stock, setStock] = useState(product.stock);

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </td>
      <td>
        <button
          onClick={() =>
            onSave(product.id, { price: Number(price), stock: Number(stock) })
          }
        >
          Save
        </button>{" "}
        <button onClick={() => onDelete(product)}>Delete</button>
      </td>
    </tr>
  );
}

function AdminPage() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("loggedInUser"));
  } catch (err) {
    user = null;
  }
  const isAdmin = Boolean(user && user.role === "admin");

  async function loadProducts() {
    const result = await api("/products");
    setProducts(result.data);
  }

  async function loadOrders() {
    const result = await api("/orders/all");
    setOrders(result.data);
  }

  async function loadMessages() {
    const result = await api("/messages");
    setMessages(result.data);
  }

  function showError(err) {
    setMessage(err.message);
  }

  // Page khulte hi teeno load karo
  useEffect(() => {
    if (!isAdmin) return;
    loadProducts().catch(showError);
    loadOrders().catch(showError);
    loadMessages().catch(showError);
  }, [isAdmin]);

  if (!isAdmin) return <Navigate to="/" />;

  // Tab badalte hi taza data laao
  function openTab(name) {
    setTab(name);
    setMessage("");
    if (name === "products") loadProducts().catch(showError);
    if (name === "orders") loadOrders().catch(showError);
    if (name === "messages") loadMessages().catch(showError);
  }

  async function addProduct(event) {
    event.preventDefault();
    try {
      await api("/products", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          price: Number(form.price),
          stock: Number(form.stock),
          description: form.description.trim()
        })
      });
      setForm({ name: "", price: "", stock: "", description: "" });
      setMessage("Product added");
      await loadProducts();
    } catch (err) {
      showError(err);
    }
  }

  async function saveProduct(id, data) {
    try {
      await api(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
      });
      setMessage("Product updated");
      await loadProducts();
    } catch (err) {
      showError(err);
    }
  }

  async function deleteProduct(product) {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    try {
      await api(`/products/${product.id}`, { method: "DELETE" });
      setMessage("Product deleted");
      await loadProducts();
    } catch (err) {
      showError(err);
    }
  }

  async function changeStatus(orderId, status) {
    try {
      await api(`/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status })
      });
      setMessage("Order status updated");
      await loadOrders();
    } catch (err) {
      showError(err);
    }
  }

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <div className="admin-tabs">
        <button
          className={tab === "products" ? "active-filter" : ""}
          onClick={() => openTab("products")}
        >
          Products ({products.length})
        </button>

        <button
          className={tab === "orders" ? "active-filter" : ""}
          onClick={() => openTab("orders")}
        >
          Orders ({orders.length})
        </button>

        <button
          className={tab === "messages" ? "active-filter" : ""}
          onClick={() => openTab("messages")}
        >
          Messages ({messages.length})
        </button>

        <button onClick={() => openTab(tab)}>Refresh</button>
      </div>

      {message && <p className="admin-message">{message}</p>}

      {tab === "products" && (
        <>
          <h2>Add Product</h2>
          <form className="admin-form" onSubmit={addProduct}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="number"
              min="0"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <input
              type="number"
              min="0"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              required
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <button type="submit">Add</button>
          </form>

          <h2>All Products</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductRow
                  key={`${product.id}-${product.price}-${product.stock}`}
                  product={product}
                  onSave={saveProduct}
                  onDelete={deleteProduct}
                />
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "orders" && (
        <>
          <h2>All Orders</h2>
          {orders.length === 0 && <p>Abhi koi order nahi aaya.</p>}

          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h3>Order #{order.id}</h3>
              <p>
                {order.customer_name} ({order.customer_email}) |{" "}
                {new Date(order.created_at).toLocaleDateString("en-IN")}
              </p>

              <ul>
                {(order.items || []).map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.quantity} = ₹
                    {Number(item.price) * item.quantity}
                  </li>
                ))}
              </ul>

              <p>Delivery: {order.address}</p>

              <p>
                Payment:{" "}
                {order.payment_method === "online"
                  ? "Online"
                  : "Cash on Delivery"}{" "}
                ({order.payment_status || "pending"})
              </p>

              <strong>Total: ₹{Number(order.total)}</strong>

              <p>
                Status:{" "}
                {order.status === "cancelled" ? (
                  <b>cancelled</b>
                ) : (
                  <select
                    value={order.status}
                    onChange={(e) => changeStatus(order.id, e.target.value)}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                )}
              </p>
            </div>
          ))}
        </>
      )}

      {tab === "messages" && (
        <>
          <h2>Customer Messages</h2>
          {messages.length === 0 && <p>Abhi koi sandesh nahi aaya.</p>}

          {messages.map((item) => (
            <div className="order-card" key={item.id}>
              <h3>{item.name}</h3>
              <p>
                {item.email} |{" "}
                {new Date(item.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </p>
              <p>{item.message}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AdminPage;
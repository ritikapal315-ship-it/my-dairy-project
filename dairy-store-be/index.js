require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./src/database/db");
const messageRoutes = require("./src/modules/messages/message.route");
const userRoutes = require("./src/modules/users/user.route");
const productRoutes = require("./src/modules/products/product.route");
const cartRoutes = require("./src/modules/Cart/cart.route");
const orderRoutes = require("./src/modules/orders/order.route");
const wishlistRoutes = require("./src/modules/wishlist/wishlist.route");
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/v1/wishlist", wishlistRoutes);
app.use("/v1/messages", messageRoutes);
app.get("/", (req, res) => {
  res.send("Dairy Store API is running");
});

app.use("/v1", userRoutes);
app.use("/v1/products", productRoutes);
app.use("/v1/cart", cartRoutes);
app.use("/v1/orders", orderRoutes);

// DB connect hone ke baad hi server start hoga
pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("PostgreSQL connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.code, err.message);
    if (err.errors) {
      err.errors.forEach((e) => console.error(" -", e.address, e.code));
    }
    process.exit(1);
  });
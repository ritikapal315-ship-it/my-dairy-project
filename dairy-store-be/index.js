require("dotenv").config();
const productRoutes = require("./src/modules/products/product.route");
const express = require("express");
const cors = require("cors");
const pool = require("./src/database/db");
const userRoutes = require("./src/modules/users/user.route");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dairy Store API is running");
});

app.use("/v1", userRoutes);
app.use("/v1/products", productRoutes);

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
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
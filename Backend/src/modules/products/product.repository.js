const pool = require("../../database/db.js");

const createProduct = async ({ name, price, stock, description }) => {
  const { rows } = await pool.query(
    `INSERT INTO products (name, price, stock, description)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, price, stock, description, created_at, updated_at`,
    [name, price, stock ?? 0, description ?? null]
  );
  return rows[0];
};

const getAllProducts = async () => {
  const { rows } = await pool.query(
    `SELECT id, name, price, stock, description, created_at, updated_at
     FROM products
     ORDER BY id`
  );
  return rows;
};

const getProductById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, name, price, stock, description, created_at, updated_at
     FROM products
     WHERE id = $1`,
    [id]
  );
  return rows[0];
};

const updateProduct = async (id, { name, price, stock, description }) => {
  const { rows } = await pool.query(
    `UPDATE products
     SET name = COALESCE($1, name),
         price = COALESCE($2, price),
         stock = COALESCE($3, stock),
         description = COALESCE($4, description),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING id, name, price, stock, description, created_at, updated_at`,
    [name ?? null, price ?? null, stock ?? null, description ?? null, id]
  );
  return rows[0];
};

const deleteProduct = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING id, name",
    [id]
  );
  return rows[0];
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
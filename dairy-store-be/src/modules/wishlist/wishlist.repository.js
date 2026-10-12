
const pool = require("../../database/db");

const addToWishlist = async (userId, productId) => {
  const { rows } = await pool.query(
    `INSERT INTO wishlist (user_id, product_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, product_id) DO NOTHING
     RETURNING *`,
    [userId, productId]
  );

  if (rows.length > 0) return rows[0];

  const existing = await pool.query(
    `SELECT * FROM wishlist
     WHERE user_id = $1 AND product_id = $2`,
    [userId, productId]
  );

  return existing.rows[0];
};

const getWishlist = async (userId) => {
  const { rows } = await pool.query(
    `SELECT w.id AS wishlist_id, w.created_at,
            p.*
     FROM wishlist w
     JOIN products p ON p.id = w.product_id
     WHERE w.user_id = $1
     ORDER BY w.created_at DESC`,
    [userId]
  );

  return rows;
};

const removeFromWishlist = async (userId, productId) => {
  const { rows } = await pool.query(
    `DELETE FROM wishlist
     WHERE user_id = $1 AND product_id = $2
     RETURNING *`,
    [userId, productId]
  );

  return rows[0];
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};

const pool = require("../../database/db.js");

const createMessage = async ({ name, email, message }) => {
  const { rows } = await pool.query(
    `INSERT INTO messages (name, email, message)
     VALUES ($1, $2, $3)
     RETURNING id, created_at`,
    [name, email, message]
  );
  return rows[0];
};

const getAllMessages = async () => {
  const { rows } = await pool.query(
    `SELECT id, name, email, message, created_at
     FROM messages
     ORDER BY id DESC`
  );
  return rows;
};

module.exports = { createMessage, getAllMessages };
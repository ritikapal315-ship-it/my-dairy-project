const pool = require("../../database/db.js");

// CREATE USER
const createUser = async ({
  name,
  email,
  password,
  mobile_number,
  address,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO users
      (name, email, password, mobile_number, address)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, mobile_number, address,
               role, created_at, updated_at`,
    [name, email, password, mobile_number ?? null, address ?? null]
  );

  return rows[0];
};

// UPDATE USER
const updateUser = async (
  id,
  { email, name, mobile_number, address }
) => {
  const { rows } = await pool.query(
    `UPDATE users
     SET email = COALESCE($1, email),
         name = COALESCE($2, name),
         mobile_number = COALESCE($3, mobile_number),
         address = COALESCE($4, address),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING id, name, email, mobile_number, address,
               role, created_at, updated_at`,
    [
      email ?? null,
      name ?? null,
      mobile_number ?? null,
      address ?? null,
      id,
    ]
  );

  return rows[0];
};

// FIND USER BY ID
const findUserById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, name, email, mobile_number, address,
            role, created_at, updated_at
     FROM users
     WHERE id = $1`,
    [id]
  );

  return rows[0];
};

// CREATE NEW USER
const createnewUser = async ({
  name,
  email,
  password,
  mobile_number,
  address,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO users
      (name, email, password, mobile_number, address)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, mobile_number, address,
               role, created_at, updated_at`,
    [name, email, password, mobile_number ?? null, address ?? null]
  );

  return rows[0];
};

// DELETE USER BY ID
const DeleteUserBYID = async (id) => {
  const { rows } = await pool.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING id, name, email`,
    [id]
  );

  return rows[0];
};

// FIND USER BY EMAIL (LOGIN)
const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    `SELECT id, name, email, password, role,
            mobile_number, address
     FROM users
     WHERE email = $1`,
    [email]
  );

  return rows[0];
};

module.exports = {
  createUser,
  updateUser,
  findUserById,
  createnewUser,
  DeleteUserBYID,
  findUserByEmail,
};
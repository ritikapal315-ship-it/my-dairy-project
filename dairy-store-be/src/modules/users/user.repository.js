const pool = require("../../database/db.js");


//CREATE USER
const createUser = async ({ name, email, password ,mobile_number,address}) => {
  const { rows } = await pool.query(
    "INSERT INTO users (name, email, password, mobile_number, address) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, mobile_number, address, created_at, updated_at",

    [name, email, password, mobile_number, address]
  );
  return rows[0];
};

//UPDATE USER BY NAME
const updateUser = async (id, { email, name }) => {
  const { rows } = await pool.query(
    `UPDATE users
     SET email = COALESCE($1, email),
         name = COALESCE($2, name),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, name, email, created_at, updated_at`,
    [email ?? null, name ?? null, id]
  );
  return rows[0];
};




const findUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1",
    [id]
  );

        return rows[0];
};
const createnewUser = async ({ name, email, password, mobile_number, address }) => {
  console.log("REPO createnewUser running");
  const { rows } = await pool.query(
    "INSERT INTO users (name,email,password,mobile_number,address) VALUES ($1,$2,$3,$4,$5) RETURNING id,name,email,mobile_number,address,created_at,updated_at",
    [name, email, password, mobile_number, address]
  );
  return rows[0];
};
const DeleteUserBYID=async(id)=>{
  const {rows}=await pool.query("DELETE FROM users WHERE id=$1 RETURNING name,email",[id]);
  return rows[0];
}
const DeleteUserBYName=async(name)=>{
  const{rows}=await pool.query("DELETE FROM users WHERE name=$1 RETURNING name,email",[name]);
  return rows[0];
  
}
const DeleteUserBYLimit=async(limit)=>{
  const{rows}=await pool.query("DELETE FROM users WHERE id IN (SELECT id FROM users ORDER BY created_at ASC LIMIT $1) RETURNING name,email",[limit]);
  return rows[0];
}
const finduserBYName=async(name)=>{
  const{rows}=await pool.query("SELECT * FROM users WHERE name=$1",[name]);
  return rows[0];
}
const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    "SELECT id, name, email, password, role FROM users WHERE email = $1",
    [email]
  );
  return rows[0];
};



module.exports = { createUser, updateUser, findUserById, createnewUser ,DeleteUserBYID, DeleteUserBYName, finduserBYName, DeleteUserBYLimit, findUserByEmail};
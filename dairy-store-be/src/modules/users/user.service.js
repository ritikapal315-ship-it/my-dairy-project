const bcrypt = require("bcrypt");
const userRepository = require("./user.repository");

const createUser = async (data) => {
const hashedPassword = await bcrypt.hash(data.password, 10);

  return userRepository.createUser({
    ...data,
    password: hashedPassword
  });

};


const updateUser = async (id, data) => {
  const updated = await userRepository.updateUser(id, data);
  if (!updated) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  return updated;
};



const findUserById = async (id) => {
  return await userRepository.findUserById(id);
};
const createnewUser=async(data)=>{
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await userRepository.createnewUser({
    ...data,
    password: hashedPassword
  });
};

const deleteUserById = async (id) => {
  const deleted = await userRepository.DeleteUserBYID(id);
  if (!deleted) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  return deleted;
};
const deleteUserByName = async (name) => {
  const deleted = await userRepository.DeleteUserBYName(name);
  if (!deleted) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  return deleted;
};
const deleteUserByLimit = async (limit) => {
  const deleted = await userRepository.DeleteUserBYLimit(limit);  
  if (!deleted) {
    const err = new Error("No users found to delete");
    err.status = 404;
    throw err;
  }
  return deleted;
};
const finduserBYName=async(name)=>{
  return await userRepository.finduserBYName(name);
}
const login = async ({ email, password }) => {
  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.status = 400;
    throw err;
  }

  const user = await userRepository.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const { password: _, ...safeUser } = user; // password hata do
  return safeUser;
};

module.exports = {
  createUser,
  updateUser,
  findUserById,
  login,
  createnewUser,
  deleteUserById,
  deleteUserByName,
  finduserBYName,
  deleteUserByLimit
};
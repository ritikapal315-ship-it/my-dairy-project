const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("./user.repository");

const fail = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const createUser = async (data) => {
  if (!data.name || !data.email || !data.password) {
    throw fail("Name, email and password are required", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return userRepository.createUser({
    ...data,
    password: hashedPassword
  });
};

const updateUser = async (id, data) => {
  const { name, mobile_number } = data;

  if (name !== undefined && String(name).trim() === "") {
    throw fail("Name cannot be empty", 400);
  }

  if (
    mobile_number !== undefined &&
    mobile_number !== "" &&
    !/^\d{10}$/.test(String(mobile_number))
  ) {
    throw fail("Mobile number must be 10 digits", 400);
  }

  const updated = await userRepository.updateUser(id, {
    ...data,
    name: name !== undefined ? String(name).trim() : undefined
  });

  if (!updated) {
    throw fail("User not found", 404);
  }
  return updated;
};

const findUserById = async (id) => {
  return await userRepository.findUserById(id);
};

const createnewUser = async (data) => {
  if (!data.name || !data.email || !data.password) {
    throw fail("Name, email and password are required", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await userRepository.createnewUser({
    ...data,
    password: hashedPassword
  });
};

const deleteUserById = async (id) => {
  const deleted = await userRepository.DeleteUserBYID(id);
  if (!deleted) {
    throw fail("User not found", 404);
  }
  return deleted;
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw fail("Email and password are required", 400);
  }

  const user = await userRepository.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw fail("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};

module.exports = {
  createUser,
  updateUser,
  findUserById,
  createnewUser,
  deleteUserById,
  login
};
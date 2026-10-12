const messageRepository = require("./message.repository");

const fail = (text, status) => {
  const err = new Error(text);
  err.status = status;
  return err;
};

const createMessage = async ({ name, email, message }) => {
  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim();
  const cleanMessage = String(message || "").trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    throw fail("Name, email and message are required", 400);
  }

  if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
    throw fail("Invalid email format", 400);
  }

  if (cleanMessage.length > 1000) {
    throw fail("Message must be 1000 characters or less", 400);
  }

  return await messageRepository.createMessage({
    name: cleanName.slice(0, 100),
    email: cleanEmail.slice(0, 100),
    message: cleanMessage
  });
};

const getAllMessages = async () => {
  return await messageRepository.getAllMessages();
};

module.exports = { createMessage, getAllMessages };
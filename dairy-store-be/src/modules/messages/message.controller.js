const messageService = require("./message.service");

const createMessage = async (req, res) => {
  try {
    await messageService.createMessage(req.body);
    res.status(201).json({ message: "Message sent" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await messageService.getAllMessages();
    res.status(200).json({ message: "Messages found", data: messages });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { createMessage, getAllMessages };
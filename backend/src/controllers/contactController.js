const Contact = require("../models/contact");

// Contact Message Save Logic
const createContactMessage = async (request, response) => {
  const { name, email, message } = request.body;

  if (!name || !email || !message) {
    return response.status(400).send({ error: "All fields are required!" });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    return response.status(201).send({ message: "Message sent successfully and saved to Database!" });
  } catch (err) {
    console.log(err);
    return response.status(500).send({ error: err.message });
  }
};

module.exports = {
  createContactMessage,
};
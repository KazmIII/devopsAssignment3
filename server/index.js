const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mern-basic", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const messageSchema = new mongoose.Schema({
  text: String,
});
const Message = mongoose.model("Message", messageSchema);

// Routes
app.get("/api/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.post("/api/messages", async (req, res) => {
  const { text } = req.body;
  const newMessage = new Message({ text });
  await newMessage.save();
  res.json(newMessage);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

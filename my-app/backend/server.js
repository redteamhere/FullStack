const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // 🔥 Allow frontend to connect
app.use(express.json());

let users = [];

// Default route
app.get("/", (req, res) => {
  res.send("✅ Backend is running. Use /users to interact.");
});

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Add user
app.post("/users", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Name and age required" });
  }
  users.push({ name, age });
  res.json({ message: "User added successfully ✅" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));

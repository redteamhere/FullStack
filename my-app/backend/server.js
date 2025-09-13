const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Dummy DB (memory)
let users = [];

// Create User
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

// Read All Users
app.get("/users", (req, res) => {
  res.json(users);
});

// Update User
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find(u => u.id == id);
  if (!user) return res.status(404).send("User not found");
  user.name = name || user.name;
  user.email = email || user.email;
  res.json(user);
});

// Delete User
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id != id);
  res.send("User deleted");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

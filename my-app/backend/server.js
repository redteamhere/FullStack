const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let webinars = []; // memory storage (future में DB connect कर सकते हैं)

// Default route
app.get("/", (req, res) => {
  res.send("✅ Webinar Backend Running. Use /join or /webinars");
});

// User joins webinar
app.post("/join", (req, res) => {
  const { name, email, topic } = req.body;
  if (!name || !email || !topic) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const newUser = { id: webinars.length + 1, name, email, topic };
  webinars.push(newUser);
  res.json({ message: "✅ You have successfully joined the webinar", user: newUser });
});

// Admin get all joined users
app.get("/webinars", (req, res) => {
  res.json(webinars);
});

// Update user (optional)
app.put("/webinars/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, topic } = req.body;
  const user = webinars.find(u => u.id == id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;
  user.topic = topic || user.topic;

  res.json({ message: "✅ Webinar entry updated", user });
});

// Delete user (optional)
app.delete("/webinars/:id", (req, res) => {
  const { id } = req.params;
  webinars = webinars.filter(u => u.id != id);
  res.json({ message: "✅ Webinar entry deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));

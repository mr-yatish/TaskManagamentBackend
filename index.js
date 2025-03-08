const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Create a server instance
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // Change this to match your frontend
    methods: ["GET", "POST"],
  },
});


// Connect to the database
connectDB();

// Middleware
app.use(cors("*"));
app.use(express.json());

// Routers
app.use("/api/user", require("./routes/user.router"));
app.use("/api/task", require("./routes/task.router"));

// Move this outside of the route so it listens globally
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Route to send messages
app.post("/send", (req, res) => {
  const { message } = req.body;
  
  io.emit("pushMessage", message);
  res.status(200).send("Message sent");
});

// Start the server using `server.listen` instead of `app.listen`
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

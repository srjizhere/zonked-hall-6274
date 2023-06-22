const express = require("express");
const colors = require("colors");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require('cors');

connectDB();
const app = express(); 
app.use(express.json());
const userRoutes = require("./Routs/userRouts");
const chatRoutes = require("./Routs/chat.Routes");
const messageRoutes = require("./Routs/messageRoutes");
const { notFound, errHandler } = require("./middelware/error.middelware");
const path = require("path");
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


const __dirname1 = path.resolve();

  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });

app.use(notFound);
app.use(errHandler);

const PORT = process.env.port;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("user joint chat room of",userData);
    socket.emit("connected");
  });

  socket.on("joinChat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => {
    console.log(room);
    socket.to(room).emit("typing")
  });
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
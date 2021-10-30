const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/hello", function (req, res) {
  res.status(200).send("I am from node");
});

io.sockets.on("connection", function (socket) {
  socket.on("username", function (username) {
    socket.username = username;
    io.emit("is_online", "🔵 <i>" + socket.username + " join the chat..</i>");
  });

  socket.on("disconnect", function (username) {
    io.emit("is_online", "🔴 <i>" + socket.username + " left the chat..</i>");
  });

  socket.on(`route`, function (data) {
    console.log(JSON.stringify(data));

    // socket.on(`chat_message ${data.room_id}`, function (data) {
    io.emit(`chat_message ${data.room_id}`, data);
    // });
  });
});

const server = http.listen(5000, function () {
  console.log("Server running on port 5000");
});


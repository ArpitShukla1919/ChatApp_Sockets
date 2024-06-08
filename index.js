const express = require("express");
const http = require("http");

const connect = require("./config/database-config.js");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Chat = require('./models/chat.js')
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data.roomid);
  });

  socket.on("msg_send",async (data) => {
    console.log(data);
    const chat = await Chat.create({
      roomid:data.roomid,
      content:data.msg,
      user:data.username
    })
    io.to(data.roomid).emit("msg_recieved", data);
  });
});
app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));
app.get("/chat/:roomid",async(req, res) => {
  const chats = await Chat.find({
    roomid:req.params.roomid
  }).select('content')
  res.render("index", {
    name: "STERNER",
    id: req.params.roomid,
    chats:chats
  });
});

server.listen(3000, async () => {
  console.log("Server Starteds");
  await connect();
  console.log("mongo connected");
});

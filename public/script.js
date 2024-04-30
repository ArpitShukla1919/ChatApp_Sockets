var socket = io();

let btn = document.getElementById("btn");
btn.onclick = function exec() {
  socket.emit("from_client");
};

socket.on("from_server", () => {
  console.log("collected a new event from server");
  const div = document.createElement("div");
  (div.innerText = "New Event From Server"), document.body.appendChild(div);
});

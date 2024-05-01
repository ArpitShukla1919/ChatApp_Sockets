var socket = io();

let btn = document.getElementById("btn");
let inputmsg = document.getElementById('newmsg');
let msglist = document.getElementById('msglist');

btn.onclick = function exec(){
    socket.emit('msg_send',{
        msg:inputmsg.value
    });
}

socket.on('msg_recieved',(data)=>{
    let limsg = document.createElement('li')
    limsg.innerText = data.msg
    msglist.appendChild(limsg)
})
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, { transports: ['websocket'] })
let count = 0
let user = {}
io.on("connection", (socket) => {
 
  socket.on('user', (data) => {
    
    let id = user[data]
    count++
    console.log(count,99999)
    if (id) {
      console.log(data,7777)
    
      io.to(id).emit('islogin', { islogin: false, user: data })
      console.log(data,77577)
    }

    user[data] = socket.id

    io.emit('countmsg', count)
    socket.on('sendMsg', (data) => {
      console.log(data)
      let now = new Date();
      io.emit('pushMsg', data, now)
    })
    // function tick(){
    //   //获取当前时间的UTC表示
    //   var now = new Date().toUTCString();
    //   //将时间发送给所有连接上的用户端
    //   io.emit('time',now);
    // }
    
    // setInterval(tick,50000);
    socket.on('disconnect', () => {
      user[data] === socket.id ? null : user[data]
      count--
      io && io.emit('countmsg', count)
    })
    // io.emit('islogin', {islogin:true,user:data})


  })

});


server.listen(3000, () => {
  console.log('listening on *:3000');
})

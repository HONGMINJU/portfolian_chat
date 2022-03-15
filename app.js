require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const socketio = require('socket.io');
var server = app.listen(3001,()=>{
    console.log('Server is running on port number 3001 (채팅서버)')
})
const io = socketio(server,{ path: '/socket.io' });

app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({limit : '50mb', extended: true}));
app.use(cookieParser());
app.use(express.json());

io.on('connection',function(socket) {
    console.log(`Connection : SocketId = ${socket.id}`);

    socket.on('send', function(data) {

        console.log('send message client to server')

        const message_data = JSON.parse(JSON.stringify(data))
        const messageContent = message_data.messageContent;
        const roomId = message_data.roomId;

        console.log(`roomId : ${roomId} message : ${messageContent}`)
        //io.emit('receive',{ "messageContent" : messageContent });
        socket.broadcast.to(`${roomId}`).emit('receive', { "messageContent" : messageContent })
    })
})

module.exports = app;
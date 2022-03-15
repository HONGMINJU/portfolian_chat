require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketio = require('socket.io')
const app = express();
const PORT = 3001;

app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({limit : '50mb', extended: true}));
app.use(cookieParser());
app.use(express.json());

var server = app.listen(3001,()=>{
    console.log('Server is running on port number 3000 (채팅서버)')
})

var io = socketio.listen(server);

io.on('connection',function(socket) {
    console.log(`HIHIHIHI\nConnection : SocketId = ${socket.id}`)
    var userName = '';
})

io.on('connect',function(socket) {
    console.log(`HIHIHIHI\nConnect : SocketId = ${socket.id}`)
    var userName = '';
})


module.exports = app;

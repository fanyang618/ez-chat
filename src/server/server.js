const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// socket io with express
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, function() {
    console.log('Node app starts at port 9093')
})

// socket io
io.on('connection', function(socket) {
    //console.log('user logged in')
    socket.on('sendmsg', function(data) {
        console.log(data)
        io.emit('recvmsg', data)
    })
})
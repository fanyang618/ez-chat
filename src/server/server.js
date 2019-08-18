const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./db')
const Chat = db.getModel('chat')

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
        const {from, to, msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg}, function(e, d) {
            io.emit('recvmsg', Object.assign({},d._doc))
        })
    })
})
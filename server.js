const http = require('http')
const socketio = require('socket.io')
const express = require('express')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const socketMap = {}
app.use('/',express.static(__dirname+'/public'))
let users = {
    shivam : "mynameisshivam",
}
io.on('connection',(socket)=>{
    function login(socket,username){
        socket.join(username);
        socket.emit('welcome')
        socketMap[socket.id]=username
        console.log(socketMap)
    }
    socket.on('login',(data)=>{
        if(users[data.username]){
            if(users[data.username]==data.password){
                login(socket,data.username)
            }else{
                socket.emit('login_failed')
            }    
        }else{
            users[data.username]=data.password
            login(socket,data.username)
        }              
        console.log(data)
    })
    socket.on('message',(data)=>{
        data.from = socketMap[socket.id]
        if(data.to){
            console.log(data.to)
            io.to(data.to).emit("msg_rcvd",data)
        }else{
            socket.broadcast.emit('msg_rcvd',data)
        }
        
    })
    
})
server.listen(4444,()=>{
    console.log("server is running on http://localhost:4444")
})
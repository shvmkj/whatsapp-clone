let socket = io()
$('#loginBox').show()
$('#chatBox').hide()
$('#loginBtn').click(()=>{
    socket.emit("login",{
        username : $('#username').val(),
        password : $('#password').val()
    })
})
socket.on("welcome",()=>{
    $('#loginBox').hide()
    $('#chatBox').show()
})
$('#sendMessage').click(()=>{
    socket.emit("message",{
        to : $('#receiver').val(),
        msg    : $('#msg').val()
    })
})
socket.on("msg_rcvd",(data)=>{
    $('#ulMsgs').append($('<li>').text(
        `[${data.from}] : ${data.msg}` 
    ))
})
socket.on("login_failed",()=>{
    window.alert("Username or Password Wrong")
})
const express = require('express')
const http = require('http')
const app = express()
const { Server } = require('socket.io')
var cors = require('cors')
app.use(cors())

const PORT = process.env.PORT || 8080

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  //測試有沒有連線成功
  console.log(`User Connected:${socket.id}`)

  /**
   * 建造room：
   */
  socket.on('join_room', (data) => {
    console.log('room num', data)
    socket.join(data)
  })

  /**
   * 建立溝通連線：
   * 1. on、 emit API 搭配使用 ： 第一個參數要跟彼此溝通的通道，名稱要一致。
   * 例如這是一條send_message 的連線， 在後端這邊的 on 第一個參數寫send_message
   * 前端的 emit 參數就也要寫一樣。
   */
  socket.on('send_message', (data) => {
    //  broadcast：全伺服器都會接受到
    // socket.broadcast.emit('receive_message', data)
    //  to：只有特定伺服器可以接收到，前面要鮮血條件，鏈式寫法
    console.log('data.room', data.room)
    socket.to(data.room).emit('receive_message', data)
  })
})

server.listen(PORT, console.log(`Server has successfully Start at: ${PORT}`))

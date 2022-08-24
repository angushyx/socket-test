const express = require('express')
const path = require('path')
const http = require('http')
const app = express()
// const pool = require('./db')
const { Server } = require('socket.io')
var cors = require('cors')

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

const PORT = process.env.PORT || 8080

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
})

/**
 * 拿取db資料
 * 0822 work
 */
// app.get('/api/v1.0/handmade', async (req, res) => {
//   let [data] = await pool.execute('SELECT * FROM handmade.users')
//   console.log(data)
//   res.json(data)
// })

// !TEST 1
// io.on('connection', (socket) => {
//   //測試有沒有連線成功

//   console.log(`User Connected:${socket.id}`)

//   /**
//    * 建造room：
//    */
//   socket.on('join_room', (data) => {
//     console.log('room num', data)
//     socket.join(data)
//   })

//   /**
//    * 建立溝通連線：
//    * 1. on、 emit API 搭配使用 ： 第一個參數要跟彼此溝通的通道，名稱要一致。
//    * 例如這是一條send_message 的連線， 在後端這邊的 on 第一個參數寫send_message
//    * 前端的 emit 參數就也要寫一樣。
//    */
//   socket.on('send_message', (data) => {
//  broadcast：全伺服器都會接受到
// socket.broadcast.emit('receive_message', data)
//  to：只有特定伺服器可以接收到，前面要鮮血條件，鏈式寫法
//     console.log('data.room', data.room)
//     socket.to(data.room).emit('receive_message', data)
//   })
// })

io.on('connection', (socket) => {
  const id = socket.handshake.query.id
  socket.join(id)
  console.log(id)
  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      console.log(recipients)
      const newRecipients = recipients.filter((r) => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.emit('receive-message', { recipients: newRecipients, sender: id, text })
    })
  })
})

/**
 * TODO: 建立 SOCKET ROOM
 * 1. 創建 6 個 room
 * 2. 使用者可以隨意進出 room
 * 3. 使用者在該 room 裡面發布的內容都是 broadcast
 * APIs ： join('room_id')、leave('room_id')
 * !發送給同一個 room 的寫法：socket.broadcast.in('room').emit
 *
 *
 */

/**
 * ! 發送訊息使用 emit
 * 在 emit 前可以設定要發送的目標，和發送的方式
 * 發送方式
 * * 廣播 broadcast
 * *
 * 在哪裡發送
 * * in 後面加上目標位置 ex：socket.broadcast.in(socket['room'])
 *
 * 1. on('setnickName)  //設定暱稱
 * 2. on('join')        //加入聊天室
 * 3. on('leave')       //離開聊天室
 * 4. on('post')        //在指定聊天室發布訊息(兩種狀況)
 *     (1) 沒有選擇 room 的狀態下發送訊息--> emit 一條錯誤訊息回前端
 *     (2) 發送訊息到指定的 room socket.broadcast.in(socket['room'])
 * 5. on('disconnect')
 *     (1)判斷是否在 room 裡面， 發送離開聊天室的 emit 到聊天室。
 */

server.listen(PORT, console.log(`Server has successfully Start at: ${PORT}`))

import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const socket = io.connect('http://localhost:8080')

const App = () => {
  const [room, setRoom] = useState('')

  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }
  console.log(room)

  //要把資料都 emit 過去
  const sendMessage = () => {
    socket.emit('send_message', { message, room })
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className="container">
      <Form>
        <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Choose Room"
            onChange={(e) => {
              setRoom(e.target.value)
            }}
          />
        </Form.Group>
        <Button onClick={joinRoom}>Join Room</Button>
      </Form>
      <Form>
        <Form.Group className="my-4" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Message"
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
        </Form.Group>
        <Button onClick={sendMessage}>SEND MESSAGE</Button>
        <h1>Message:</h1>
        <p>{messageReceived}</p>
      </Form>
    </div>
  )
}

export default App

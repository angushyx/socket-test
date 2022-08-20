import React from 'react'
import io from 'socket.io-client'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const socket = io.connect('http://localhost:8080')

const App = () => {
  const sendMessage = () => {
    socket.emit()
  }

  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Message" />
        </Form.Group>
        <Button onClick={sendMessage}>SEND MESSAGE</Button>
      </Form>
    </div>
  )
}

export default App

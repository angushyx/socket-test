import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

const Login = () => {
  return (
    <Container>
      <Form>
        <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Choose Room" />
        </Form.Group>
        <Button>Join Room</Button>
      </Form>
      <Form>
        <Form.Group className="my-4" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Message" />
        </Form.Group>
        <Button>SEND MESSAGE</Button>
        <h1>Message:</h1>
        <p></p>
      </Form>
    </Container>
  )
}

export default Login

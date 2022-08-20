import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

const Login = ({ onIdSubmit }) => {
  const idRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    onIdSubmit(idRef.current.value)
  }
  const createNewId = () => {
    onIdSubmit(uuidV4())
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter your id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <div className="d-flex gap-4">
          <Button>Login</Button>
          <Button onClick={createNewId} variant="dark">
            Create New Id
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default Login

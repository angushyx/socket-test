import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function OpenConversation() {
  const [text, setText] = useState()
  const { sendMessage, selectedConversation } = useConversations()

  const handleSubmit = (e) => {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map((recipient) => recipient.id),
      text
    )

    setText('')

    console.log('message', selectedConversation.messages)
    console.log('selectedConversation', selectedConversation)
  }

  return (
    <>
      <div className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1 overflow-auto">
          <div className="h-100 d-felx flex-column align-items-center justify-content-end px-3">
            {selectedConversation.messages.map((message, index) => {
              return (
                <div key={index} className="my-1 d-flex flex-column">
                  <div
                    className={`rounded px-2 py-1 ${
                      message ? 'bg-primary text-white' : 'border'
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-muted small ${
                      message.fromMe ? 'text-right' : ''
                    }`}
                  >
                    {message.fromMe ? 'You' : message.sender}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-2">
            <InputGroup>
              <Form.Control
                as="textarea"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ height: '75px', resize: 'none' }}
              />
              <Button type="submit">Send</Button>{' '}
            </InputGroup>
          </Form.Group>
        </Form>{' '}
      </div>
    </>
  )
}
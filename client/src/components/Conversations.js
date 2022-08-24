import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()

  // const arrayTest = [
  //   { selected: true, recipients: [{ id: 12, name: 'angus' }] },
  //   {
  //     selected: false,
  //     recipients: [
  //       { id: 25, name: 'Kevib' },
  //       { id: 25, name: 'Kevib' },
  //       { id: 25, name: 'Kevib' },
  //     ],
  //   },
  // ]
  // arrayTest.map((v, i) => {
  //   const a = v.recipients.map((v2) => v2.name).join(', ')
  // })

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(index)}
        >
          {conversation.recipients
            .map((recipient) => recipient.name)
            .join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage'
import Dashboard from './Dashboard'
import { ContactProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'
const Chat = () => {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactProvider>
  )

  return id ? dashboard : <Login onIdSubmit={setId} />
}

export default Chat

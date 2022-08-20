import React from 'react'
import Chat from './components/Chat'


import { useRoutes } from 'react-router-dom'

const routeConfig = [
  {
    path: '/',
    element: <Chat />,
  },
  // {
  //   path: '/chat',
  //   element: <Chat />,
  // },
]

const App = () => {
  const element = useRoutes(routeConfig)
  return <>{element}</>
}

export default App

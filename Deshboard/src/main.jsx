import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context = createContext({ isAuthenticated: true })

const AppWrapper = () => {
  const [isAuthonticated, setIsAuthonticated] = useState(false)
  const [user, setUser] = useState(false)

  return (
    <Context.Provider
      value={{
        isAuthonticated,
        setIsAuthonticated,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)

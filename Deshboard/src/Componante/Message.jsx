import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Message = () => {
  const [message, setMessage] = useState([])
  const { isAuthonticated } = useContext(Context)

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/api/v1/message/getall',
          {
            withCredentials: true,
          },
        )
        setMessage(data.message)
      } catch (error) {
        console.log('Error fetching msg ', error)
      }
    }
    fetchMessage()
  }, [])

  if (!isAuthonticated) {
    return <Navigate to={'/login'} />
  }
  return (
    <section className="page messages">
      <h1>Messages</h1>
      <div className="banner">
        {message && message.length > 0 ? (
          message.map((v, i) => {
            return (
              <div className="card" key={i}>
                <div className="details">
                  <p>
                    First Name : <span>{v.firstName}</span>
                  </p>
                  <p>
                    Last Name : <span>{v.lastname}</span>
                  </p>
                  <p>
                    Email : <span>{v.email}</span>
                  </p>
                  <p>
                    Phone : <span>{v.phone}</span>
                  </p>
                  <p>
                    Message : <span>{v.message}</span>
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <h1>No Message</h1>
        )}
      </div>
    </section>
  )
}

export default Message

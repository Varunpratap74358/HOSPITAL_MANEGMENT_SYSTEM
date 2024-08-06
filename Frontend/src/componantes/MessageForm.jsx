import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const MessageForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        'http://localhost:3000/api/v1/message/send',
        { firstName, lastName, phone, email, message },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then(res => {
        toast.success(res.data.message)
        console.log(res)
        setFirstName("")
        setLastName("")
        setPhone("")
        setEmail("")
        setMessage("")
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
      console.log("error:", error)
    }
  }

  return (
    <div className="container form-component message-form">
      <h2>Send A Message</h2>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <textarea
          rows={7}
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm

import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddAdmin = () => {
  const { isAuthonticated } = useContext(Context)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [nic, setNic] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')

  const navigate = useNavigate()

  const handelAddNewAdmin = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(
          'http://localhost:3000/api/v1/user//admin/addnew',
          {
            firstName,
            lastName,
            phone,
            email,
            password,
            nic,
            dob,
            gender,
          },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then((res) => {
          toast.success(res.data?.message)
          console.log(res)
          navigate("/")
        })
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error.response.data)
    }
  }

  if (!isAuthonticated) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <section className="page">
      <section className="container form-component add-admin-form">
      <img src="https://raw.githubusercontent.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/main/dashboard/public/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">ADD NEW ADMIN</h1>
        <form onSubmit={handelAddNewAdmin}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Mail">Male</option>
              <option value="Femail">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
    </>
  )
}

export default AddAdmin

import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Context } from '../main'
import { Link, useNavigate, Navigate } from 'react-router-dom'


const Rejister = () => {
  const { isAuthonticated, setIsAuthonticated } = useContext(Context)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [nic, setNic] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')

  const navigate = useNavigate()

  const handelRegister = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(
          'http://localhost:3000/api/v1/user/patient/register',
          {
            firstName,
            lastName,
            phone,
            email,
            password,
            nic,
            dob,
            gender,
            role: 'Patient',
          },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then((res) => {
          toast.success(res.data?.message)
          console.log(res)
          setIsAuthonticated(true)
        })
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error?.response.data)
    }
  }

  if (isAuthonticated) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please SignUp To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handelRegister}>
          <div>
            <input
              type="text"
              placeholder="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="lastname"
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="Number"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="number"
              placeholder="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              placeholder="DOB"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Mail">Mail</option>
              <option value="Femail">Femail</option>
            </select>
          </div>
          <div
            style={{
              gap: '10px',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={'/login'}
              style={{ textDecoration: 'none', color: '#271776ca' }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: 'center', alignItems: 'center' }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Rejister

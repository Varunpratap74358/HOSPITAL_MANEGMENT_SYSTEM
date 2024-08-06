import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false)
  const { isAuthonticated, setIsAuthonticated } = useContext(Context)
  const navigate = useNavigate()

  const handelLogout = async () => {
    await axios
      .get('http://localhost:3000/api/v1/user/patient/logout', {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data?.message)
        // console.log(res)
        setIsAuthonticated(false)
      })
      .catch((err) => {
        toast.error(err.response?.data?.message)
        console.log("error",err)
      })
  }
  const HandelLogin = async () => {
    navigate("/login")
  }

  return (
    <nav className="container">
      <div className="logo"><img src="https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/logo.png?raw=true" alt="logo" className='logo-img' /></div>
      <div className={show ? 'navlinks showmenu' : 'navLinks'}>
        <div className="links">
          <Link to={'/'}>Home</Link>
          <Link to={'/appointment'}>AppointMent</Link>
          <Link to={'/about'}>AboutUs</Link>
        </div>
        {isAuthonticated ? (
          <button className="logoutBtn btn" onClick={handelLogout}>
            Logout
          </button>
        ) : (
          <button className="logoutBtn btn" onClick={HandelLogin}>
            Login
          </button>
        )}
      </div>
      <div className="hamburger" onClick={()=>setShow(!show)}><GiHamburgerMenu /></div>
    </nav>
  )
}

export default Navbar

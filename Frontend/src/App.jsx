import React, { useContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Appointment from './pages/Appointment'
import Rejister from './pages/Rejister'
import Aboutus from './pages/Aboutus'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './componantes/Navbar'
import { Context } from './main'
import axios from 'axios'
import Footer from './componantes/Footer'

const App = () => {
  const { isAuthonticated, setIsAuthonticated, setUser } = useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responce = await axios.get(
          'http://localhost:3000/api/v1/user/patient/me',
          { withCredentials: true },
        )
        setIsAuthonticated(true)
        setUser(responce.data?.user)
      } catch (error) {
        setIsAuthonticated(false)
        setUser({})
      }
    }
    fetchUser()
  }, [isAuthonticated])
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/register" element={<Rejister />} />
          <Route path="/about" element={<Aboutus />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  )
}

export default App

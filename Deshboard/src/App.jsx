import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Deshboard from './Componante/Deshboard'
import Login from './Componante/Login'
import AddnewDocoter from './Componante/AddnewDocoter'
import AddAdmin from './Componante/AddAdmin'
import Message from './Componante/Message'
import Doctors from './Componante/Doctors'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Context} from "./main"
import Sidebar from './Componante/Sidebar'
import "./App.css";

const App = () => {
  const {isAuthonticated, setIsAuthonticated, setUser} = useContext(Context)


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responce = await axios.get(
          'http://localhost:3000/api/v1/user/admin/me',
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
        <Sidebar />
        <Routes>
          <Route path='/' element={<Deshboard />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/doctor/addnew' element={<AddnewDocoter />}/>
          <Route path='/admin/addnew' element={<AddAdmin />}/>
          <Route path='/messages' element={<Message />}/>
          <Route path='/doctors' element={<Doctors />}/>
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  )
}

export default App

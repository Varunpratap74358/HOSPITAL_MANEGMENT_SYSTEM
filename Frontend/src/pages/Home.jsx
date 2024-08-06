import React from 'react'
import Hero from '../componantes/Hero'
import Biography from '../componantes/Biography'
import MessageForm from '../componantes/MessageForm'
import Departments from '../componantes/Departments'

const Home = () => {
  return (
    <>
      <Hero title={"Welcome to Varun's Hospital Manegment Syatem Website."} imgurl={"https://raw.githubusercontent.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/main/frontend/public/hero.png"} />
      <Biography imgurl={"https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/about.png?raw=true"} />
      <Departments />
      <MessageForm />
    </>
  )
}

export default Home

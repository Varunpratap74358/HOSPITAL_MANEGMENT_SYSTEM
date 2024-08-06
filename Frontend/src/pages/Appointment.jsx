import React from 'react'
import AppointmentForm from '../componantes/AppointmentForm'
import Hero from '../componantes/Hero'

const Appointment = () => {
  return (
    <div>
      <Hero title={"Schedule Your AppointMent | Varun's Hospital"} imgurl={"https://raw.githubusercontent.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/main/frontend/public/signin.png"} />
      <AppointmentForm />
    </div>
  )
}

export default Appointment

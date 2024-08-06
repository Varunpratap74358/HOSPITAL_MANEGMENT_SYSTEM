import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: 'Monday',
      time: '9:00 AM - 11:00 PM',
    },
    {
      id: 2,
      day: 'Tuesday',
      time: '12:00 PM - 12:00 AM',
    },
    {
      id: 3,
      day: 'Wednesday',
      time: '10:00 AM - 10:00 PM',
    },
    {
      id: 4,
      day: 'Thursday',
      time: '9:00 AM - 9:00 PM',
    },
    {
      id: 5,
      day: 'Monday',
      time: '3:00 PM - 9:00 PM',
    },
    {
      id: 6,
      day: 'Saturday',
      time: '9:00 AM - 3:00 PM',
    },
  ]
  return (
    <footer className="container">
      <hr />

      <div className="content">
        <div>
          <img
            src="https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/logo.png?raw=true"
            alt="logo"
            className="logo-img"
          />
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <Link to={'/'}>Home</Link>
            <Link to={'/appointment'}>AppointMent</Link>
            <Link to={'/about'}>About</Link>
          </ul>
        </div>
        <div>
          <h4>Hours</h4>
          {hours.map((v, i) => {
            return (
              <li key={i}>
                <span>{v.day}</span>
                <span>{v.time}</span>
              </li>
            )
          })}
        </div>
        <div>
          <h4>Contact</h4>
          <div>
            <FaPhoneAlt />
            <span>08601686595</span>
          </div>
          <div>
          <MdEmail />
            <span>varunpratap74358@gmail.com</span>
          </div>
          <div>
          <FaInstagram />
            <span>varun_singh_74358</span>
          </div>
          <div>
          <FaFacebook />
            <span>Varun Pratap Singh</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

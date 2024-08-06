import React from 'react'
import Hero from '../componantes/Hero'
import Biography from '../componantes/Biography'

const Aboutus = () => {
  return (
    <>
      <Hero
        title={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, odio!'
        }
        imgurl={
          'https://raw.githubusercontent.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/main/frontend/public/about.png'
        }
      />
      <Biography
        imgurl={
          'https://png.pngtree.com/png-clipart/20230814/original/pngtree-medical-conference-2d-vector-isolated-illustration-picture-image_7925927.png'
        }
      />
    </>
  )
}

export default Aboutus

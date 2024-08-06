import React from 'react'

const Hero = ({title,imgurl}) => {
  return (
    <div className='hero container'>
      <div className="banner">
        <h1>{title}</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aliquam, rerum magnam distinctio accusantium, expedita adipisci incidunt ullam repellendus quam unde vitae, veritatis provident dolore atque sint inventore earum nemo beatae autem voluptatem culpa mollitia! Corporis minima error aperiam alias, veritatis dolores numquam! Aliquid obcaecati, ipsam et vero magni temporibus.
        </p>
      </div>
      <div className="banner">
        <img src={imgurl} alt="hero" className='animated-image' />
        <span>
            <img src="https://raw.githubusercontent.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/main/frontend/public/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  )
}

export default Hero

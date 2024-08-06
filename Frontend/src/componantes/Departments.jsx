import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const Departments = () => {
  const departmentsArray = [
    {
      name: 'Pediatrics',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmONapCIf_HbV-kM0EVdD4yvaL21D041ZpIg&s',
    },
    {
      name: 'Orthopedics',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU8IMJgTlYLI2vje-7j6HfgcY5IPJJqUBG0g&s',
    },
    {
      name: 'Cardiology',
      imageUrl: 'https://media.licdn.com/dms/image/D4E12AQGVHWTso2ewJQ/article-cover_image-shrink_720_1280/0/1696964506000?e=2147483647&v=beta&t=lLVcVDSWfhH6bCbzfkgyr_9Ph78UM51Y0kFN5VJC3z4',
    },
    {
      name: 'Neurology',
      imageUrl: 'https://img.freepik.com/free-photo/colorful-image-human-brain_188544-21980.jpg',
    },
    {
      name: 'Oncology',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTAj0nHiUzp_MCHLZiyfix5AtAiX6wVx2Hww&s',
    },
    {
      name: 'Radiology',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ6_SvxNpbPpmXNIJ24a4yYuxnw0fGoBiZRg&s',
    },
    {
      name: 'Physical Therapy',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwuc7HQowINmzjA7gZFiquc-kHfuyFWbb-iQ&s',
    },
    {
      name: 'Dermatology',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiBwE1vosLg_GMRpugTBL7io4co-ziAjn6bA&s',
    },
    {
      name: 'ENT',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8G93-xyx4OZFCSWwDpxou0ON8N5XZUjhxPA&s',
    },
  ]

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }

  return (
    <>
      <div className="container departments">
        <h2>Departments</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            'tablet',
            'mobile',
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </div>
            )
          })}
        </Carousel>
      </div>
    </>
  )
}

export default Departments

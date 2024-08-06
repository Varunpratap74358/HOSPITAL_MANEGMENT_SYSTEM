import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  const { isAuthonticated } = useContext(Context)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/api/v1/user/docters',
          {
            withCredentials: true,
          },
        )
        // console.log(data.docters.length)
        setDoctors(data.docters)
      } catch (error) {
        console.log('Error in doctors componante', error)
        toast.error(error?.response?.data?.message)
      }
    }
    fetchDoctors()
  }, [])

  if (!isAuthonticated) {
    return <Navigate to={'/login'} />
  }
  return (
    <>
      <section className="page doctors">
        <h1>DOCTORS</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((v, i) => {
              return (
                <div className="card" key={i}>
                  <img
                    src={v.docAvater && v.docAvater.url}
                    alt="doctors image"
                  />
                  <h4>{`${v.firstName} ${v.lastName}`}</h4>
                  <div className="details">
                    <p>
                      Email: <span>{v.email}</span>
                    </p>
                    <p>
                      Phone: <span>{v.phone}</span>
                    </p>
                    <p>
                      DOB: <span>{v.dob.substring(0, 10)}</span>
                    </p>
                    <p>
                      DoctorDepartment: <span>{v.doctorDepartment}</span>
                    </p>
                    <p>
                      NIC: <span>{v.nic}</span>
                    </p>
                    <p>
                      Gender: <span>{v.gender}</span>
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Doctors

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [nic, setNic] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [appointment_date, setAppointment_date] = useState('')
  const [departmen, setDepartmen] = useState('')
  const [doctor_firstName, setDoctor_firstName] = useState('')
  const [doctor_lastName, setDoctor_lastName] = useState('')
  const [address, setAddress] = useState('')
  const [hasVisited, setHasVisited] = useState(false)
    const navigate = useNavigate()
  const departmensArray = [
    'Pediatrics',
    'Orthopedics',
    'Cardiology',
    'Neurology',
    'Oncology',
    'Radiology',
    'Physical Therapy',
    'Dermatology',
    'ENT',
  ]

  const handleAppointment = async (e) => {
    e.preventDefault()
    try {
      const hasVisitedBool = Boolean(hasVisited)
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/appointment/post',
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date,
          departmen,
          doctor_firstName,
          doctor_lastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        },
      )
      toast.success(data?.message)
      navigate("/")
    console.log(data)
      setFirstName(''),
        setLastName(''),
        setEmail(''),
        setPhone(''),
        setNic(''),
        setDob(''),
        setGender(''),
        setAppointment_date(''),
        setDepartmen(''),
        setDoctor_firstName(''),
        setDoctor_lastName(''),
        setHasVisited(''),
        setAddress('')

    } catch (error) {
      toast.error(error.response?.data?.message)
      toast.error(error?.message)
    console.log(error)
    }
  }

  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        'http://localhost:3000/api/v1/user/docters',
        {
          withCredentials: true,
        },
      )
      setDoctors(data.docters)
    //   console.log(data.docters) 
    }
    fetchDoctors()
    // console.log("doctors",doctors)
  }, [])


  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Mail">Male</option>
              <option value="Femail">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointment_date}
              onChange={(e) => setAppointment_date(e.target.value)}
            />
          </div>
          <div>
            <select
              value={departmen}
              onChange={(e) => {
                setDepartmen(e.target.value)
                setDoctor_firstName('')
                setDoctor_lastName('')
              }}
            >
              {departmensArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                )
              })}
            </select>
            <select
              value={`${doctor_firstName} ${doctor_lastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(' ')
                setDoctor_firstName(firstName)
                setDoctor_lastName(lastName)
              }}
              disabled={!departmen}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === departmen)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: '10px',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: 'none', width: '25px' }}
            />
          </div>
          <button style={{ margin: '0 auto' }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  )
}

export default AppointmentForm

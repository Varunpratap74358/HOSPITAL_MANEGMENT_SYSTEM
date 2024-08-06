import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewDoctor = () => {
  const { isAuthonticated } = useContext(Context);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [doctorDepartment, setDoctorDepartment] = useState('');
  const [docAvater, setDocAvater] = useState('');
  const [docAvaterPreview, setDocAvaterPreview] = useState('');

  const navigate = useNavigate();

  const departmentsArray = [
    'Pediatrics',
    'Orthopedics',
    'Cardiology',
    'Neurology',
    'Oncology',
    'Radiology',
    'Physical Therapy',
    'Dermatology',
    'ENT',
  ];

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvaterPreview(reader.result);
      setDocAvater(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('nic', nic);
      formData.append('dob', dob);
      formData.append('gender', gender);
      formData.append('doctorDepartment', doctorDepartment);
      if (docAvater) formData.append('docAvater', docAvater);

      await axios
        .post('http://localhost:3000/api/v1/user/doctor/addnew', formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          toast.success(res.data?.message);
          console.log("Response:", res);
          navigate('/'); // Uncomment this if you want to redirect after adding the doctor
        });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      console.log(error);
    }
  };

  if (!isAuthonticated) {
    return <Navigate to={'/login'} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-doctor-form">
        <img
          src="https://raw.githubusercontent.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/main/dashboard/public/logo.png"
          alt="logo"
          className="logo"
        />
        <h1 className="form-title">Register New Doctor</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div>
              <img
                src={
                  docAvaterPreview
                    ? `${docAvaterPreview}`
                    : 'https://raw.githubusercontent.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/main/dashboard/public/docHolder.jpg'
                }
                alt="Doc Avatar"
              />
              <input type="file" onChange={handleAvatar}  />
            </div>

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
              <input
                type="number"
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
              <input
                type={'date'}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Mail">Male</option>
                <option value="Femail">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={doctorDepartment}
                onChange={(e) => setDoctorDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((v, i) => (
                  <option value={v} key={i}>
                    {v}
                  </option>
                ))}
              </select>
              <button type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;

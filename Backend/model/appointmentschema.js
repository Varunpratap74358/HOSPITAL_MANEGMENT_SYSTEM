import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
    minLength: [10, 'Phone number must contain 10 digit'],
    maxLength: [10, 'Phone number must contain 10 digit'],
  },
  nic: {
    type: String,
    require: true,
  },
  dob: {
    type: Date,
    require: [true, 'DOB is Require!'],
  },
  gender: {
    type: String,
    require: true,
    enum: ['Mail', 'Femail'],
  },
  appointment_date: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  doctor: {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
  },
  hasVisited: {
    type: Boolean,
    default:false
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  status:{
    type:String,
    enum:['Pending','Accepted','Rejected'],
    default:'Pending'
  }
})

export const Appointment = mongoose.model("Appointment",appointmentSchema)
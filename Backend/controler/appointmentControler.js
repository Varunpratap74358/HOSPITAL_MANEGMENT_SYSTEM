import { catchAsyncError } from '../middleware/catchAsyncError.js'
import ErrorHandler from '../middleware/errorHandlerMiddlewate.js'
import { Appointment } from '../model/appointmentschema.js'
import { User } from '../model/userSchema.js'

export const postAppointment = catchAsyncError(async (req, res, next) => {
  const {
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
    hasVisited,
    address,
  } = req.body

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !departmen ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler('Please fill full all form', 400))
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: 'Doctor',
    doctorDepartment: departmen,
  })
  if (isConflict.length === 0) {
    return next(new ErrorHandler('Doctor not found', 404))
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        'Doctor Conflict! Please Contact Through Email or Phone! ',
        401,
      ),
    )
  }
  const dectorId = isConflict[0]._id
  const patientId = req.user._id
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    departmen,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    dectorId,
    patientId,
  })
  res.status(200).json({
    success: true,
    message: 'Appointment send successfully...',
  })
})

export const getAppontment = catchAsyncError(async (req, res, next) => {
  const appointmentFind = await Appointment.find()
  res.status(200).json({
    success: true,
    appointmentFind,
  })
})

export const updateAppointStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params
  let appointment = await Appointment.findById(id)
  if (!appointment) {
    return next(new ErrorHandler('appoint not found...', 400))
  }
  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    message: 'Appointment Status Updated!',
    appointment,
  })
})

export const appointdelete = catchAsyncError(async (req, res, next) => {
  const { id } = req.params
  let appointment = await Appointment.findById(id)
  if (!appointment) {
    return next(new ErrorHandler('appoint not found...', 400))
  }
  await appointment.deleteOne()
  res.json({
    success: true,
    maessage: 'Appointment deleted successfully',
  })
})

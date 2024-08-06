import { catchAsyncError } from '../middleware/catchAsyncError.js'
import ErrorHandler from '../middleware/errorHandlerMiddlewate.js'
import { User } from '../model/userSchema.js'
import { genrateToken } from '../utils/jwtToken.js'
import cloudinary from 'cloudinary'

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  } = req.body

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !role ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler('Plise Fill Full Form!', 401))
  }
  let user = await User.findOne({ email })
  if (user) {
    return next(new ErrorHandler('User already register', 400))
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  })
  genrateToken(user, 'User Registered', 200, res)
  //   res.status(201).json({
  //     success: true,
  //     message: 'User Registered',
  //     user,
  //   })
})

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler('Plise provide all detais!', 401))
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler('Password and Confirm password do not match', 401),
    )
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(new ErrorHandler('Invalid Detail...', 401))
  }
  const isPassword = await user.comparePassword(password)
  if (!isPassword) {
    return next(new ErrorHandler('Invalid password...', 401))
  }
  if (role !== user.role) {
    return next(new ErrorHandler('User with this role not found...', 401))
  }
  genrateToken(user, 'User login Successfully...', 200, res)
  // res.status(200).json({
  //     success:true,
  //     message:"User login Successfully..."
  // })
})

export const addAdmin = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
  } = req.body
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler('Plise Fill Full Form!', 401))
  }

  const isRegsitered = await User.findOne({ email })
  if (isRegsitered) {
    return next(
      new ErrorHandler(
        `${isRegsitered.role} with this email already exist`,
        401,
      ),
    )
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: 'Admin',
  })
  res.status(201).json({
    success: true,
    message: 'New Admin registerd successfully....',
  })
})

export const getAllDocter = catchAsyncError(async (req, res, next) => {
  const docters = await User.find({ role: 'Doctor' })
  res.status(200).json({
    success: true,
    docters,
  })
})

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user
  res.status(201).json({
    success: true,
    user,
  })
})

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie('adminToken', '', {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: 'Admin logout successfully...',
    })
})

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie('patientToken', '', {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: 'Patient logout successfully...',
    })
})

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  try {
    const { docAvater } = req.files
    // console.log(docAvater)
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler('Docter avtar required', 400))
    }
    const allowedFormats = [
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/jpg',
    ]
    if (!allowedFormats.includes(docAvater.mimetype)) {
      return next(new ErrorHandler('File format is not supported', 400))
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
    } = req.body
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment
    ) {
      return next(new ErrorHandler('Plise provide full deatil!', 400))
    }
    const isRegistered = await User.find({ email })
    if (isRegistered.length) {
      return next(new ErrorHandler('User already exist!', 401))
    }
    const cloudainaryResponce = await cloudinary.uploader.upload(
      docAvater.tempFilePath,
    )
    if (!cloudainaryResponce || cloudainaryResponce.error) {
      console.log('cloudainaryResponce Error', cloudainaryResponce.error)
    }
    const docter = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
      role: 'Doctor',
      docAvater: {
        public_id: cloudainaryResponce.public_id,
        url: cloudainaryResponce.secure_url,
      },
    })
    res.status(200).json({
      success: true,
      message: 'New Docter Added!',
      docter,
    })
  } catch (error) {
    // console.log(error)
    res.json({ error })
  }
})

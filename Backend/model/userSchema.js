import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    require: true,
    minLength: [8, 'Password must containe at 8 digit!'],
    select: false,
  },
  role: {
    type: String,
    require: true,
    enum: ['Admin', 'Patient', 'Doctor'],
  },
  doctorDepartment: {
    type: String,
  },
  docAvater: {
    public_id: String,
    url: String,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password)
}

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.COOKIE_EXPIRE,
  })
}

export const User = mongoose.model('User', userSchema)

import {catchAsyncError} from "../middleware/catchAsyncError.js"
import { Message } from '../model/messageSchema.js'
import ErrorHandler from "../middleware/errorHandlerMiddlewate.js"

export const sendMessage = catchAsyncError( async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Full fill All Form",401))
  }
  const data = await Message.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  })
  res.json({
    success:true,
    message:"Message send Successfully...",
    data
  })
})

export const getAllMessage = catchAsyncError(async(req,res,next)=>{
  const message = await Message.find()
  res.status(200).json({
    success:true,
    message,
  })
})
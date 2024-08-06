import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileupload from 'express-fileupload'
import cloudinary from 'cloudinary'
import { errorMiddleware } from './middleware/errorHandlerMiddlewate.js'
import messageRouter from "./route/messageRouter.js"
import userRouter from './route/userRouter.js'
import appointmentRouter from "./route/appointmentRouter.js"

const app = express()
dotenv.config()
const port = process.env.PORT || 4000

app.use(
  cors({
    origin: true,
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
)


// routers
app.use("/api/v1/message",messageRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/appointment",appointmentRouter)




mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Db is connectd')
})


// cloudinary setup
cloudinary.v2.config({
    cloud_name:process.env.COUDINARY_CLOUD_NAME,
    api_key:process.env.COUDINARY_API_KEY,
    api_secret:process.env.COUDINARY_API_SECRET
})

// Error middleware
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`port is running on port ${port}`)
})


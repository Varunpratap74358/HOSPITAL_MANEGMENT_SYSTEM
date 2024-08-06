import express from 'express'
import { appointdelete, getAppontment, postAppointment, updateAppointStatus } from '../controler/appointmentControler.js'
import {isAdminAuthenticated,isPatientAuthenticated} from "../middleware/auth.js"

const router = express.Router()

router.post("/post", isPatientAuthenticated ,postAppointment)
router.get("/getall", isAdminAuthenticated ,getAppontment)
router.put("/update/:id", isAdminAuthenticated ,updateAppointStatus)
router.delete("/delete/:id", isAdminAuthenticated ,appointdelete)


export default router
import express from 'express'
import { addAdmin, addNewDoctor, getAllDocter, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from '../controler/userControler.js'
import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post("/patient/register",patientRegister)
router.post("/login",login)
router.post("/admin/addnew",isAdminAuthenticated ,addAdmin)
router.get("/docters",getAllDocter)
router.get("/admin/me", isAdminAuthenticated ,getUserDetails)
router.get("/patient/me", isPatientAuthenticated ,getUserDetails)
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin)
router.get("/patient/logout",isPatientAuthenticated,logoutPatient)
router.post("/doctor/addnew",isAdminAuthenticated ,addNewDoctor)

export default router
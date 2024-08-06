import express from 'express'
import { getAllMessage, sendMessage } from '../controler/messageControler.js'
import {isAdminAuthenticated,isPatientAuthenticated} from "../middleware/auth.js"

const router = express.Router()

router.post("/send",sendMessage)
router.get("/getall", isAdminAuthenticated ,getAllMessage)

export default router
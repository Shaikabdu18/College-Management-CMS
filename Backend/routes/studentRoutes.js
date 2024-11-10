import express from "express"
import { getStudents } from "../controllers/studentsController.js"
import { verifyToken } from "../middlewares/auth.js"

const router = express.Router()

router.get("/profile",verifyToken,getStudents)

export default router
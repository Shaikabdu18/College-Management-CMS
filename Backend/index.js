import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/db.js"
import { swaggerDocs,swaggerUi } from "./swagger.js"
import authRouter from "./routes/authRoutes.js"
import errorHandler from "./middlewares/errorHandler.js"
import cors from "cors";

const app = express()
dotenv.config()

const PORT = process.env.PORT
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL
app.use(express.json())
app.use("/api/auth",authRouter)
app.use(errorHandler)
  

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT}`)
    connectDB()
    
})
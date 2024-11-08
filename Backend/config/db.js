import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.connect(process.env.mongodb)
        console.log("Connected To MongoDB");
        
    } catch (error) {
        console.error("Connection Error",error.message)
        process.exit(1)
    }
}

export default connectDB
import mongoose from "mongoose";
import bcrypt  from "bcryptjs";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","staff","student"]
    },
    department:{
        type:String,
    }
    ,staffId:{
        type:String,

    },
    studentId:{
        type:String,

    }
},
{
    timestamps :true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
});
const User = mongoose.model("User",userSchema)
export default User
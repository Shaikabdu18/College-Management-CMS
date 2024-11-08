import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async(req,res,next)=>{
    const {name,email,password,role,department,staffId,studentId} = req.body;
    try {
        const userExists = await User.findOne({email})
        if(userExists) return res.status(400).json({msg:"User Already Exists"})
            const user = new User({
                name,
                email:email.toLowerCase(),
                password,
                role:role,
                department:department||"",
                staffId:staffId||undefined,
                studentId:studentId||undefined

        })
        await user.save()
        return res.status(201).json({msg:"User Created Succesfully"})
        
    } catch (error) {
       next(error)
    }
}

export const loginUser = async (req, res, next) => {
  const { email, password, id, role } = req.body;

  try {
    // Find user by email
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    // Role-specific authentication
    if (role === "admin" && userExists.role === "admin") {
      // Admin role: directly compare plain text password (since it’s not hashed)
      if (userExists.password !== password) {
        return res.status(401).json({ msg: "Invalid Admin Credentials" });
      }
    } else {
      // Other roles: verify hashed password
      if (!(await bcrypt.compare(password, userExists.password))) {
        return res.status(401).json({ msg: "Invalid Credentials" });
      }

      if (role === "student" && userExists.role === "student") {
        // Check student ID
        if (userExists.studentId !== id) {
          return res.status(401).json({ msg: "Invalid Student ID" });
        }
      } else if (role === "staff" && userExists.role === "staff") {
        // Check staff ID
        if (userExists.staffId !== id) {
          return res.status(401).json({ msg: "Invalid Staff ID" });
        }
      } else {
        // Role mismatch or invalid role
        return res.status(401).json({ msg: "Role mismatch or invalid role" });
      }
    }

    // Generate JWT token if credentials are valid
    const token = jwt.sign(
      { id: userExists._id, role: userExists.role },
      process.env.JWT,  // Ensure JWT_SECRET is defined in your .env file
      { expiresIn: "50d" }
    );

    return res.status(200).json({ token });

  } catch (error) {
    next(error);
  }
};

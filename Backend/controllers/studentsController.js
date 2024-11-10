import User from "../models/userModel.js";

export const getStudents = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id).select('-role -password -createdAt -updatedAt -__v');
        res.status(200).json({user})
        
    } catch (error) {
        next(error)
    }
}


import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]

    if(!token) return res.status(403).json({msg:"Un Authorized"})
    try {
        const decode = jwt.verify(token,process.env.JWT);
        req.user = decode;
        next()
    } catch (error) {
        next(error)
    }
}
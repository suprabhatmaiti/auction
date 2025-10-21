import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken=(req,res,next)=>{
    try{
        const reqHeader = req.headers.authorization;

        if(!reqHeader){
            return res.status(401).json({error:'Unauthorized: No token provided'});
        }

        // console.log(reqHeader);

        const token= reqHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({error:'Unauthorized: malformed token'})
        }
        // console.log(token);

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(error){
        console.log(error);
        return res.status(401).json({error:'Unauthorized: Invalid or expired token'})
    }
} 


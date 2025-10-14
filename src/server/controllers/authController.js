import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js' ;

export const register = async(req,res) =>{
    const {name,email,password,role} = req.body;

    try{
        const userExist = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        if(userExist.rowCount > 0){
            return res.status(400).json({error:'Email already registered'});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await pool.query("INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role",
            [name,email,hashedPassword,role||'buyer']);
        
         res.status(201).json({messege:"user registered successfully", user: newUser.rows[0]});   

    } catch (err){
        console.log(err);
        res.status(500).json({error:"Server error during registration"});
    }
}


export const login = async (req,res) => {
    const {email,password} = req.body;

    try{
        const result = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        if(result.rows.length === 0){
            return res.body.status(400).json({error:"Invalid email or password"});
        }

        const user = result.rows[0];
        console.log(user);

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid email or password"});
        }

        const token = jwt.sign(
            {id:user.id,email:user.email, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.json({messege:"Login successfull",
            token,
            user:{id:user.id,name:user.name, email:user.email, role:user.role}
        });


    }catch(err){
        console.log(err);
        res.status(500).json({error:"Server error during login"});
    }
}
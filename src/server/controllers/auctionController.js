import { jwtDecode } from 'jwt-decode';
import {pool} from '../config/db.js';
import jwt from 'jsonwebtoken';

export const createAuction = async(req,res)=> {
    try{
        const {title, description, image_url, category, start_price, end_time} =req.body;

        if(!title || !start_price || !end_time ){
            return res.status(400).json({error:'Missing required fields'})
        }
        

        const sellerId = req.user.id;
        // console.log(req.user.id)

        const start_time = new Date();

        const result = await pool.query(`INSERT INTO auctions 
            (title, description, image_url, category, start_price, current_price, seller_id, start_time, end_time, is_active)
            VALUES ($1, $2, $3, $4, $5, $5, $6, $7, $8, true)
            RETURNING *`,
            [title, description, image_url, category, start_price, sellerId, start_time, end_time]
        );

        res.status(201).json({
            message: "Auction created successfully",
            auction: result.rows[0]
        })
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Server error during auction creation"})
    }
}
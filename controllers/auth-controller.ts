const bcrypt = require("bcryptjs");
const db = require('../config/config-db.js');
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";

let auth = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const result : any= await UserRepository.login(email);

        if (result[0].length > 0){
            const isPasswordValid = await bcrypt.compare(password, result[0][0].password);

            if (isPasswordValid){
                
                const token = jwt.sign({ email: email }, "camilo", { expiresIn: "1h" });
                return res.status(200).json({ 
                    status: 'Successful authentication',
                    token: token 
                });
            }
        }
        return res.status(401).json({ 
            status: 'Incorrect username or password'
        });
    } catch (error) {
        console.log(error);
    }
}

export default auth;
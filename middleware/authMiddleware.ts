import { Request, Response} from "express";
import UserRepository from "../repositories/UserRepository";
const bcrypt = require("bcryptjs");
import Auth from "../Dto/AuthDto";
import generateToken from "../helpers/generateToken";

let authMiddleware = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const result : any= await UserRepository.login(new Auth(email,password));
        if (result[0].length > 0){
            const isPasswordValid = await bcrypt.compare(password, result[0][0].password);
            if (isPasswordValid){
                return res.status(200).json({
                    status: "Succesful Authentication",
                    token:  await generateToken(email)
                })
            }
            else {
                return res.status(401).json({
                    status: 'Fallo en la autenticación'
                })
            }
        }
        return res.status(401).json({ 
            status: 'Incorrect username or password'
        });
    } catch (error) {
        console.log(error);
    }
}

export default authMiddleware;
const bcrypt = require("bcryptjs");
const db = require('../config/config-db.js');
import { Request, Response} from "express";
import generateToken from "../helpers/generateToken";
import Auth from "../Dto/AuthDto";
import UserService from "../services/UserService";

const authController = async (req: Request, res: Response)=> {
    try {
        const {email, password} = req.body;
        console.log(req.body);
        
        const result : any= await UserService.auth(new Auth(email,password));
        if (result.logged){
            return res.status(200).json({
                status: "Succesful Authentication",
                token:  await generateToken(email)
            })
        }

        
        return res.status(401).json({ 
            status: 'Incorrect username or password'
        });
    } catch (error: any) {
        console.error("Error durante el inicio de sesion:", error); // Para ver más detalles
        if (error && error.code == "ER_DUP_ENTRY") {
          return res.status(500).send({ errorInfo: error.sqlMessage });
        }
        return res.status(500).send({ message: "Error interno del servidor" });
      }
}

export default authController;

import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import { Request, Response } from "express";


let register = async (req: Request, res: Response) => {
  try {
    const {
      email, 
      nombres, 
      apellidos, 
      telefono, 
      password, 
      edad, 
      document
    } = req.body;
    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await UserRepository.add(new User(email, nombres, apellidos, telefono, hashedPassword, edad, document));
    console.log(result);
    
    return res.status(201).send(
      { status: 'register ok', password_hasheado: hashedPassword }
    );
  } catch (error: any) {
    console.error("Error durante el registro:", error); // Para ver más detalles
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage });
    }
    return res.status(500).send({ message: "Error interno del servidor" });
  }
}


export default register;

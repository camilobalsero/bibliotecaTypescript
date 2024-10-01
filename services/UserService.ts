import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../helpers/generateHash';
import Auth from '../Dto/AuthDto';
const bcrypt = require("bcryptjs");


class UserService {
    
    
    static async register(user: User) {
        user.password = await generateHash(user.password);
        return  await UserRepository.add(user);
    }

    static async auth(auth: Auth){
        const result: any = await UserRepository.login(auth);
        if (result[0].length > 0){
            const isPasswordValid = await bcrypt.compare(auth.password, result[0][0].password);
            if(isPasswordValid){
                return {logged: true, status: "Succesful Authentication"}
                }
                return{logged: false, status: "Incorrect username or password"}
            }   
            return{logged: false, status: "Incorrect username or password"}
    }

    static async changePassword(email: string, newPassword: string) {
        try {
            // Generar el hash de la nueva contraseña
            const newPasswordHash = await generateHash(newPassword);
            
            // Actualizar la contraseña en la base de datos
            await UserRepository.resetPassword(email, newPasswordHash);

            return { success: true, status: "Contraseña cambiada exitosamente" };
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            throw new Error("Error al cambiar la contraseña");
        }
    }

}

export default UserService;
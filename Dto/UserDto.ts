class User {
    email: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    password: string;
    edad: number
    documento: string;
    constructor(
        email: string, nombres: string,
        apellidos: string, telefono: string,
        password: string, edad: number,
        documento: string,
    ) {
        this.email = email;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.password = password;
        this.edad = edad;
        this.documento = documento;
    }
}

export default User;
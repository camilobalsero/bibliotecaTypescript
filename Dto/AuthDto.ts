class Auth{
    static email: any;
    static password(password: any, password1: any) {
        throw new Error("Method not implemented.");
    }
    email:string;
    password:string;
    constructor(
        email:string, password:string
    ){
        this.email=email;
        this.password=password;
    }
}

export default Auth;
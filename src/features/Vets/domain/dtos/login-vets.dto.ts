import { loginSchema } from "../../infrastructure";

export class LoginVetsDto {
    private constructor(
        public email: string,
        public password: string
    ) {}

    static login(object: {[key: string]: any}): [string?, LoginVetsDto?] {
        const { email, password } = object;
        const loginDto = new LoginVetsDto(email, password);
        const { error } = loginSchema.validate(loginDto);
        if (error) return [error.message, undefined]
        return [undefined, loginDto]
    }
}
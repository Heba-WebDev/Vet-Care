import { registerSchema } from '../../infrastructure/validation/joi-schemas/register.schema'

export class RegisterVetsDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
        public job_title: string,
        public phone_number: string,
    ) {}

    static register(object: { [key: string]: any }): [string?, RegisterVetsDto?] {
        const { name, email, password, phone_number, job_title } = object;
        const vetsDto = new RegisterVetsDto(name, email, password, job_title, phone_number);
        const { error } = registerSchema.validate(vetsDto);
        if (error) return [error.message, undefined];
        return [undefined, vetsDto];
    }
}
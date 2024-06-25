

export class RegisterUserDto {

    private constructor(
        public name: string,
        public job_title: string,
        public email: string,
        public password: string,
        public phone_number: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, RegisterUserDto?]{
        const { name, email, password, phone_number, job_title} = object;
        
        return [
            undefined, new RegisterUserDto(
                name, email, password, phone_number, job_title
            )
        ];
    }
}
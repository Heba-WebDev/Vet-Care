import { OwnersInputValidation } from "../../infrastructure";

export class RegisterOwnerDto {
    private constructor(
        public name: string,
        public email: string,
        public phone_number: string,
    ) {}

    static register(object: {[key: string]: string}): [string?, RegisterOwnerDto?] {
        const { name, email, phone_number } = object;
        const ownerDto = new RegisterOwnerDto(name, email, phone_number);
        const error = new OwnersInputValidation().register(ownerDto);
        if (error) return [error, undefined]
        return [undefined, ownerDto];
    }
}

import { StaffInputValidation } from "../../infrastructure/validation";


export class UpdateStaffDto {

    private constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public phone_number: string,
    ) {}

    static upate(object: {[key: string]: any}): [string?, UpdateStaffDto?] {
        const { id, name, email, password, phone_number } = object;
        if (!name && !email && !password && !phone_number ) return ['Provide an email, a password or a phone number to update', undefined]
        const staffDto = new UpdateStaffDto(id, name, email, password, phone_number);
        const err = new StaffInputValidation().update(staffDto);
        if (err) return [err, undefined]
        return [undefined, staffDto]
    }

}
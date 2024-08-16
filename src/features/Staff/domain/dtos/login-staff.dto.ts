import { StaffInputValidation } from "../../infrastructure/validation";

export class LoginStaffDto{

    private constructor(
        public email: string,
        public password: string
    ) {}

    static login(object: {[key: string]: string}): [string?, LoginStaffDto?] {
        const { email, password } = object;
        const staffDto = new LoginStaffDto(email, password);
        const err = new StaffInputValidation().login(staffDto);
        if (err) return [err, undefined]
        return [undefined, staffDto];
    }
}

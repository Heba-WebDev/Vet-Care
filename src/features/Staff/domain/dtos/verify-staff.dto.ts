import { StaffInputValidation } from "../../infrastructure/validation";

export class VerifyStaffDto{

    private constructor(
        public email: string,
    ) {}

    static verify(object: {[key: string]: any}): [string?, VerifyStaffDto?] {
        const { email } = object;
        const staffDto = new VerifyStaffDto(email);
        const err = new StaffInputValidation().verify(staffDto);
        if (err) return [err, undefined]
        return [undefined, staffDto];
    }
}
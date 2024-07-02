import { RegisterStaffDto } from "../../domain";
import { DeleteStaffDto } from "../../domain/dtos/delete-staff.dto";
import { LoginStaffDto } from "../../domain/dtos/login-staff.dto";
import { VerifyStaffDto } from "../../domain/dtos/verify-staff.dto";
import { StaffValidation } from "../../domain/validation/register-staff";
import { registerSchema, loginSchema } from "./joi-schemas";
import { verifySchema } from "./joi-schemas/verify-staff.schema";



export class StaffInputValidation implements StaffValidation {
    register(staffDto: RegisterStaffDto): string | null {
    const { error } = registerSchema.validate(staffDto);
    if (error) return error.message;
    return null;
    }

    login(staffDto: LoginStaffDto): string | null {
        const { error } = loginSchema.validate(staffDto);
        if (error) return error.message;
        return null;
    }

    verify(staffDto: VerifyStaffDto): string | null {
        const { error } = verifySchema.validate(staffDto);
        return null;
    }

    delete(staffDto: DeleteStaffDto): string | null {
        const { error } = verifySchema.validate(staffDto);
        return null;
    }
}
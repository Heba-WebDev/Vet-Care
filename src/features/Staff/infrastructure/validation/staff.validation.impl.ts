import { RegisterStaffDto } from "../../domain";
import { DeleteStaffDto } from "../../domain/dtos/delete-staff.dto";
import { GetAllStaffDto } from "../../domain/dtos/get-staff.dto";
import { LoginStaffDto } from "../../domain/dtos/login-staff.dto";
import { VerifyStaffDto } from "../../domain/dtos/verify-staff.dto";

import { registerSchema, loginSchema, deleteSchema, verifySchema, getAllSchema } from "./joi-schemas";


export class StaffInputValidation {
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
        if (error) return error.message;
        return null;
    }

    delete(staffDto: DeleteStaffDto): string | null {
        const { error } = deleteSchema.validate(staffDto);
        if (error) return error.message;
        return null;
    }

    getAll(staffDto: GetAllStaffDto): string | null {
        const { error } = getAllSchema.validate(staffDto);
        if (error) return error.message;
        return null;
    }
}
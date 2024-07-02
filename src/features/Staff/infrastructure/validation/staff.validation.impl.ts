import { RegisterStaffDto } from "../../domain";
import { StaffValidation } from "../../domain/validation/register-staff";
import { registerSchema } from "./joi-schemas/register-staff.schema";


export class StaffInputValidation implements StaffValidation {
    register(staffDto: RegisterStaffDto): string | null {
    const { error } = registerSchema.validate(staffDto)
    if (error) return error.message;
    return null;
    }
}
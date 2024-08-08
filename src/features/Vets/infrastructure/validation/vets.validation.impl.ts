
import { RegisterVetsDto } from "../../domain/dtos/register-vets.dto";
import { registerSchema } from "./joi-schemas/register.schema";


export class StaffInputValidation {
    register(staffDto: RegisterVetsDto): string | null {
    const { error } = registerSchema.validate(staffDto);
    if (error) return error.message;
    return null;
    }

}
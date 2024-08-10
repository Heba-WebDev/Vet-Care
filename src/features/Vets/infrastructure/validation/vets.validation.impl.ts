import { RegisterVetsDto, VerifyVetDto } from "../../domain";
import { registerSchema,verifySchema } from "./joi-schemas";

export class StaffInputValidation {
    register(vetsDto: RegisterVetsDto): string | null {
    const { error } = registerSchema.validate(vetsDto);
    if (error) return error.message;
    return null;
    }

   verify(vetsDto: VerifyVetDto): string | null {
    const { error } = verifySchema.validate(vetsDto);
    if (error) return error.message;
    return null;
   }
}
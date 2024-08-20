import { RegisterOwnerDto } from "../../domain";
import { ownerRegisterSchema } from "./joi-schemas";

export class OwnersInputValidation {

    register(ownerDto: RegisterOwnerDto): string | null {
    const { error } = ownerRegisterSchema.validate(ownerDto);
    if (error) return error.message;
    return null;
    }
}

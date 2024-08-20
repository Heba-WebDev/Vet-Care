import { RegisterOwnerDto, GetAllOwnersDto } from "../../domain";
import { ownerRegisterSchema, getAllOwnersSchema } from "./joi-schemas";

export class OwnersInputValidation {

    register(ownerDto: RegisterOwnerDto): string | null {
        const { error } = ownerRegisterSchema.validate(ownerDto);
        if (error) return error.message;
        return null;
    }

    getAll(ownerDto: GetAllOwnersDto): string | null {
        const { error } = getAllOwnersSchema.validate(ownerDto);
        if (error) return error.message;
        return null;
    }
}

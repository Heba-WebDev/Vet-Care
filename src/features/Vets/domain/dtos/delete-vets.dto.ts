import { DeleteSchema } from "../../infrastructure";


export class DeleteVetsDto {
    private constructor(
        public id: string,
        public exit_reason: string
    ) {}

    static delete(object: {[key: string]: any}): [string?, DeleteVetsDto?] {
        const { id, exit_reason } = object;
        const deleteDto = new DeleteVetsDto(id, exit_reason);
        const { error } = DeleteSchema.validate(deleteDto);
        if (error) return [error.message, undefined]
        return [undefined, deleteDto]
    }
}
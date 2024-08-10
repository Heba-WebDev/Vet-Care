import { DeleteVetsDto } from "../dtos";
import { DeleteVetsUseCase } from "../interfaces";
import { VetsRepository } from "../repositories";


export class DeleteVets implements DeleteVetsUseCase {
    constructor(
        private readonly repo: VetsRepository,
    ) {}
    async execuse(dto: DeleteVetsDto): Promise<any> {
        await this.repo.delete(dto);
       return {
            message: 'Vet succssfully deleted',
            data: null
        }
    }

}
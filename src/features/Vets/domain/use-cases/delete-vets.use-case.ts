import { DeleteVetsDto } from '../dtos';
import { DeleteVetsUseCase, VetStandardResponse } from '../interfaces';
import { VetsRepository } from '../repositories';

export class DeleteVets implements DeleteVetsUseCase {
    constructor(private readonly repo: VetsRepository) {}
    async execute(dto: DeleteVetsDto): Promise<VetStandardResponse> {
        await this.repo.delete(dto);
        return {
            status: 'success',
            message: 'Vet succssfully deleted',
            data: null,
        };
    }
}

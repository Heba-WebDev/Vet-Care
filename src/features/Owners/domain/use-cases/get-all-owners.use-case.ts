import { GetAllOwnersDto } from '../dtos';
import { AllOwnersResponse, GetOwnersUseCase } from '../interfaces';
import { OwnersRepository } from '../repositories';

export class GetAllOwners implements GetOwnersUseCase {
    constructor(private readonly repo: OwnersRepository) {}
    public async execute(
        ownerDto: GetAllOwnersDto | null,
    ): Promise<AllOwnersResponse> {
        const owners = await this.repo.getAll(ownerDto);
        return {
            status: 'success',
            message: 'Owners successfully fetched',
            data: owners!,
        };
    }
}

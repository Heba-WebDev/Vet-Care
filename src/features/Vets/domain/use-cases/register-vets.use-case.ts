import { RegisterVetsDto } from '../dtos';
import { RegisterVetsUseCase, VetStandardResponse } from '../interfaces';
import { VetsRepository } from '../repositories';

export class RegisterVets implements RegisterVetsUseCase {
    constructor(private readonly repo: VetsRepository) {}
    public async execute(
        registerVets: RegisterVetsDto,
    ): Promise<VetStandardResponse> {
        const vet = await this.repo.register(registerVets);
        return {
            status: 'success',
            message: 'Successfully registered',
            data: vet,
        };
    }
}

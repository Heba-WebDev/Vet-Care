import { RegisterOwnerDto } from '../dtos';
import { OwnersStandardResponse, RegisterOwnerUseCase } from '../interfaces';
import { OwnersRepository } from '../repositories';

export class RegisterOwner implements RegisterOwnerUseCase {
    constructor(private readonly repo: OwnersRepository) {}
    public async execute(
        registerOwner: RegisterOwnerDto,
    ): Promise<OwnersStandardResponse> {
        const owner = await this.repo.register(registerOwner);
        return {
            status: 'success',
            message: 'Owner successfully registered',
            data: owner,
        };
    }
}

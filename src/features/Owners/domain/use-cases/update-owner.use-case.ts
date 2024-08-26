import { UpdateOwnerDto } from '../dtos';
import { OwnersStandardResponse, UpdateOwnerUseCase } from '../interfaces';
import { OwnersRepository } from '../repositories';

export class UpdateOwner implements UpdateOwnerUseCase {
  constructor(private readonly repo: OwnersRepository) {}

  public async execute(ownerDto: UpdateOwnerDto): Promise<OwnersStandardResponse> {
    const owner = await this.repo.update(ownerDto);
    return {
      status: 'success',
      message: 'Owner successfully updated',
      data: owner,
    };
  }
}

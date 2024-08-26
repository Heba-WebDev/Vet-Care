import { UpdateVetsDto } from '../dtos';
import { UpdateVetsUseCase, VetStandardResponse } from '../interfaces';
import { VetsRepository } from '../repositories';

export class UpdateVets implements UpdateVetsUseCase {
  constructor(private readonly repo: VetsRepository) {}
  async execute(updateVetsDto: UpdateVetsDto): Promise<VetStandardResponse> {
    const vet = await this.repo.update(updateVetsDto);
    return {
      status: 'success',
      message: 'Account successfully updated',
      data: vet,
    };
  }
}

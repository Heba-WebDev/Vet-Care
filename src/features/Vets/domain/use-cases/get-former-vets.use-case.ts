import { GetAllVetsDto } from '../dtos';
import { FormerVetEntity } from '../entities';
import { AllFormerVetsResponse, GetAllFormerVetsUseCase } from '../interfaces';
import { VetsRepository } from '../repositories';

export class GetAllFormerVets implements GetAllFormerVetsUseCase {
  constructor(private readonly repo: VetsRepository) {}
  async execute(getAllDto: GetAllVetsDto): Promise<AllFormerVetsResponse> {
    const formerVets = await this.repo.GetAllFormer(getAllDto);
    return {
      status: 'success',
      message: null,
      data: formerVets as FormerVetEntity[],
    };
  }
}

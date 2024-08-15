import { GetAllVetsDto } from "../dtos";
import { FormerVetEntity } from "../entities";
import { GetAllFormerVetsUseCase } from "../interfaces";
import { VetsRepository } from "../repositories";


export class GetAllFormerVets implements GetAllFormerVetsUseCase {
     constructor(
        private readonly repo: VetsRepository
    ) {}
    async execute(getAllDto: GetAllVetsDto): Promise<FormerVetEntity[]> {
        const formerVets = await this.repo.GetAllFormer(getAllDto);
        return formerVets as FormerVetEntity[]
    }
}
import { GetAllVetsDto } from "../dtos";
import { VetEntity } from "../entities";
import { AllVetResponse, GetAllVetsUseCase } from "../interfaces";
import { VetsRepository } from "../repositories";



export class GetAllVets implements GetAllVetsUseCase {
     constructor(
        private readonly repo: VetsRepository
    ) {}
    async execute(getAllDto: GetAllVetsDto): Promise<AllVetResponse> {
        const vets = await this.repo.getAll(getAllDto);
        return {
            status: "success",
            message: null,
            data: vets
        }
    }
}

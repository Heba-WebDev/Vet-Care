import { GetAllVetsDto } from "../dtos";
import { VetEntity } from "../entities";
import { GetAllVetsUseCase } from "../interfaces";
import { VetsRepository } from "../repositories";



export class GetAllVets implements GetAllVetsUseCase {
     constructor(
        private readonly repo: VetsRepository
    ) {}
    async execute(getAllDto: GetAllVetsDto): Promise<any> {
        const vets = await this.repo.getAll(getAllDto);
        return {
            status: "success",
            data: vets
        }
    }

}
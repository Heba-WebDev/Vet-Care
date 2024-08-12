import { UpdateVetsDto } from "../dtos";
import { UpdateVetsUseCase } from "../interfaces";
import { VetsRepository } from "../repositories";

export class UpdateVets implements UpdateVetsUseCase {
    constructor (
        private readonly repo: VetsRepository
    ) {}
    async execute(updateVetsDto: UpdateVetsDto): Promise<any> {
         const vet = await this.repo.update(updateVetsDto);
        return {
            message: 'Account successfully updated',
            data: vet
        }
    }
}
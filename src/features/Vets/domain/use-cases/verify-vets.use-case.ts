import { VerifyVetDto } from "../dtos/verify-vets.dto";
import { VerifyVetsUseCase } from "../interfaces";
import { VetsRepository } from "../repositories";

export class VerifyVets implements VerifyVetsUseCase {
    constructor(
        private readonly repo: VetsRepository
    ) {}
    async execute(vetsDto: VerifyVetDto): Promise<any> {
        const vet = await this.repo.verify(vetsDto);
        return {
            message: 'Vet member succssfully verified',
            data: null
        }
    }

}
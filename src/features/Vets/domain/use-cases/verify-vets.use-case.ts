import { VerifyVetDto } from "../dtos";
import { VerifyVetsUseCase, VetStandardResponse } from "../interfaces";
import { VetsRepository } from "../repositories";

export class VerifyVets implements VerifyVetsUseCase {
    constructor(
        private readonly repo: VetsRepository
    ) {}
    async execute(vetsDto: VerifyVetDto): Promise<VetStandardResponse> {
        const vet = await this.repo.verify(vetsDto);
        return {
            status: 'success',
            message: 'Vet member succssfully verified',
            data: null
        }
    }
}

import { RegisterVetsDto } from "../dtos";
import { RegisterVetsUseCase } from "../interfaces";
import { VetsRepository } from "../repositories";


export class RegisterVets implements RegisterVetsUseCase {
    constructor(
        private readonly repo: VetsRepository,
    ) {}
    public async execute(registerVets: RegisterVetsDto): Promise<any> {
        const vet = await this.repo.register(registerVets);
        return {
            message: 'Successfully registered',
            data: vet
        }
    }

}
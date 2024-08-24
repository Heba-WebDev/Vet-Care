import { LoginVetsDto } from '../dtos';
import { LoginVetsUseCase, VetWithTokenResponse } from '../interfaces';
import { VetsRepository } from '../repositories';
import { JwtAdapter } from '../../../../config';
import { CustomError } from '../../../../domain';
import { SignToken } from '../../../../interfaces';

export class LoginVets implements LoginVetsUseCase {
    constructor(
        private readonly repo: VetsRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) {}
    async execute(loginDto: LoginVetsDto): Promise<VetWithTokenResponse> {
        const vet = await this.repo.login(loginDto);
        const access_token = await this.signToken({
            id: vet?.id!,
            job_title: vet?.job_title!,
            permission_type: vet?.permission_type!,
        });
        if (!access_token)
            throw CustomError.internalServerError('Internal server error');
        return {
            status: 'success',
            message: 'Successfully logged in',
            access_token,
            data: vet,
        };
    }
}

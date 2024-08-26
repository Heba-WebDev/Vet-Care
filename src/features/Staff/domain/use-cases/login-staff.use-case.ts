import { JwtAdapter } from '../../../../config';
import { CustomError } from '../../../../domain';
import { LoginStaffDto } from '../dtos';
import { LoginStaffUseCase, StaffWithTokenResponse } from '../interfaces';
import { StaffRepository } from '../repositories';
import { SignToken } from '../../../../interfaces';

export class LoginStaff implements LoginStaffUseCase {
  constructor(
    private readonly repo: StaffRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  async execute(loginStaff: LoginStaffDto): Promise<StaffWithTokenResponse> {
    const staff = await this.repo.login(loginStaff);
    const token = await this.signToken({
      id: staff?.id as string,
      job_title: staff?.job_title as string,
      permission_type: staff?.permission_type as string,
    });
    if (!token) throw CustomError.internalServerError('Internal server error');
    return {
      status: 'success',
      message: 'Successfully logged in',
      access_token: token,
      data: staff,
    };
  }
}

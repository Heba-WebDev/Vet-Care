import { JwtAdapter } from "../../../../config";
import { CustomError } from "../../../../domain";
import { LoginStaffDto } from "../dtos/login-staff.dto";
import { LoginStaffUseCase } from "../interfaces";
import { StaffRepository } from "../repositories";
import { SignToken } from "../../../../interfaces";

export class LoginStaff implements LoginStaffUseCase {

    constructor(
        private readonly repo: StaffRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) {}

    async execute(loginStaff: LoginStaffDto): Promise<any> {
        const staff = await this.repo.login(loginStaff);
        const token = await this.signToken({id: staff?.id!, job_title: staff?.job_title!, permission_type: staff?.permission_type!});
        if (!token) throw CustomError.internalServerError('Internal server error');
        return {
            message: 'Successfully logged in',
            access_token: token,
            data: staff
        }
    }
}


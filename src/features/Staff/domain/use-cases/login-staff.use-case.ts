import { JwtAdapter } from "../../../../config";
import { CustomError } from "../../../../domain";
import { LoginStaffDto } from "../dtos/login-staff.dto";
import { LoginStaffUseCase, SignToken } from "../interfaces";
import { StaffRepository } from "../repositories";


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
            token,
            user: staff
        }
    }
}


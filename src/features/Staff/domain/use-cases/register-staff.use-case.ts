import { JwtAdapter } from "../../../../config";
import { CustomError } from "../../../../domain";
import { RegisterStaffDto } from "../dtos";
import { RegisterStaffUseCase, SignToken } from "../interfaces";
import { StaffRepository } from "../repositories";



export class RegisterStaff implements RegisterStaffUseCase {
    constructor(
        private readonly repo: StaffRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) {}
    public async execute(registerStaff: RegisterStaffDto): Promise<any> {
        const staff = await this.repo.register(registerStaff);
        const token = await this.signToken({
            id: staff!.id,
            permission_type: staff?.permission_type!,
            job_title: staff?.job_title!
        }, '2h');
        if (!token) throw CustomError.internalServerError('Internal server error');
        return {
            token,
            user: staff
        }
    }

}
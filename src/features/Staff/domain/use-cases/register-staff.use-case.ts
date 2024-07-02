import { JwtAdapter } from "../../../../config";
import { CustomError } from "../../../../domain";
import { RegisterStaffDto } from "../dtos";
import { StaffRepository } from "../repositories";


interface RegisterStaffUseCase {
    execute( registerStaff: RegisterStaffDto): Promise<any>;
}
type payload = {
    id: string;
}
type SignToken = (payload: payload, duration?: string) => Promise<string | null>

export class RegisterStaff implements RegisterStaffUseCase {
    constructor(
        private readonly repo: StaffRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) {}
    public async execute(registerStaff: RegisterStaffDto): Promise<any> {
        const staff = await this.repo.register(registerStaff);
        const token = await this.signToken({id: staff!.id}, '2h');
        if (!token) throw CustomError.internalServerError('Internal server error');
        return {
            token,
            user: staff
        }
    }

}
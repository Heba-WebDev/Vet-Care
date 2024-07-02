import { LoginStaffDto, RegisterStaffDto, VerifyStaffDto } from "../dtos";
import { StaffEntity } from "../entities/staff.entity";

// abstract to avoid creation of new instances
export abstract class StaffRepository {
    abstract register(staffDto: RegisterStaffDto):Promise<StaffEntity | null>
    abstract login(StaffDto: LoginStaffDto):Promise<StaffEntity | null>;
    abstract verify(staffDto: VerifyStaffDto):Promise<StaffEntity | null>;
}
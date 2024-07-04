import { LoginStaffDto, RegisterStaffDto, VerifyStaffDto, DeleteStaffDto, GetAllStaffDto, UpdateStaffDto } from "../dtos";
import { FormerStaffEntity } from "../entities/former-staff.entity";
import { StaffEntity } from "../entities/staff.entity";

// abstract to avoid creation of new instances
export abstract class StaffRepository {
    abstract register(staffDto: RegisterStaffDto):Promise<StaffEntity | null>
    abstract login(StaffDto: LoginStaffDto):Promise<StaffEntity | null>;
    abstract verify(staffDto: VerifyStaffDto):Promise<StaffEntity | null>;
    abstract delete(staffDto: DeleteStaffDto):Promise<StaffEntity | null>;
    abstract getAll(staffDto: GetAllStaffDto):Promise<StaffEntity[] | null>;
    abstract getAllFormer(staffDto: GetAllStaffDto):Promise<FormerStaffEntity[] | null>;
    abstract update(staffDto: UpdateStaffDto): Promise<StaffEntity | null>;

}
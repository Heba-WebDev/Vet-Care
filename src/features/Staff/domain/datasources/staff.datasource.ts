import { LoginStaffDto, RegisterStaffDto, VerifyStaffDto, DeleteStaffDto, GetAllStaffDto } from "../dtos";
import { FormerStaffEntity } from "../entities/former-staff.entity";
import { StaffEntity } from "../entities/staff.entity";

// abstract to avoid creation of new instances
export abstract class StaffDatasource {
    abstract register(staffDto: RegisterStaffDto):Promise<StaffEntity | null>;
    abstract login(staffDto: LoginStaffDto):Promise<StaffEntity | null>;
    abstract verify(staffDto: VerifyStaffDto):Promise<StaffEntity | null>;
    abstract delete(staffDto: DeleteStaffDto):Promise<StaffEntity | null>;
    abstract getAll(staffDto: GetAllStaffDto):Promise<StaffEntity[] | null>;
    abstract getAllFormer(staffDto: GetAllStaffDto):Promise<FormerStaffEntity[] | null>;
}
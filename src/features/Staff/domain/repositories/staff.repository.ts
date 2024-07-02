import { RegisterStaffDto } from "../dtos";
import { StaffEntity } from "../entities/staff.entity";

// abstract to avoid creation of new instances
export abstract class StaffRepository {
    abstract register(staffDto: RegisterStaffDto):Promise<StaffEntity | null>
}
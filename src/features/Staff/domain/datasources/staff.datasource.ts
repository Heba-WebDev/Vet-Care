import { RegisterStaffDto } from "../dtos";
import { StaffEntity } from "../entities/staff.entity";

// abstract to avoid creation of new instances
export abstract class StaffDatasource {
    abstract register(staffDto: RegisterStaffDto):Promise<StaffEntity | null>
}
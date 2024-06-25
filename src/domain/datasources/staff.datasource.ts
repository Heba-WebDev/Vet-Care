import { RegisterUserDto } from "../dtos/staff/register.staff.dto";
import { StaffEntity } from "../entities/staff.entity";


export abstract class StaffDatasource {

    abstract register( registerUserDto: RegisterUserDto):Promise<StaffEntity>
}
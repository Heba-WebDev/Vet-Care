import { RegisterStaffDto } from "../dtos";


export abstract class StaffValidation {
    abstract register(staffDto: RegisterStaffDto): string | null
}
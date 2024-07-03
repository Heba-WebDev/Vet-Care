import { payload } from "../../../../interfaces";
import { RegisterStaffDto, LoginStaffDto, VerifyStaffDto, DeleteStaffDto, GetAllStaffDto } from "../dtos";

export type SignToken = (payload: payload, duration?: string) => Promise<string | null>;


// Use cases
export interface RegisterStaffUseCase {
    execute( registerStaff: RegisterStaffDto): Promise<any>;
}
export interface LoginStaffUseCase {
    execute( loginStaff: LoginStaffDto): Promise<any>;
}

export interface VerifyStaffUseCase {
    execute( verifyStaff: VerifyStaffDto): Promise<any>;
}

export interface DeleteStaffUseCase {
    execute( deleteStaff: DeleteStaffDto): Promise<any>;
}

export interface GetAllStaffUseCase {
    execute(getAllStaff: GetAllStaffDto): Promise<any>;
}

export interface GetAllFormerStaffUseCase {
    execute(getAllStaff: GetAllStaffDto): Promise<any>;
}
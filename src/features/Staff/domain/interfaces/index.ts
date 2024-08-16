import {
    RegisterStaffDto,
    LoginStaffDto,
    VerifyStaffDto,
    DeleteStaffDto,
    GetAllStaffDto,
    UpdateStaffDto
} from "../dtos";

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

export interface UpdateStaffUseCase {
    execute(updateStaff: UpdateStaffDto): Promise<any>;
}

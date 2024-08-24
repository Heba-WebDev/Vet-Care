import {
    RegisterStaffDto,
    LoginStaffDto,
    VerifyStaffDto,
    DeleteStaffDto,
    GetAllStaffDto,
    UpdateStaffDto,
} from '../dtos';
import { FormerStaffEntity, StaffEntity } from '../entities';

export type StaffStandardResponse = {
    status: string;
    message: string | null;
    data: StaffEntity | null;
};

export type StaffWithTokenResponse = {
    status: string;
    message: string | null;
    access_token: string;
    data: StaffEntity | null;
};

export type AllStaffResponse = {
    status: string;
    message: string | null;
    data: StaffEntity[] | null;
};

export type AllFormerStaffResponse = {
    status: string;
    message: string | null;
    data: FormerStaffEntity[] | null;
};

// Use cases
export interface RegisterStaffUseCase {
    execute(registerStaff: RegisterStaffDto): Promise<StaffStandardResponse>;
}

export interface LoginStaffUseCase {
    execute(loginStaff: LoginStaffDto): Promise<StaffWithTokenResponse>;
}

export interface VerifyStaffUseCase {
    execute(verifyStaff: VerifyStaffDto): Promise<StaffStandardResponse>;
}

export interface DeleteStaffUseCase {
    execute(deleteStaff: DeleteStaffDto): Promise<StaffStandardResponse>;
}

export interface GetAllStaffUseCase {
    execute(getAllStaff: GetAllStaffDto): Promise<AllStaffResponse>;
}

export interface GetAllFormerStaffUseCase {
    execute(getAllStaff: GetAllStaffDto): Promise<AllFormerStaffResponse>;
}

export interface UpdateStaffUseCase {
    execute(updateStaff: UpdateStaffDto): Promise<StaffStandardResponse>;
}

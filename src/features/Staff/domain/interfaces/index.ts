import { RegisterStaffDto, LoginStaffDto, VerifyStaffDto } from "../dtos";

// Jwt token
export type payload = {
    id: string;
    permission_type: string;
    job_title: string;
}
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
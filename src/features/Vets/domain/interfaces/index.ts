import { payload } from "../../../../interfaces";
import { RegisterVetsDto, VerifyVetDto, LoginVetsDto, DeleteVetsDto } from "../dtos";
export type SignToken = (payload: payload, duration?: string) => Promise<string | null>;


// Use cases
export interface RegisterVetsUseCase {
    execute( registerVets: RegisterVetsDto): Promise<any>;
}

export interface VerifyVetsUseCase {
    execute( verifyVets: VerifyVetDto): Promise<any>;
}

export interface LoginVetsUseCase {
    execute( verifyVets: LoginVetsDto): Promise<any>;
}

export interface DeleteVetsUseCase {
    execuse( deleteVets: DeleteVetsDto): Promise<any>
}
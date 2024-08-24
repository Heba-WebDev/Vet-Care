import {
    RegisterVetsDto,
    VerifyVetDto,
    LoginVetsDto,
    DeleteVetsDto,
    UpdateVetsDto,
    GetAllVetsDto,
} from '../dtos';
import { FormerVetEntity, VetEntity } from '../entities';

// Response types
export type VetStandardResponse = {
    status: string;
    message: string | null;
    data: VetEntity | null;
};

export type VetWithTokenResponse = {
    status: string;
    message: string | null;
    access_token: string;
    data: VetEntity | null;
};

export type AllVetResponse = {
    status: string;
    message: string | null;
    data: VetEntity[] | null;
};

export type AllFormerVetsResponse = {
    status: string;
    message: string | null;
    data: FormerVetEntity[] | null;
};

// Use cases
export interface RegisterVetsUseCase {
    execute(registerVets: RegisterVetsDto): Promise<VetStandardResponse>;
}

export interface VerifyVetsUseCase {
    execute(verifyVets: VerifyVetDto): Promise<VetStandardResponse>;
}

export interface LoginVetsUseCase {
    execute(verifyVets: LoginVetsDto): Promise<VetWithTokenResponse>;
}

export interface DeleteVetsUseCase {
    execute(deleteVets: DeleteVetsDto): Promise<VetStandardResponse>;
}

export interface UpdateVetsUseCase {
    execute(updateVets: UpdateVetsDto): Promise<VetStandardResponse>;
}

export interface GetAllVetsUseCase {
    execute(getAllVets: GetAllVetsDto): Promise<AllVetResponse>;
}

export interface GetAllFormerVetsUseCase {
    execute(getAllVets: GetAllVetsDto): Promise<AllFormerVetsResponse>;
}

import { RegisterOwnerDto, GetAllOwnersDto } from "../dtos";
import { OwnerEntity } from "../entities";

// Types (of return types)
export type OwnersStandardResponse = {
    status: string;
    message: string | null;
    data: OwnerEntity | null;
}

export type AllOwnersResponse = {
    status: string;
    message: string | null;
    data: OwnerEntity[] | null;
}

// Interfaces
export interface RegisterOwnerUseCase {
    execute( registerOwner: RegisterOwnerDto): Promise<OwnersStandardResponse>
}

export interface GetOwnersUseCase {
    execute( ownerDto: GetAllOwnersDto): Promise<AllOwnersResponse>
}

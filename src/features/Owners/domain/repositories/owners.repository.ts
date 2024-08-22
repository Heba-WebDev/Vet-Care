import { RegisterOwnerDto, GetAllOwnersDto, UpdateOwnerDto } from "../dtos";
import { OwnerEntity } from "../entities";
import { AllOwnersDatasourceResponse } from "../interfaces";

export abstract class OwnersRepository {
    abstract register(ownersDto: RegisterOwnerDto): Promise<OwnerEntity | null>;
    abstract getAll(ownerDto: GetAllOwnersDto | null): Promise<AllOwnersDatasourceResponse | null>;
    abstract update(ownerDto: UpdateOwnerDto): Promise<OwnerEntity | null>;
}

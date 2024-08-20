import { RegisterOwnerDto, GetAllOwnersDto } from "../dtos";
import { OwnerEntity } from "../entities";
import { AllOwnersDatasourceResponse } from "../interfaces";

export abstract class OwnersDatasource {
    abstract register(ownersDto: RegisterOwnerDto): Promise<OwnerEntity | null>;
    abstract getAll(ownerDto: GetAllOwnersDto | null): Promise<AllOwnersDatasourceResponse | null>;
}

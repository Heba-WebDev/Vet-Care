import { RegisterOwnerDto, GetAllOwnersDto } from "../dtos";
import { OwnerEntity } from "../entities";

export abstract class OwnersRepository {
    abstract register(ownersDto: RegisterOwnerDto): Promise<OwnerEntity | null>;
    abstract getAll(ownerDto: GetAllOwnersDto | null): Promise<OwnerEntity[] | null>;
}

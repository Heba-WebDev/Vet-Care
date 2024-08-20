import { RegisterOwnerDto } from "../dtos";
import { OwnerEntity } from "../entities";

export abstract class OwnersRepository {
    abstract register(ownersDto: RegisterOwnerDto): Promise<OwnerEntity | null>;
}

import { RegisterOwnerDto } from "../dtos";
import { OwnerEntity } from "../entities";

export abstract class OwnersDatasource {
    abstract register(ownersDto: RegisterOwnerDto): Promise<OwnerEntity | null>;
}

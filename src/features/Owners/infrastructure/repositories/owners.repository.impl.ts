import {
    OwnerEntity,
    OwnersDatasource,
    RegisterOwnerDto,
    GetAllOwnersDto,
    AllOwnersDatasourceResponse
} from "../../domain";
import { OwnersRepository } from "../../domain/repositories"

export class OwnersRepositoryImpl extends OwnersRepository {
    constructor(
        private readonly datasource: OwnersDatasource
    ) {
        super();
    }

    register(ownerDto: RegisterOwnerDto): Promise<OwnerEntity | null> {
        return this.datasource.register(ownerDto);
    }

    getAll(ownerDto: GetAllOwnersDto): Promise<AllOwnersDatasourceResponse | null> {
        return this.datasource.getAll(ownerDto);
    }
}

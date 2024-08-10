import { LoginVetsDto, RegisterVetsDto, VerifyVetDto } from "../../domain";
import { VetsDatasource } from "../../domain/datasources/vets.datasource";
import { VetEntity } from "../../domain/entities";
import { VetsRepository } from "../../domain/repositories";


export class VetsRepositoryImpl extends VetsRepository {
    constructor(
        private readonly datasource: VetsDatasource
    ) {
        super();
    }

    register(vetDto: RegisterVetsDto): Promise<VetEntity | null> {
        return this.datasource.register(vetDto);
    }

    verify(vetsDto: VerifyVetDto): Promise<VetEntity | null> {
        return this.datasource.verify(vetsDto);
    }

    login(vetsDto: LoginVetsDto): Promise<VetEntity | null> {
        return this.datasource.login(vetsDto);
    }
}
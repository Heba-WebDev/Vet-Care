import {
    DeleteVetsDto,
    GetAllVetsDto,
    LoginVetsDto,
    RegisterVetsDto,
    UpdateVetsDto,
    VerifyVetDto
} from "../../domain";
import { VetsDatasource } from "../../domain/datasources/vets.datasource";
import { FormerVetEntity, VetEntity } from "../../domain/entities";
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

    delete(vetsDto: DeleteVetsDto): Promise<VetEntity | null> {
        return this.datasource.delete(vetsDto);
    }

    update(vetsDto: UpdateVetsDto): Promise<VetEntity | null> {
        return this.datasource.update(vetsDto);
    }

    getAll(vetsDto: GetAllVetsDto): Promise<VetEntity[] | null> {
        return this.datasource.getAll(vetsDto);
    }

    GetAllFormer(vetsDto: GetAllVetsDto): Promise<FormerVetEntity[] | null> {
        return this.datasource.GetAllFormer(vetsDto);
    }
}

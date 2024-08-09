import { RegisterVetsDto } from "../dtos";
import { VerifyVetDto } from "../dtos/verify-vets.dto";
import { VetEntity } from "../entities";

export abstract class VetsDatasource {
    abstract register(vetsDto: RegisterVetsDto): Promise<VetEntity | null>;
    abstract verify(vetsDto: VerifyVetDto): Promise<VetEntity | null>;
}
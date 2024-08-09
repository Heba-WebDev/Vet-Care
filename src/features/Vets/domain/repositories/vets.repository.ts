import { RegisterVetsDto, VerifyVetDto } from "../dtos";
import { VetEntity } from "../entities";


export abstract class VetsRepository {
    abstract register(vetsDto: RegisterVetsDto): Promise<VetEntity | null>
    abstract verify(vetsDto: VerifyVetDto): Promise<VetEntity | null>
}
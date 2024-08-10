import { RegisterVetsDto, VerifyVetDto, LoginVetsDto, DeleteVetsDto } from "../dtos";
import { VetEntity } from "../entities";

export abstract class VetsDatasource {
    abstract register(vetsDto: RegisterVetsDto): Promise<VetEntity | null>
    abstract verify(vetsDto: VerifyVetDto): Promise<VetEntity | null>
    abstract login(vetsDto: LoginVetsDto): Promise<VetEntity | null>
    abstract delete(vetsDto: DeleteVetsDto): Promise<VetEntity | null>
}
import {
    RegisterVetsDto,
    VerifyVetDto,
    LoginVetsDto,
    DeleteVetsDto,
    UpdateVetsDto,
    GetAllVetsDto
} from "../dtos";
import { VetEntity } from "../entities";

export abstract class VetsRepository {
    abstract register(vetsDto: RegisterVetsDto): Promise<VetEntity | null>
    abstract verify(vetsDto: VerifyVetDto): Promise<VetEntity | null>
    abstract login(vetsDto: LoginVetsDto): Promise<VetEntity | null>
    abstract delete(vetsDto: DeleteVetsDto): Promise<VetEntity | null>
    abstract update(vetsDto: UpdateVetsDto): Promise<VetEntity | null>
    abstract getAll(vetsDto: GetAllVetsDto):Promise<VetEntity[] | null>
}
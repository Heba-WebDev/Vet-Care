import { RegisterVetsDto } from "../dtos";
import { VetEntity } from "../entities";


export abstract class VetsRepository {
    abstract register(staffDto: RegisterVetsDto):Promise<VetEntity | null>
}
import { RegisterVetsDto } from "../dtos";
import { VetEntity } from "../entities";

export abstract class VetsDatasource {
    abstract register(vetsDto: RegisterVetsDto): Promise<VetEntity | null>;
}
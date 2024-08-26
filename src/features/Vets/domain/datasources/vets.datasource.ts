import {
  RegisterVetsDto,
  VerifyVetDto,
  LoginVetsDto,
  DeleteVetsDto,
  UpdateVetsDto,
  GetAllVetsDto,
} from '../dtos';
import { VetEntity, FormerVetEntity } from '../entities';

export abstract class VetsDatasource {
  abstract register(vetsDto: RegisterVetsDto): Promise<VetEntity | null>;
  abstract verify(vetsDto: VerifyVetDto): Promise<VetEntity | null>;
  abstract login(vetsDto: LoginVetsDto): Promise<VetEntity | null>;
  abstract delete(vetsDto: DeleteVetsDto): Promise<VetEntity | null>;
  abstract update(vetsDto: UpdateVetsDto): Promise<VetEntity | null>;
  abstract getAll(vetsDto: GetAllVetsDto): Promise<VetEntity[] | null>;
  abstract GetAllFormer(vetsDto: GetAllVetsDto): Promise<FormerVetEntity[] | null>;
}

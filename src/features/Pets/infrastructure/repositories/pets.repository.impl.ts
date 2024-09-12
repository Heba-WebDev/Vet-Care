import {
  PetsDatasource,
  PetsRepository,
  PetEntity,
  RegisterPetDto,
  GetAllPetsDto,
  UpdatePetDto,
} from '../../domain';

export class PetsRepositoryImpl extends PetsRepository {
  constructor(private readonly datasource: PetsDatasource) {
    super();
  }

  register(dto: RegisterPetDto): Promise<PetEntity | null> {
    return this.datasource.register(dto);
  }

  getAll(dto: GetAllPetsDto): Promise<PetEntity[] | null> {
    return this.datasource.getAll(dto);
  }

  update(dto: UpdatePetDto): Promise<PetEntity | null> {
    return this.datasource.update(dto);
  }
}

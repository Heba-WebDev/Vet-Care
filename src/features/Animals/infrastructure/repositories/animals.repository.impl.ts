import {
  AddAnimalsDto,
  AnimalEntity,
  AnimalsDatasource,
  AnimalsRepository,
  DeleteAnimalDto,
  UpdateAnimalDto,
} from '../../domain';

export class AnimalsRepositoryImpl extends AnimalsRepository {
  constructor(private readonly datasource: AnimalsDatasource) {
    super();
  }

  add(dto: AddAnimalsDto): Promise<AnimalEntity | null> {
    return this.datasource.add(dto);
  }

  delete(dto: DeleteAnimalDto): Promise<AnimalEntity | null> {
    return this.datasource.delete(dto);
  }

  update(dto: UpdateAnimalDto): Promise<AnimalEntity | null> {
    return this.datasource.update(dto);
  }
}

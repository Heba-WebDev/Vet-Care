import {
    AddAnimalsDto,
    AnimalEntity,
    AnimalsDatasource,
    AnimalsRepository
} from '../../domain';

export class AnimalsRepositoryImpl extends AnimalsRepository {
    constructor(private readonly datasource: AnimalsDatasource) {
        super();
    }

    add(dto: AddAnimalsDto): Promise<AnimalEntity | null> {
        return this.datasource.add(dto);
    }
}

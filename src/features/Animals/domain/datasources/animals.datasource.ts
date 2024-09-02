import { AddAnimalsDto } from '../dtos';
import { AnimalEntity } from '../entities';

export abstract class AnimalsDatasource {
    abstract add(dto: AddAnimalsDto): Promise<AnimalEntity | null>;
}

import { Request, Response } from 'express';
import { BaseController } from '../../../presentation/base.controller';
import { AddAnimalsDto, DeleteAnimalDto, UpdateAnimalDto } from '../domain/dtos';
import { AddAnimal, DeleteAnimal, UpdateAnimal, AnimalsRepository } from '../domain';

export class AnimalsController extends BaseController {
  constructor(private readonly repo: AnimalsRepository) {
    super();
  }

  add = (req: Request, res: Response) => {
    const [error, dto] = AddAnimalsDto.add(req.body);
    if (error) return res.status(400).send({ error });
    new AddAnimal(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const [error, dto] = DeleteAnimalDto.delete(req.params.id);
    if (error) return res.status(400).send({ error });
    new DeleteAnimal(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const [error, dto] = UpdateAnimalDto.update(req.params.id, req.query);
    if (error) return res.status(400).send({ error });
    new UpdateAnimal(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}

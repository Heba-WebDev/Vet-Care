import { Request, Response } from 'express';
import { BaseController } from '../../../presentation/base.controller';
import { PetsRepository, RegisterPetDto, GetAllPetsDto, RegisterPet, GetAllPet } from '../domain';

export class PetsController extends BaseController {
  constructor(private readonly repo: PetsRepository) {
    super();
  }

  register = (req: Request, res: Response) => {
    const [error, dto] = RegisterPetDto.register(req.params.owner_id, req.body);
    if (error) return res.status(400).send({ error });
    new RegisterPet(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const [error, dto] = GetAllPetsDto.getAll(req.params.owner_id);
    if (error) return res.status(400).send({ error });
    new GetAllPet(this.repo)
    .execute(dto!)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  };
}

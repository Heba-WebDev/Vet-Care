import { Request, Response } from 'express';
import { BaseController } from '../../../presentation/base.controller';
import {
  AddWorkingHours,
  AddWorkingHoursDto,
  GetWorkingHoursDto,
  WorkingHoursRepository,
} from '../domain';
import { GetWorkingHours } from '../domain/use-cases/get-working-hours.use-case';

export class WorkingHoursController extends BaseController {
  constructor(private readonly repo: WorkingHoursRepository) {
    super();
  }
  add = (req: Request, res: Response) => {
    const [error, dto] = AddWorkingHoursDto.add(req.params.vet_id, req.body);
    if (error) return res.status(400).send({ error });
    new AddWorkingHours(this.repo)
      .execute(dto!)
      .then((data) => res.send(data))
      .catch((error) => this.handleError(error, res));
  };

  get = (req: Request, res: Response) => {
    const [error, dto] = GetWorkingHoursDto.getWorkingHours(req.params.vet_id, req.query);
    if (error) return res.status(400).send({ error });
    new GetWorkingHours(this.repo)
      .execute(dto!)
      .then((data) => res.send(data))
      .catch((error) => this.handleError(error, res));
  };
}

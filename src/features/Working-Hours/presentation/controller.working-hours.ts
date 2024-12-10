import { Request, Response } from 'express';
import { BaseController } from '../../../presentation/base.controller';
import { AddWorkingHours, AddWorkingHoursDto, WorkingHoursRepository } from '../domain';

export class WorkingHoursController extends BaseController {
  constructor(private readonly repo: WorkingHoursRepository) {
    super();
  }
  add = (req: Request, res: Response) => {
    const [error, dto] = AddWorkingHoursDto.add(req.params.id, req.body);
    if (error) return res.status(400).send({ error });
    new AddWorkingHours(this.repo)
      .execute(dto!)
      .then((data) => res.send(data))
      .catch((error) => this.handleError(error, res));
  };
}

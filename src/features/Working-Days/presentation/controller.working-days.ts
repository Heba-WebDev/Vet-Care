import { Request, Response } from 'express';
import { BaseController } from '../../../presentation/base.controller';
import { UpdateWorkingDay, UpdateWorkingDayDto, WorkingDaysRepository } from '../domain';

export class WorkingDaysController extends BaseController {
  constructor(private readonly repo: WorkingDaysRepository) {
    super();
  }
  update = (req: Request, res: Response) => {
    const [error, dto] = UpdateWorkingDayDto.update(req.query);
    if (error) return res.status(400).send({ error });
    new UpdateWorkingDay(this.repo)
      .execute(dto!)
      .then((data) => res.send(data))
      .catch((error) => this.handleError(error, res));
  };
}

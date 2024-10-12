import { Request, Response } from 'express';
import { BaseController } from '../../../presentation/base.controller';
import { AddHoliday, AddHolidayDto, HolidaysRepository } from '../domain';

export class HolidaysController extends BaseController {
  constructor(private readonly repo: HolidaysRepository) {
    super();
  }

  add = (req: Request, res: Response) => {
    const [error, dto] = AddHolidayDto.add(req.body);
    if (error) return res.status(400).send({ error });
    new AddHoliday(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}

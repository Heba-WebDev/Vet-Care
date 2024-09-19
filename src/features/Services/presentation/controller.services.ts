import { Request, Response } from 'express';
import { BaseController } from '../../../presentation/base.controller';
import {
  AddService,
  ActivateService,
  AddServiceDto,
  ActivateServiceDto,
  ServicesRepository,
} from '../domain';

export class ServicesController extends BaseController {
  constructor(private readonly repo: ServicesRepository) {
    super();
  }

  addAService = (req: Request, res: Response) => {
    const [error, dto] = AddServiceDto.add(req.body);
    if (error) return res.status(400).send({ error });
    new AddService(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  activate = (req: Request, res: Response) => {
    const [error, dto] = ActivateServiceDto.activate(req.params.id);
    if (error) return res.status(400).send({ error });
    new ActivateService(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((err) => {
        this.handleError(err, res);
      });
  };
}

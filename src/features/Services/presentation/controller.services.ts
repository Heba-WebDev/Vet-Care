import { Request, Response } from 'express';
import { BaseController } from '../../../presentation/base.controller';
import {
  AddService,
  ActivateService,
  DeactivateService,
  AddServiceDto,
  ActivateServiceDto,
  ServicesRepository,
  DeactivateServiceDto,
  UpdateServiceDto,
  UpdateService,
  GetAllServicesDto,
  GetAllServices,
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

  deactivate = (req: Request, res: Response) => {
    const [error, dto] = DeactivateServiceDto.deactivate(req.params.id);
    if (error) return res.status(400).send({ error });
    new DeactivateService(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  update = (req: Request, res: Response) => {
    const [error, dto] = UpdateServiceDto.update(req.params.id, req.body);
    if (error) return res.status(400).send({ error });
    new UpdateService(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((err) => {
        this.handleError(err, res);
      });
  };

  getAll = (req: Request, res: Response) => {
    const [error, dto] = GetAllServicesDto.get(req.query);
    if (error) return res.status(400).send({ error });
    new GetAllServices(this.repo)
      .execute(dto!)
      .then((data) => res.json(data))
      .catch((err) => {
        this.handleError(err, res);
      });
  };
}

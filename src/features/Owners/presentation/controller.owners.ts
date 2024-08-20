import { Request, Response } from 'express';
import { OwnersRepository, RegisterOwnerDto, GetAllOwnersDto } from '../domain';
import { RegisterOwner, GetAllOwners } from '../domain/use-cases';
import { BaseController } from '../../../presentation/base.controller';

export class OwnersController extends BaseController {
    constructor(
        private readonly repo: OwnersRepository
    ) {
        super();
    }

    register = (req: Request, res: Response) => {
        const [error, dto] = RegisterOwnerDto.register(req.body);
        if (error) return res.status(400).send({ error });
        new RegisterOwner(this.repo).execute(dto!)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res))
    }

    getAll = (req: Request, res: Response)  => {
        const [error, dto]= GetAllOwnersDto.getAll(req.query);
        if (error) return res.status(400).send({ error });
        new GetAllOwners(this.repo).execute(dto!)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res))
    }
}
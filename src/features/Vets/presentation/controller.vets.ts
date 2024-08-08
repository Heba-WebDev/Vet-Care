import { Request, Response } from "express";
import { BaseController } from "../../../presentation/base.controller";
import { RegisterVetsDto } from "../domain/dtos/register-vets.dto";
import { RegisterVets } from "../domain/use-cases";
import { VetsRepository } from "../domain/repositories";


export class VetsController extends BaseController {
    constructor(
        private readonly vetsRepo: VetsRepository
    ) {
        super();
    }

    register = (req: Request, res: Response) => {
        const [error, vetsDto] = RegisterVetsDto.register(req.body);
        if (error) return res.status(400).send({ error });
        new RegisterVets(this.vetsRepo).execute(vetsDto!)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res))
    }

    verify = (req: Request, res: Response) => {}

    login = (req: Request, res: Response) => {}

    update = (req: Request, res: Response) => {}

    delete = (req: Request, res: Response) => {}
}
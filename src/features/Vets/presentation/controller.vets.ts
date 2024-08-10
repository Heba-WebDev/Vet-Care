import { Request, Response } from "express";
import { BaseController } from "../../../presentation/base.controller";
import { LoginVets, RegisterVets } from "../domain/use-cases";
import { VetsRepository } from "../domain/repositories";
import { VerifyVets } from "../domain/use-cases/verify-vets.use-case";
import { RegisterVetsDto, VerifyVetDto, LoginVetsDto } from "../domain";


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

    verify = (req: Request, res: Response) => {
        const [error, vetsDto] = VerifyVetDto.verify(req.body);
        if (error) return res.status(400).send({ error });
        new VerifyVets(this.vetsRepo).execute(vetsDto!)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res))
    }

    login = (req: Request, res: Response) => {
        const [error, loginDto] = LoginVetsDto.login(req.body);
        if (error) return res.status(400).send({ error });
        new LoginVets(this.vetsRepo).execute(loginDto!)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res))
    }

    update = (req: Request, res: Response) => {}

    delete = (req: Request, res: Response) => {}
}
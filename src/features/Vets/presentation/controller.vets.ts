import { Request, Response } from "express";
import { BaseController } from "../../../presentation/base.controller";
import {
    VetsRepository,
    // Use cases
    RegisterVets,
    LoginVets,
    VerifyVets,
    DeleteVets,
    GetAllVets,
    GetAllFormerVets,
    UpdateVets,
    // DTOs
    RegisterVetsDto,
    VerifyVetDto,
    LoginVetsDto,
    DeleteVetsDto,
    UpdateVetsDto,
    GetAllVetsDto
} from "../domain";

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

    update = (req: Request, res: Response) => {
        const [error, updateDto] = UpdateVetsDto.upate(req.body);
        if (error) return res.status(400).send({ error });
        new UpdateVets(this.vetsRepo).execute(updateDto!)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res))
    }

    delete = (req: Request, res: Response) => {
        const [error, deleteDto] = DeleteVetsDto.delete(req.body);
        if (error) return res.status(400).send({ error });
        new DeleteVets(this.vetsRepo).execute(deleteDto!)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res))
    }

    getAll = (req: Request, res: Response) => {
                const [error, vetsDto] = GetAllVetsDto.get(req.query);
                if (error) return res.status(400).send({ error });
                new GetAllVets(this.vetsRepo).execute(vetsDto!)
                .then((data) => res.json(data))
                .catch((err) => this.handleError(err, res));
    }

    getAllFormer = (req: Request, res: Response) => {
                const [error, vetsDto] = GetAllVetsDto.get(req.query);
                if (error) return res.status(400).send({ error });
                new GetAllFormerVets(this.vetsRepo).execute(vetsDto!)
                .then((data) => res.json(data))
                .catch((err) => this.handleError(err, res));
    }
}

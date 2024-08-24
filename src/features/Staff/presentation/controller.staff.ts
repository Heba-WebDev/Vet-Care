import { Request, Response } from 'express';
import { BaseController } from '../../../presentation/base.controller';
import {
    StaffRepository,
    // Use cases
    RegisterStaff,
    LoginStaff,
    UpdateStaff,
    DeleteStaff,
    VerifyStaff,
    GetAllStaff,
    GetAllFormerStaff,
    // DTOs
    RegisterStaffDto,
    LoginStaffDto,
    UpdateStaffDto,
    VerifyStaffDto,
    DeleteStaffDto,
    GetAllStaffDto,
} from '../domain';

export class StaffController extends BaseController {
    constructor(private readonly staffRepo: StaffRepository) {
        super();
    }

    register = (req: Request, res: Response) => {
        const [error, staffDto] = RegisterStaffDto.register(req.body);
        if (error) return res.status(400).send({ error });
        new RegisterStaff(this.staffRepo)
            .execute(staffDto!)
            .then((data) => res.json(data))
            .catch((err) => {
                this.handleError(err, res);
            });
    };

    login = (req: Request, res: Response) => {
        const [error, staffDto] = LoginStaffDto.login(req.body);
        if (error) return res.status(400).send({ error });
        new LoginStaff(this.staffRepo)
            .execute(staffDto!)
            .then((data) => res.json(data))
            .catch((err) => this.handleError(err, res));
    };

    verify = (req: Request, res: Response) => {
        const [error, staffDto] = VerifyStaffDto.verify(req.body);
        if (error) return res.status(400).send({ error });
        new VerifyStaff(this.staffRepo)
            .execute(staffDto!)
            .then((data) => res.json(data))
            .catch((err) => this.handleError(err, res));
    };

    delete = (req: Request, res: Response) => {
        const [error, staffDto] = DeleteStaffDto.delete(req.body);
        if (error) return res.status(400).send({ error });
        new DeleteStaff(this.staffRepo)
            .execute(staffDto!)
            .then((data) => res.json(data))
            .catch((err) => this.handleError(err, res));
    };

    getAll = (req: Request, res: Response) => {
        const [error, staffDto] = GetAllStaffDto.get(req.query);
        if (error) return res.status(400).send({ error });
        new GetAllStaff(this.staffRepo)
            .execute(staffDto!)
            .then((data) => res.json(data))
            .catch((err) => this.handleError(err, res));
    };

    getAllFormer = (req: Request, res: Response) => {
        const [error, staffDto] = GetAllStaffDto.get(req.query);
        if (error) return res.status(400).send({ error });
        new GetAllFormerStaff(this.staffRepo)
            .execute(staffDto!)
            .then((data) => res.json(data))
            .catch((err) => this.handleError(err, res));
    };

    update = (req: Request, res: Response) => {
        const [error, staffDto] = UpdateStaffDto.upate(req.body);
        if (error) return res.status(400).send({ error });
        new UpdateStaff(this.staffRepo)
            .execute(staffDto!)
            .then((data) => res.json(data))
            .catch((err) => this.handleError(err, res));
    };
}

import { Request, Response } from 'express';
import {
LoginStaff,
RegisterStaff,
DeleteStaff,
VerifyStaff,
GetAllStaff,
LoginStaffDto,
RegisterStaffDto,
VerifyStaffDto,
DeleteStaffDto,
StaffRepository
} from '../domain';
import { CustomError } from '../../../domain';
import { GetAllStaffDto } from '../domain/dtos/get-staff.dto';
import { GetAllFormerStaff } from '../domain/use-cases/get-former-staff.use-case';
import { UpdateStaffDto } from '../domain/dtos/update-staff.dto';
import { UpdateStaff } from '../domain/use-cases/update-staff.use-case';



export class StaffController {

        constructor(
                private readonly staffRepo: StaffRepository,
        ) {
        }
        private handleError = (error: unknown, res: Response) => {
                if (error instanceof CustomError) {
                        return res.status(error.statusCode).json({ error: error.message });
                }
                return res.status(500).json({ error: 'Internal Server Error'});
        }

        registerStaff = (req: Request, res: Response) => {
                const [error, staffDto] = RegisterStaffDto.register(req.body);
                if (error) return res.status(400).send({ error });
                new RegisterStaff(this.staffRepo).execute(staffDto!)
                .then((data) => res.json(data))
                .catch((err) => {

                        this.handleError(err, res)
                });
        }

        loginStaff = (req: Request, res: Response) => {
                const [error, staffDto] = LoginStaffDto.login(req.body);
                if (error) return res.status(400).send({ error });
                new LoginStaff(this.staffRepo).execute(staffDto!)
                .then((data) => res.json(data))
                .catch((err) => this.handleError(err, res));
        }

        verifyStaff = (req: Request, res: Response) => {
                const [error, staffDto] = VerifyStaffDto.verify(req.body);
                if (error) return res.status(400).send({ error });
                new VerifyStaff(this.staffRepo).execute(staffDto!)
                .then((data) => res.json(data))
                .catch((err) => this.handleError(err, res));
        }

        deleteStaff = (req: Request, res: Response) => {
                const [error, staffDto] = DeleteStaffDto.delete(req.body);
                if (error) return res.status(400).send({ error });
                new DeleteStaff(this.staffRepo).execute(staffDto!)
                .then((data) => res.json(data))
                .catch((err) => this.handleError(err, res));
        }

        getAllStaff = (req: Request, res: Response) => {
                const [error, staffDto] = GetAllStaffDto.get(req.query);
                if (error) return res.status(400).send({ error });
                new GetAllStaff(this.staffRepo).execute(staffDto!)
                .then((data) => res.json(data))
                .catch((err) => this.handleError(err, res));
        }

        getAllFormerStaff = (req: Request, res: Response) => {
                const [error, staffDto] = GetAllStaffDto.get(req.query);
                if (error) return res.status(400).send({ error });
                new GetAllFormerStaff(this.staffRepo).execute(staffDto!)
                .then((data) => res.json(data))
                .catch((err) => this.handleError(err, res));
        }

        updateStaff = (req: Request, res: Response) => {
                const [error, staffDto] = UpdateStaffDto.upate(req.body);
                if (error) return res.status(400).send({ error });
                new UpdateStaff(this.staffRepo).execute(staffDto!)
                .then((data) => res.json(data))
                .catch((err) => this.handleError(err, res));
        }

}
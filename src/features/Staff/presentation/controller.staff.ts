import { Request, Response } from 'express';
import { LoginStaff, RegisterStaff, RegisterStaffDto, StaffRepository } from '../domain';
import { CustomError } from '../../../domain';
import { LoginStaffDto } from '../domain/dtos/login-staff.dto';
import { VerifyStaffDto } from '../domain/dtos/verify-staff.dto';
import { VerifyStaff } from '../domain/use-cases/verify-staff.use-case';


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

}
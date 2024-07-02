import { Request, Response } from 'express';
import { RegisterStaff, RegisterStaffDto, StaffRepository } from '../domain';
import { CustomError } from '../../../domain';


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
                const [error, staffDto] = RegisterStaffDto.create(req.body);
                if (error) return res.status(400).send({ error });
                new RegisterStaff(this.staffRepo).execute(staffDto!)
                .then((data) => res.json(data))
                .catch((err) => {

                        this.handleError(err, res)
                });
        }
}
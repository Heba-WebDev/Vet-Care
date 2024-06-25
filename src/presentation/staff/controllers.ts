import { Request, Response } from "express"
import { CustomError, RegisterUserDto, StaffRepository } from "../../domain"
import { JwtAdapter } from "../../config"


export class AuthController {

    constructor(
        private readonly staffRepository: StaffRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
            return res.status(500).json({ error: 'Internal Server Error'})
    }

    registerStaff = async(req: Request, res: Response) => {
        const [error, RegisterUser ] = RegisterUserDto.create(req.body as object);
        if (error) return res.status(400).send({message: "error"})
        this.staffRepository.register(RegisterUser!)
        .then(async (user) => res.json({
            user,
            token: await JwtAdapter.generateToken({ id: user.id })
        }))
        .catch((error) => this.handleError(error, res))
    }

    loginStaff = async(req: Request, res: Response) => {
    }
}
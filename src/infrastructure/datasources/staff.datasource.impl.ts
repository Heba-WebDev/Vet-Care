import { bcryptAdapter } from "../../config";
import { RegisterUserDto, StaffEntity, StaffDatasource, CustomError } from "../../domain";
import { StaffMapper } from "../mappers/staff.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashedPassword: string) => boolean;

export class StaffDatasourceImpl implements StaffDatasource {

    constructor(
        private readonly hashPassword: HashFunction = bcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = bcryptAdapter.compare
    ) {}

    register(registerUserDto: RegisterUserDto): Promise<StaffEntity> {
        const { name, email, password, job_title, phone_number} = registerUserDto;

        try {
             const staffEntity = new StaffEntity(
                '1',
                name,
                job_title,
                'Staff',
                email,
                this.hashPassword(password),
                phone_number,
                false
            );

            return StaffMapper.staffEntityFromObject(staffEntity);
        } catch(error) {
            if ( error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

}
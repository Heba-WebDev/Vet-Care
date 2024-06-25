import { RegisterUserDto, StaffEntity, StaffRepository, StaffDatasource } from "../../domain";

export class StaffRepositoryImpl implements StaffRepository {
    
    constructor(
        private readonly datasource: StaffDatasource
    ) {}
    register(registerUserDto: RegisterUserDto): Promise<StaffEntity> {
        return this.datasource.register(registerUserDto);
    }
    
}
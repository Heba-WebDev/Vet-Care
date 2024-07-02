import { LoginStaffDto, RegisterStaffDto, StaffDatasource, StaffRepository, VerifyStaffDto } from "../../domain";
import { StaffEntity } from "../../domain/entities";


export class StaffRepositoryImpl extends StaffRepository {

    constructor(
        private readonly datasource: StaffDatasource,
    ) {
        super();
    }
    // repos can directly interact with datasources, no one else can
    // this way, if the db changes for example, the repo and every part
    // depending on it, won't be affected
    register(staffDto: RegisterStaffDto): Promise<StaffEntity | null> {
        return this.datasource.register(staffDto);
    }

    login(StaffDto: LoginStaffDto): Promise<StaffEntity | null> {
        return this.datasource.login(StaffDto);
    }

    verify(StaffDto: VerifyStaffDto): Promise<StaffEntity | null> {
        return this.datasource.verify(StaffDto);
    }
}
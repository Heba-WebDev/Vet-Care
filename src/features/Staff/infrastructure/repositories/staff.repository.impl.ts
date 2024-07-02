import { RegisterStaffDto, StaffDatasource, StaffRepository } from "../../domain";
import { StaffEntity } from "../../domain/entities";


export class StaffRepositoryImpl extends StaffRepository {

    constructor(
        private readonly datasource: StaffDatasource,
    ) {
        super();
    }
    // repos can directly interact with datasources, no one else can
    // this way, if the db changes for example, the repo and ever part
    // depending on it, won't be affected
    register(staffDto: RegisterStaffDto): Promise<StaffEntity | null> {
        return this.datasource.register(staffDto);
    }

}
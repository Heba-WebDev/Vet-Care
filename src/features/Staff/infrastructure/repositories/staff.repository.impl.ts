import {
  StaffDatasource,
  StaffRepository,
  // DTOs
  DeleteStaffDto,
  UpdateStaffDto,
  LoginStaffDto,
  RegisterStaffDto,
  GetAllStaffDto,
  VerifyStaffDto,
  // Entities
  StaffEntity,
  FormerStaffEntity,
} from '../../domain';

export class StaffRepositoryImpl extends StaffRepository {
  constructor(private readonly datasource: StaffDatasource) {
    super();
  }
  /*
        Repository is the only part of the app that can directly
        interact with datasource. This way, if the db changes for example,
        the repository and every part depending on it, won't be affected
    */
  register(staffDto: RegisterStaffDto): Promise<StaffEntity | null> {
    return this.datasource.register(staffDto);
  }

  login(StaffDto: LoginStaffDto): Promise<StaffEntity | null> {
    return this.datasource.login(StaffDto);
  }

  verify(StaffDto: VerifyStaffDto): Promise<StaffEntity | null> {
    return this.datasource.verify(StaffDto);
  }

  delete(staffDto: DeleteStaffDto): Promise<StaffEntity | null> {
    return this.datasource.delete(staffDto);
  }

  getAll(staffDto: GetAllStaffDto): Promise<StaffEntity[] | null> {
    return this.datasource.getAll(staffDto);
  }

  getAllFormer(staffDto: GetAllStaffDto): Promise<FormerStaffEntity[] | null> {
    return this.datasource.getAllFormer(staffDto);
  }

  update(staffDto: UpdateStaffDto): Promise<StaffEntity | null> {
    return this.datasource.update(staffDto);
  }
}

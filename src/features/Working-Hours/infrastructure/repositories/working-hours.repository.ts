import {
  AddWorkingHoursDto,
  GetWorkingHoursDto,
  UpdateWorkingHoursDto,
  WorkingHoursEntity,
  WorkingHoursRepository,
} from '../../domain';

export class WorkingHoursRepositoryImpl extends WorkingHoursRepository {
  constructor(private readonly repo: WorkingHoursRepository) {
    super();
  }

  add(dto: AddWorkingHoursDto): Promise<WorkingHoursEntity | null> {
    return this.repo.add(dto);
  }

  get(dto: GetWorkingHoursDto): Promise<WorkingHoursEntity[] | null> {
    return this.repo.get(dto);
  }

  update(dto: UpdateWorkingHoursDto): Promise<WorkingHoursEntity | null> {
    return this.repo.update(dto);
  }
}

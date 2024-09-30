import { UpdateWorkingDayDto, WorkingDayEntity, WorkingDaysRepository } from '../../domain';

export class WorkingDaysRepositoryImpl extends WorkingDaysRepository {
  constructor(private readonly repo: WorkingDaysRepository) {
    super();
  }

  update(dto: UpdateWorkingDayDto): Promise<WorkingDayEntity | null> {
    return this.repo.update(dto);
  }

  get(): Promise<WorkingDayEntity[]> {
    return this.repo.get();
  }
}

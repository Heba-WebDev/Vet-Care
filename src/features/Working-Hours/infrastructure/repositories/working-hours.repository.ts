import { AddWorkingHoursDto, WorkingHoursEntity, WorkingHoursRepository } from '../../domain';

export class WorkingHoursRepositoryImpl extends WorkingHoursRepository {
  constructor(private readonly repo: WorkingHoursRepository) {
    super();
  }

  add(dto: AddWorkingHoursDto): Promise<WorkingHoursEntity | null> {
    return this.repo.add(dto);
  }
}

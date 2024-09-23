import { Day } from '@prisma/client';
import { UpdateWorkingDayDto, WorkingDayEntity } from '../../domain';

export const defaultWorkDayMock: WorkingDayEntity = {
  id: 5,
  day: Day.Friday,
  active: true,
};

export const updateWorkDayMockDto: UpdateWorkingDayDto = {
  id: 1,
  active: false,
};

export const updatedWorkDayMock: WorkingDayEntity = {
  id: 5,
  day: Day.Friday,
  active: true,
};

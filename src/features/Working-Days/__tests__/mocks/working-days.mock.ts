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

export const workingDaysMock: WorkingDayEntity[] = [
  {
    id: 1,
    day: 'Monday',
    active: true,
  },
  {
    id: 2,
    day: 'Tuesday',
    active: true,
  },
  {
    id: 3,
    day: 'Wednesday',
    active: true,
  },
  {
    id: 4,
    day: 'Thursday',
    active: true,
  },
  {
    id: 5,
    day: 'Friday',
    active: true,
  },
];

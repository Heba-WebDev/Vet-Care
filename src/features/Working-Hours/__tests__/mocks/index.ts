import { VetEntity } from '../../../Vets/domain';
import {
  AddWorkingHoursDto,
  GetWorkingHoursDto,
  UpdateWorkingHoursDto,
  WorkingHoursEntity,
} from '../../domain';

export const addWorkingHoursDtoMock: AddWorkingHoursDto = {
  vet_id: 'e727557e-d167-4f46-b7b4-44a46ead6b9d',
  day_id: 1,
  start_time: '08:00:00',
  end_time: '17:00:00',
  break_start_time: '14:00:00',
  break_end_time: '15:00:00',
};

export const invalidDateDtoMock: AddWorkingHoursDto = {
  vet_id: 'e727557e-d167-4f46-b7b4-44a46ead6b9d',
  day_id: 1,
  start_time: '08:00:00',
  end_time: '17:00:00',
  break_start_time: '14:00:00',
  break_end_time: '15:00:00',
};

export const vetExists: VetEntity = {
  id: 'e727557e-d167-4f46-b7b4-44a46ead6b9d',
  name: 'John Doe',
  job_title: 'Veterinarian',
  permission_type: 'staff',
  email: '',
  phone_number: '',
  verified: true,
};

export const workingHoursEntityMock: Partial<WorkingHoursEntity> = {
  id: '1',
  vet_id: vetExists.id,
  day_id: addWorkingHoursDtoMock.day_id,
  start_time: addWorkingHoursDtoMock.start_time,
  end_time: addWorkingHoursDtoMock.end_time,
  break_start_time: addWorkingHoursDtoMock.break_start_time,
  break_end_time: addWorkingHoursDtoMock.break_end_time,
};

export const getWorkingHoursDtoMock: GetWorkingHoursDto = {
  vet_id: vetExists.id,
};

const mockDate = new Date();
const createMockDate = (timeStr: string) => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  const date = new Date(mockDate);
  date.setHours(hours, minutes, seconds, 0);
  return date;
};

export const GetWorkinghoursMock = [
  {
    id: '1',
    vet_id: vetExists.id,
    day_id: addWorkingHoursDtoMock.day_id,
    start_time: createMockDate(addWorkingHoursDtoMock.start_time),
    end_time: createMockDate(addWorkingHoursDtoMock.end_time),
    break_start_time: createMockDate(addWorkingHoursDtoMock.break_start_time),
    break_end_time: createMockDate(addWorkingHoursDtoMock.break_end_time),
  },
];

export const updateWorkingHoursDtoMock: UpdateWorkingHoursDto = {
  vet_id: vetExists.id,
  workday_id: '1vdgvjgtysg',
  start_time: createMockDate(addWorkingHoursDtoMock.start_time).toString(),
  end_time: createMockDate(addWorkingHoursDtoMock.end_time).toString(),
  break_start_time: createMockDate(addWorkingHoursDtoMock.break_start_time).toString(),
  break_end_time: createMockDate(addWorkingHoursDtoMock.break_end_time).toString(),
};

export const updatedHoursMock = {
  id: '6ca30c7a-1626-4804-acd7-3d02ee246059',
  vet_id: 'e727557e-d167-4f46-b7b4-44a46ead6b9d',
  day_id: 1,
  start_time: createMockDate('09:00:00'),
  end_time: createMockDate('18:00:00'),
  break_start_time: createMockDate('14:00:00'),
  break_end_time: createMockDate('15:00:00'),
};

import { VetEntity } from '../../../Vets/domain';
import { AddWorkingHoursDto, WorkingHoursEntity } from '../../domain';

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

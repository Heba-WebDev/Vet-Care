import { AddHolidayDto, UpdateHolidayDto, HolidayEntity } from '../../domain';

export const addHolidayDtoMock: AddHolidayDto = {
  name: 'New Year',
  date: '01/01/2025',
};

export const holidaysMock: HolidayEntity[] = [
  {
    id: '1',
    name: 'New Year',
    date: '01/01/2025',
  },
  {
    id: '2',
    name: 'Easter',
    date: '20/04/2025',
  },
  {
    id: '3',
    name: 'Labor Day',
    date: '01/09/2025',
  },
];

export const updateHolidayDtoMock: UpdateHolidayDto = {
  id: '1',
  name: 'New Year',
  date: '01/01/2025',
};

export const updatedHolidayMock: UpdateHolidayDto = {
  id: '1',
  name: 'Labor Day',
  date: '01/02/2025',
};

import { AddHolidayDto, UpdateHolidayDto, HolidayEntity } from '../../domain';

export const addHolidayDtoMock: AddHolidayDto = {
  name: 'New Year',
  date: new Date(2025, 0, 1),
};

export const holidaysMock: HolidayEntity[] = [
  {
    id: '1',
    name: 'New Year',
    date: new Date(2025, 0, 1),
  },
  {
    id: '2',
    name: 'Easter',
    date: new Date(2025, 3, 20),
  },
  {
    id: '3',
    name: 'Labor Day',
    date: new Date(2025, 8, 1),
  },
];

export const previousHolidaysMock: HolidayEntity[] = [
  {
    id: '1',
    name: 'New Year',
    date: new Date(2024, 0, 1),
  },
  {
    id: '2',
    name: 'Easter',
    date: new Date(2024, 3, 20),
  },
  {
    id: '3',
    name: 'Labor Day',
    date: new Date(2024, 8, 1),
  },
];

export const updateHolidayDtoMock: UpdateHolidayDto = {
  id: '1',
  name: 'New Year',
  date: new Date(2025, 0, 1),
};

export const updatedHolidayMock: UpdateHolidayDto = {
  id: '1',
  name: 'Labor Day',
  date: new Date(2025, 1, 1),
};

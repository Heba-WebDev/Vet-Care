import { PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { HolidaysDatasourceImpl } from '../../infrastructure';
import { updateHolidayDtoMock, updatedHolidayMock } from '../mocks';

describe('Update a public holiday', () => {
  let holidaysDatasource: HolidaysDatasourceImpl;

  beforeEach(() => {
    holidaysDatasource = new HolidaysDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should update a public holiday', async () => {
    prismaMock.publicHolidays.update?.mockResolvedValueOnce(updatedHolidayMock);
    const result = await holidaysDatasource.update(updateHolidayDtoMock);
    expect(typeof result).toBe('object');
    expect(result?.id).toEqual(updateHolidayDtoMock.id);
    expect(result?.date).toEqual(updatedHolidayMock.date);
    expect(result?.name).toEqual(updatedHolidayMock.name);
  });
});

import { PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { HolidaysDatasourceImpl } from '../../infrastructure';
import { addHolidayDtoMock } from '../mocks';

describe('Add a public holiday', () => {
  let holidaysDatasource: HolidaysDatasourceImpl;

  beforeEach(() => {
    holidaysDatasource = new HolidaysDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should add a new public holida', async () => {
    prismaMock.publicHolidays.create?.mockResolvedValueOnce(addHolidayDtoMock);
    const result = await holidaysDatasource.add(addHolidayDtoMock);
    expect(typeof result).toBe('object');
    expect(result?.date).toEqual(addHolidayDtoMock.date);
    expect(result?.name).toEqual(addHolidayDtoMock.name);
  });
});

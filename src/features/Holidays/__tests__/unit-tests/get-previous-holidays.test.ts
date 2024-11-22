import { PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { HolidaysDatasourceImpl } from '../../infrastructure';
import { previousHolidaysMock } from '../mocks';

describe('Returns all previous public holidays', () => {
  let holidaysDatasource: HolidaysDatasourceImpl;

  beforeEach(() => {
    holidaysDatasource = new HolidaysDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should return all previous holidays', async () => {
    prismaMock.publicHolidays.findMany?.mockResolvedValueOnce(previousHolidaysMock);
    const result = await holidaysDatasource.getPrevious({ page: 1, limit: 5 });
    expect(typeof result).toBe('object');
    expect(result.length).toEqual(previousHolidaysMock.length);
  });
});

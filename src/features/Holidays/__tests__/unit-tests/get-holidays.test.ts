import { PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { HolidaysDatasourceImpl } from '../../infrastructure';
import { holidaysMock } from '../mocks';

describe('Returns all public holidays', () => {
  let holidaysDatasource: HolidaysDatasourceImpl;

  beforeEach(() => {
    holidaysDatasource = new HolidaysDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should return all holidays', async () => {
    prismaMock.publicHolidays.findMany?.mockResolvedValueOnce(holidaysMock);
    const result = await holidaysDatasource.get({ page: 1, limit: 5 });
    expect(typeof result).toBe('object');
    expect(result.length).toEqual(holidaysMock.length);
  });
});

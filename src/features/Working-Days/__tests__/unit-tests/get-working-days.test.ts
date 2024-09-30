import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import { WorkingDaysDatasourceImpl } from '../../infrastructure';
import { workingDaysMock } from '../mocks/working-days.mock';
import { CustomError } from '../../../../domain';

describe('Get all working days', () => {
  let datasource: WorkingDaysDatasourceImpl;
  beforeEach(() => {
    datasource = new WorkingDaysDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully fetch all working days', async () => {
    prismaMock.workingDays.findMany?.mockReturnValueOnce(workingDaysMock);

    const result = await datasource.get();
    expect(typeof result).toEqual('object');
    expect(result.length).toEqual(workingDaysMock.length);
    expect(result[0].id).toEqual(workingDaysMock[0].id);
  });

  it('should throw an error for database internal errors', async () => {
    prismaMock.workingDays.findMany?.mockRejectedValueOnce(new Error('database error'));
    await expect(datasource.get()).rejects.toThrow(CustomError.internalServerError());
  });
});

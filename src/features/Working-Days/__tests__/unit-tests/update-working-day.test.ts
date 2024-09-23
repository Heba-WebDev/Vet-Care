import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import { WorkingDaysDatasourceImpl } from '../../infrastructure';
import {
  defaultWorkDayMock,
  updatedWorkDayMock,
  updateWorkDayMockDto,
} from '../mocks/working-days.mock';
import { CustomError } from '../../../../domain';

describe('Update a working day', () => {
  let datasource: WorkingDaysDatasourceImpl;
  beforeEach(() => {
    datasource = new WorkingDaysDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully update a working day', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.workingDays.findFirst?.mockReturnValueOnce(defaultWorkDayMock);
    prismaMock.workingDays.update?.mockReturnValueOnce(updatedWorkDayMock);
    const result = await datasource.update({
      id: updateWorkDayMockDto.id,
      active: updateWorkDayMockDto.active,
    });
    expect(typeof result).toEqual('object');
    expect(result?.active).toEqual(updatedWorkDayMock.active);
    expect(result?.id).toEqual(defaultWorkDayMock.id);
  });

  it("should throw an error if the working day can't be found", async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.workingDays.findFirst?.mockReturnValueOnce(null);
    await expect(datasource.update({ id: 12, active: false })).rejects.toThrow(
      CustomError.badRequest('No working day found'),
    );
  });
});

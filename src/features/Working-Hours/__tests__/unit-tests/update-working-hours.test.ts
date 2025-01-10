import { describe, beforeEach, it, vi, expect } from 'vitest';
import { WorkingHoursDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import {
  GetWorkinghoursMock,
  updatedHoursMock,
  updateWorkingHoursDtoMock,
  vetExists,
} from '../mocks';
import { CustomError } from '../../../../domain';

describe('Update the working hours of a vet', () => {
  let datasource: WorkingHoursDatasourceImpl;
  beforeEach(() => {
    datasource = new WorkingHoursDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully update the working hours', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return await callback(prismaMock);
    });

    prismaMock.veterinarians.findFirst!.mockResolvedValue(vetExists);
    prismaMock.workingHours.findFirst!.mockResolvedValue(GetWorkinghoursMock);
    prismaMock.workingHours.update!.mockResolvedValue(updatedHoursMock);
    const result = await datasource.update(updateWorkingHoursDtoMock);
    expect(result).toBeDefined();
    expect(result?.vet_id).toBe(updatedHoursMock.vet_id);
    expect(result?.day_id).toBe(updatedHoursMock.day_id);
    expect(prismaMock.veterinarians.findFirst).toHaveBeenCalledOnce();
    expect(prismaMock.workingHours.findFirst).toHaveBeenCalledOnce();
    expect(prismaMock.workingHours.update).toHaveBeenCalledOnce();
  });

  it('should throw an error if the vet can not be found', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.veterinarians.findFirst?.mockResolvedValue(null);
    await expect(
      datasource.update({
        vet_id: 'fake_id',
        workday_id: updateWorkingHoursDtoMock.workday_id,
        start_time: updateWorkingHoursDtoMock.start_time,
        end_time: updateWorkingHoursDtoMock.end_time,
        break_start_time: updateWorkingHoursDtoMock.break_start_time,
        break_end_time: updateWorkingHoursDtoMock.break_end_time,
      }),
    ).rejects.toThrow(CustomError.badRequest('No veterinarian was found'));
  });
});

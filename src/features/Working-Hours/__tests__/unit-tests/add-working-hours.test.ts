import { describe, beforeEach, it, vi, expect } from 'vitest';
import { WorkingHoursDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../../../domain';
import { addWorkingHoursDtoMock, invalidDateDtoMock, vetExists } from '../mocks';
import { workingDaysMock } from '../../../Working-Days/__tests__/mocks/working-days.mock';

describe('Add the working hours of a vet', () => {
  let datasource: WorkingHoursDatasourceImpl;
  beforeEach(() => {
    datasource = new WorkingHoursDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully add the working hours', async () => {
    // Mock the transaction
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return await callback(prismaMock);
    });

    // Convert mock times to Date objects to match what the implementation will create
    const mockDate = new Date();
    const createMockDate = (timeStr: string) => {
      const [hours, minutes, seconds] = timeStr.split(':').map(Number);
      const date = new Date(mockDate);
      date.setHours(hours, minutes, seconds, 0);
      return date;
    };

    const expectedCreatedEntity = {
      id: '1',
      vet_id: vetExists.id,
      day_id: addWorkingHoursDtoMock.day_id,
      start_time: createMockDate(addWorkingHoursDtoMock.start_time),
      end_time: createMockDate(addWorkingHoursDtoMock.end_time),
      break_start_time: createMockDate(addWorkingHoursDtoMock.break_start_time),
      break_end_time: createMockDate(addWorkingHoursDtoMock.break_end_time),
    };

    prismaMock.workingDays.findFirst!.mockResolvedValue({
      id: 1,
      active: true,
      name: 'Monday',
    });
    prismaMock.veterinarians.findFirst!.mockResolvedValue(vetExists);
    prismaMock.workingHours.findFirst!.mockResolvedValue(null);
    prismaMock.workingHours.create!.mockResolvedValue(expectedCreatedEntity);
    const result = await datasource.add(addWorkingHoursDtoMock);
    expect(result).toBeDefined();
    expect(result?.id).toBe(expectedCreatedEntity.id);
    expect(result?.vet_id).toBe(expectedCreatedEntity.vet_id);
    expect(result?.day_id).toBe(expectedCreatedEntity.day_id);
    expect(prismaMock.workingHours.create).toHaveBeenCalledWith({
      data: {
        vet_id: addWorkingHoursDtoMock.vet_id,
        day_id: addWorkingHoursDtoMock.day_id,
        start_time: expect.any(Date),
        end_time: expect.any(Date),
        break_start_time: expect.any(Date),
        break_end_time: expect.any(Date),
      },
    });
  });

  it('should throw error if the day does not exsit', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.workingDays.findFirst?.mockReturnValue(null);
    await expect(datasource.add(invalidDateDtoMock)).rejects.toThrow(
      CustomError.badRequest('No day was found'),
    );
  });

  it('should throw error if the vet does not exsit', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.workingDays.findFirst?.mockReturnValue(workingDaysMock);
    prismaMock.workingHours.findFirst?.mockReturnValue(null);
    prismaMock.veterinarians.findFirst?.mockReturnValue(null);
    await expect(datasource.add(invalidDateDtoMock)).rejects.toThrow(
      CustomError.badRequest('No veterinarian was found'),
    );
  });

  it('should throw error if the working hours exsit', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.workingDays.findFirst?.mockResolvedValue(workingDaysMock);
    prismaMock.veterinarians.findFirst?.mockResolvedValue(vetExists); // Add this line
    prismaMock.workingHours.findFirst?.mockResolvedValue([]);
    await expect(datasource.add(invalidDateDtoMock)).rejects.toThrow(
      CustomError.badRequest('Working hours for this day already exists'),
    );
  });
});

import { describe, beforeEach, it, vi, expect } from 'vitest';
import { WorkingHoursDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../../../domain';
import { getWorkingHoursDtoMock, GetWorkinghoursMock, vetExists } from '../mocks';
import { WorkinghoursMapper } from '../../infrastructure/mappers';

describe('Get all working hours of a vet', () => {
  let datasource: WorkingHoursDatasourceImpl;
  beforeEach(() => {
    datasource = new WorkingHoursDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should return all working hours of a vet', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.veterinarians.findFirst?.mockResolvedValue(vetExists);
    prismaMock.workingHours.findMany?.mockResolvedValue(GetWorkinghoursMock);
    const result = await datasource.get(getWorkingHoursDtoMock);
    expect(prismaMock.veterinarians.findFirst).toHaveBeenCalledWith({
      where: {
        id: getWorkingHoursDtoMock.vet_id,
      },
    });
    expect(prismaMock.workingHours.findMany).toHaveBeenCalledOnce();
    const expectedResult = GetWorkinghoursMock.map((hour) =>
      WorkinghoursMapper.workingHoursEntityFromObject(hour),
    );
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error if the vet can not be found', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.veterinarians.findFirst?.mockResolvedValue(null);
    await expect(datasource.get({ vet_id: 'fake_id' })).rejects.toThrow(
      CustomError.badRequest('No veterinarian was found'),
    );
  });

  it('should handle pagination correctly', async () => {
    const paginatedDto = {
      ...getWorkingHoursDtoMock,
      page: 2,
      limit: 10,
    };

    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });

    prismaMock.veterinarians.findFirst?.mockResolvedValue(vetExists);
    prismaMock.workingHours.findMany?.mockResolvedValue(GetWorkinghoursMock);

    await datasource.get(paginatedDto);

    expect(prismaMock.workingHours.findMany).toHaveBeenCalledWith({
      where: {
        vet_id: paginatedDto.vet_id,
      },
      skip: 10, // (page - 1) * limit
      take: 10,
    });
  });
});

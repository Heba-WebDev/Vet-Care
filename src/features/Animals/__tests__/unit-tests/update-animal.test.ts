import { PrismaClient } from '@prisma/client';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { describe, beforeEach, vi, it, expect } from 'vitest';
import { AnimalsDatasourceImpl } from '../../infrastructure/datasources';
import { animalMock, animalMockUpdated } from '../mocks/animal.mock';
import { AnimalMapper } from '../../infrastructure/mapper';
import { CustomError } from '../../../../domain';

describe('Update an animal', () => {
  let animalsDatasource: AnimalsDatasourceImpl;

  beforeEach(() => {
    animalsDatasource = new AnimalsDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully update an animal', async () => {
    prismaMock.animals.findFirst?.mockReturnValueOnce(animalMock);
    prismaMock.animals.update?.mockReturnValueOnce(animalMockUpdated);
    AnimalMapper.animalEntityFromObject(animalMockUpdated);
    const result = await animalsDatasource.update({ id: 1, isSupported: 'false' });
    expect(typeof result).toEqual('object');
    expect(result?.isSupported).toEqual(false);
  });

  it("should throw an error if animal doesn't exist", async () => {
    prismaMock.animals.findFirst?.mockReturnValueOnce(null);
    await expect(
      animalsDatasource.update({ id: 33, isDeleted: 'true', isSupported: 'false ' }),
    ).rejects.toThrow(CustomError.badRequest('No animal found'));
  });
});

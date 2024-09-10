import { vi, expect, it, beforeEach, describe } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PetsDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { ownerMock } from '../../../Owners/__tests__/mocks/owner.mock';
import { petDtoMock, petMock } from '../mocks/pet.mock';
import { animalMock } from '../../../Animals/__tests__/mocks/animal.mock';
import { CustomError } from '../../../../domain';

describe('Register pets', () => {
  let datasource: PetsDatasourceImpl;
  beforeEach(() => {
    datasource = new PetsDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully register a pet', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.owners.findFirst?.mockReturnValueOnce(ownerMock);
    prismaMock.animals.findFirst?.mockReturnValueOnce(animalMock);
    prismaMock.pets.create?.mockReturnValueOnce(petMock);
    const result = await datasource.register(petDtoMock);
    expect(typeof result).toEqual('object');
    expect(result?.owner_id).toEqual(ownerMock.id);
  });

  it("should throw an error if owner can't be found", async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.owners.findFirst?.mockReturnValueOnce(null);
    await expect(datasource.register(petDtoMock)).rejects.toThrow(
      CustomError.badRequest('No owner found'),
    );
  });

  it("should throw an error if the animal can't be found", async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.owners.findFirst?.mockReturnValueOnce(ownerMock);
    prismaMock.animals.findFirst?.mockReturnValueOnce(null);
    await expect(datasource.register(petDtoMock)).rejects.toThrow(
      CustomError.badRequest('This animal type is not supported'),
    );
  });
});

import { vi, expect, it, beforeEach, describe } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PetsDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { ownerMock } from '../../../Owners/__tests__/mocks/owner.mock';
import { petMock } from '../mocks/pet.mock';
import { CustomError } from '../../../../domain';

describe('Get all pets of an owner', () => {
  let datasource: PetsDatasourceImpl;
  beforeEach(() => {
    datasource = new PetsDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it("should successfully returns all pet's of an owner", async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.owners.findFirst?.mockReturnValueOnce(ownerMock);
    prismaMock.pets.findMany?.mockReturnValueOnce([petMock]);
    const result = await datasource.getAll({ owner_id: ownerMock.id });
    expect(typeof result).toEqual('object');
    expect(typeof result?.length).toEqual('number');
  });

  it("should throw an error if owner can't be found", async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.owners.findFirst?.mockReturnValueOnce(null);
    await expect(datasource.getAll({ owner_id: ownerMock.id })).rejects.toThrow(
      CustomError.badRequest('No owner found'),
    );
  });
});

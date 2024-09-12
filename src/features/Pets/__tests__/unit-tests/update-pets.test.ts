import { vi, expect, it, beforeEach, describe } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PetsDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { ownerMock } from '../../../Owners/__tests__/mocks/owner.mock';
import { petUpdateMock } from '../mocks/pet.mock';
import { CustomError } from '../../../../domain';

describe('Update a pet', () => {
  let datasource: PetsDatasourceImpl;
  beforeEach(() => {
    datasource = new PetsDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully update a pet', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.pets.update?.mockReturnValueOnce(petUpdateMock);
    const result = await datasource.update({ owner_id: ownerMock.id, pet_id: '1', name: 'Loui' });
    expect(typeof result).toEqual('object');
    expect(result?.name).toBe('Loui');
  });

  it('should throw an error if the animal_id is not found', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.animals.findFirst?.mockResolvedValueOnce(null);
    await expect(
      datasource.update({ owner_id: ownerMock.id, pet_id: '1', animal_id: 1 }),
    ).rejects.toThrow(CustomError.badRequest('Invalid animal id'));
  });
});

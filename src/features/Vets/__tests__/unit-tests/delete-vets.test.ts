import { PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { VetMapper, VetsDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { formerVetMock, vetEntityVerifiedMock } from '../mocks/vet.mock';
import { CustomError } from '../../../../domain';

describe('Vets account deletion', () => {
    let VetsDatasource: VetsDatasourceImpl;

    beforeEach(() => {
        VetsDatasource = new VetsDatasourceImpl(prismaMock as unknown as PrismaClient);
        vi.clearAllMocks();
    });

    it('should delete a vet member', async() => {
      const member = {
        id: vetEntityVerifiedMock.id,
        exit_reason: 'Contract ended'
      }
      prismaMock.veterinarians.findFirst?.mockResolvedValue(vetEntityVerifiedMock);
      prismaMock.formerVets.create?.mockResolvedValue(formerVetMock);
      prismaMock.veterinarians.delete?.mockResolvedValue(vetEntityVerifiedMock);
      prismaMock.$transaction.mockImplementation(async (callback) => {
            return callback(prismaMock);
        });
      VetMapper.vetEntityFromObject(vetEntityVerifiedMock);
      const result = await VetsDatasource.delete(member);
      expect(typeof result).toEqual('object');
      expect(prismaMock.veterinarians.delete).toHaveBeenCalledOnce();
      expect(prismaMock.formerVets.create).toHaveBeenCalledOnce();
    });

   it('should throw an error if vet id is invalid', async() => {
    prismaMock.veterinarians.findFirst?.mockResolvedValue(null);
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    await expect(VetsDatasource.delete({ id: 'fake-id', exit_reason: ''})).rejects
    .toThrow(CustomError.badRequest('Invalid credentials'));
   });
});

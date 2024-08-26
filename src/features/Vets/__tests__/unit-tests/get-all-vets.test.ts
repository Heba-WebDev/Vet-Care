import { PrismaClient } from '@prisma/client';
import { vi, it, beforeEach, describe, expect } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { CustomError } from '../../../../domain';
import { VetsDatasourceImpl } from '../../infrastructure';
import { vetEntityVerifiedMock } from '../mocks/vet.mock';

describe('Vets Get-All-Current', () => {
    let vetsDatasource: VetsDatasourceImpl;

    beforeEach(() => {
        vetsDatasource = new VetsDatasourceImpl(prismaMock as unknown as PrismaClient);
        vi.clearAllMocks();
    });

    it('should return all current vets members', async() => {
        prismaMock.veterinarians.findMany?.mockResolvedValueOnce(vetEntityVerifiedMock);
        const result = await vetsDatasource.getAll({ page: 1, limit: 5 });
        expect(result).toEqual(vetEntityVerifiedMock);
        expect(prismaMock.veterinarians.findMany).toHaveBeenCalledOnce();
    });

    it('should return an empty array if no vet member was found', async() => {
        prismaMock.veterinarians.findMany?.mockResolvedValueOnce([]);
        const result = await vetsDatasource.getAll({ page: 1, limit: 5 });
        expect(result).toStrictEqual([]);
    });

    it('should throw an internal server error for unexpected errors', async() => {
        prismaMock.veterinarians.findMany?.mockRejectedValueOnce(new Error('Unexpected Error'));
        await expect(vetsDatasource.getAll({ page: 1, limit: 5 })).rejects.toThrow(CustomError.internalServerError());
    });
});

import { vi, it, beforeEach, describe, expect } from 'vitest';
import { prismaMock } from '../../../../tests/mocks';
import { CustomError } from '../../../../domain';
import { VetsDatasourceImpl } from '../../infrastructure';
import { formerVetMock } from '../mocks/vet.mock';

describe('Vets Get-All-Current', () => {
    let vetsDatasource: VetsDatasourceImpl;

    beforeEach(() => {
        vetsDatasource = new VetsDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should return all former vets members'), async() => {
        prismaMock.formerVets.findMany.mockResolvedValueOnce(formerVetMock);
        const result = await vetsDatasource.getAll({ page: 1, limit: 5 });
        expect(result).toEqual(formerVetMock);
        expect(prismaMock.formerVets.findMany).toHaveBeenCalledWith({
            skip: (1 - 1) * 5,
            take: 5
        });
    };

    it('should return an empty array if no former vet member was found', async() => {
        prismaMock.formerVets.findMany.mockResolvedValueOnce([]);
        const result = await vetsDatasource.GetAllFormer({ page: 1, limit: 5 });
        expect(result).toStrictEqual([]);
    });

    it('should throw an internal server error for unexpected errors', async() => {
        prismaMock.formerVets.findMany.mockRejectedValueOnce(new Error('Unexpected Error'));
        await expect(vetsDatasource.GetAllFormer({ page: 1, limit: 5 })).rejects.toThrow(CustomError.internalServerError());
    });
});

import { PrismaClient } from '@prisma/client';
import { it, expect, beforeEach, vi } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { AnimalsDatasourceImpl } from '../../infrastructure/datasources';
import { AnimalMapper } from '../../infrastructure/mapper';
import { animalMock, animalMockDeleted } from '../mocks/animal.mock';
import { CustomError } from '../../../../domain';
import { describe } from 'node:test';

describe('Delete an animal', () => {
    let animalsDatasource: AnimalsDatasourceImpl;

    beforeEach(() => {
        animalsDatasource = new AnimalsDatasourceImpl(prismaMock as unknown as PrismaClient);
        vi.clearAllMocks();
    });

    it('should successfully soft delete an animal', async() => {
        prismaMock.animals.findFirst?.mockReturnValueOnce(animalMock);
        prismaMock.animals.update?.mockReturnValueOnce(animalMockDeleted);
        AnimalMapper.animalEntityFromObject(animalMockDeleted);
        const result = await animalsDatasource.delete({ id: 1});
        expect(typeof result).toEqual('object');
        expect(result?.isDeleted).toEqual(true);
    });

    it('should throw an error if the animal is not found', async() => {
        prismaMock.animals.findFirst?.mockReturnValueOnce(animalMockDeleted);
        await expect(animalsDatasource.delete({ id: 1 })).rejects.toThrow(
            CustomError.badRequest('Animal already deleted')
        )
    });

    it('should throw an error if animal already deleted', async() => {
        prismaMock.animals.findFirst?.mockReturnValueOnce(null);
        await expect(animalsDatasource.delete({ id: 1 })).rejects.toThrow(
            CustomError.badRequest('No animal found')
        )
    });

});

import { Animal, PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { AnimalsDatasourceImpl } from '../../infrastructure/datasources';
import { AnimalMapper } from '../../infrastructure/mapper';
import { animalMock } from '../mocks/animal.mock';
import { CustomError } from '../../../../domain';

describe('Add an animal', () => {
    let animalsDatasource: AnimalsDatasourceImpl;

    beforeEach(() => {
        animalsDatasource = new AnimalsDatasourceImpl(prismaMock as unknown as PrismaClient);
        vi.clearAllMocks();
    });

    it('should successfully add an animal', async() => {
        prismaMock.animals.findFirst?.mockReturnValueOnce(null);
        prismaMock.animals.create?.mockReturnValueOnce(animalMock);
        AnimalMapper.animalEntityFromObject(animalMock);
        const result = await animalsDatasource.add({ type: Animal.Bird, isSupported: true});
        expect(typeof result).toEqual('object');
        expect(result?.type).toBe(Animal.Bird);
    });

    it('should throw an error for invalid animal type', async() => {
        await expect(animalsDatasource.add({ type: 'invalid-type', isSupported: true})).rejects
        .toThrow(CustomError.badRequest('Animal type doesn\'t exist'));
    });

    it('should throw an error if animal type already exists', async() => {
        prismaMock.animals.findFirst?.mockReturnValueOnce(Animal.Bird);
        await expect(animalsDatasource.add({ type: Animal.Bird, isSupported: true})).rejects
        .toThrow(CustomError.badRequest('Animal type already exists'));
    });
});
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { prismaMock } from '../../../../tests/mocks';
import { OwnersDatasourceImpl } from '../../infrastructure/datasources';
import { AllOwnersMock, ownerMock, secondOwnerMock } from '../mocks/owner.mock';
import { GetAllOwnersDto } from '../../domain';

describe('Get all pets owners', () => {
    let ownersDatasource: OwnersDatasourceImpl;

    beforeEach(() => {
        ownersDatasource = new OwnersDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should successfully fetch all owners', async() => {
        prismaMock.owners.findMany.mockReturnValueOnce(AllOwnersMock);
        const noDto: GetAllOwnersDto = {id: null, name: null, phone_number: null, email: null}
        const result = await ownersDatasource.getAll(noDto);
        expect(result).toEqual(AllOwnersMock);
        expect(prismaMock.owners.findMany).toHaveBeenCalledOnce();
    });

    it('should successfully fetch an owner by id', async() => {
        prismaMock.owners.findMany.mockReturnValueOnce(ownerMock);
        const dto: GetAllOwnersDto = {id: ownerMock.id, name: null, phone_number: null, email: null}
        const result = await ownersDatasource.getAll(dto);
        expect(result).toEqual(ownerMock);
        expect(prismaMock.owners.findMany).toHaveBeenCalledOnce();
    });

    it('should successfully fetch an owner by email', async() => {
        prismaMock.owners.findMany.mockReturnValueOnce(secondOwnerMock);
        const dto: GetAllOwnersDto = {id: null, name: null, phone_number: null, email: secondOwnerMock.email}
        const result = await ownersDatasource.getAll(dto);
        expect(result).toEqual(secondOwnerMock);
        expect(prismaMock.owners.findMany).toHaveBeenCalledOnce();
    });

    it('should successfully fetch an owner by phone', async() => {
        prismaMock.owners.findMany.mockReturnValueOnce(secondOwnerMock);
        const dto: GetAllOwnersDto = {id: null, name: null, phone_number: secondOwnerMock.phone_number, email: null}
        const result = await ownersDatasource.getAll(dto);
        expect(result).toEqual(secondOwnerMock);
        expect(prismaMock.owners.findMany).toHaveBeenCalledOnce();
    });
});

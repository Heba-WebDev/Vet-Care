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
        prismaMock.$transaction.mockResolvedValueOnce([AllOwnersMock.length, AllOwnersMock]);
        const noDto: GetAllOwnersDto = {id: null, name: null, phone_number: null, email: null, page: 1, limit: 1}
        const result = await ownersDatasource.getAll(noDto);
        expect(result?.currentPage).toEqual(1);
        expect(result?.totalPages).toEqual(2); // the mock array has two owners, if the limit is 1, pages should be 2
        expect(prismaMock.owners.findMany).toHaveBeenCalledOnce();
    });

    it('should successfully fetch an owner by id', async() => {
        prismaMock.$transaction.mockResolvedValueOnce([AllOwnersMock.length, ownerMock]);
        const dto: GetAllOwnersDto = {id: ownerMock.id, name: null, phone_number: null, email: null}
        const result = await ownersDatasource.getAll(dto);
        expect(result?.owners).toEqual(ownerMock);
        expect(prismaMock.owners.findMany).toHaveBeenCalledOnce();
    });

    it('should successfully fetch an owner by email', async() => {
        prismaMock.$transaction.mockResolvedValueOnce([AllOwnersMock.length, secondOwnerMock]);
        const dto: GetAllOwnersDto = {id: null, name: null, phone_number: null, email: secondOwnerMock.email}
        const result = await ownersDatasource.getAll(dto);
        expect(result?.owners).toEqual(secondOwnerMock);
        expect(prismaMock.owners.findMany).toHaveBeenCalledOnce();
    });

    it('should successfully fetch an owner by phone', async() => {
        prismaMock.$transaction.mockResolvedValueOnce([AllOwnersMock.length, secondOwnerMock]);
        const dto: GetAllOwnersDto = {id: null, name: null, phone_number: secondOwnerMock.phone_number, email: null}
        const result = await ownersDatasource.getAll(dto);
        expect(result?.owners).toEqual(secondOwnerMock);
        expect(prismaMock.owners.findMany).toHaveBeenCalledOnce();
    });
});

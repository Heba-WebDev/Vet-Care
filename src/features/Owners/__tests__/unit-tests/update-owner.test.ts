import { vi, it, describe, beforeEach, expect } from 'vitest';
import { prismaMock } from '../../../../tests/mocks';
import { OwnersDatasourceImpl } from '../../infrastructure/datasources';
import { OwnerMapper } from '../../infrastructure/mapper';
import { CustomError } from '../../../../domain';
import { ownerMock, secondOwnerMock, updatedOwnerMock } from '../mocks/owner.mock';


describe('Update an owner', () => {
    let ownersDatasource: OwnersDatasourceImpl;

    beforeEach(() => {
        ownersDatasource = new OwnersDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should update an owner successfully', async() => {
        prismaMock.owners.findFirst.mockReturnValueOnce(ownerMock); // owner found by id
        // no other owner has the same email or phone number (if passed)
        prismaMock.owners.findFirst.mockReturnValueOnce(null);
        prismaMock.owners.update.mockReturnValueOnce(updatedOwnerMock);
        OwnerMapper.ownerEntityFromObject({ name: updatedOwnerMock.name, email: updatedOwnerMock.email, phone_number: updatedOwnerMock.phone_number });
        const result = await ownersDatasource.update({ id: ownerMock.id, email: updatedOwnerMock.email });
        expect(typeof result).toEqual('object');
        expect(prismaMock.owners.findFirst).toHaveBeenCalledTimes(2);
        expect(prismaMock.owners.update).toHaveBeenCalledOnce();
        expect(result?.email).toEqual(updatedOwnerMock.email);
        expect(result?.phone_number).toEqual(ownerMock.phone_number);
    });

    it('should throw an error if another owner has the same email', async() => {
        prismaMock.owners.findFirst.mockReturnValueOnce(ownerMock); // owner found by id
        // another owner has the same email
        prismaMock.owners.findFirst.mockReturnValueOnce(secondOwnerMock);
        await expect(ownersDatasource.update({ id: ownerMock.id, email: secondOwnerMock.email }))
            .rejects.toThrow(CustomError.badRequest('Email already exists'))
    });

    it('should throw an error if another owner has the same phone number', async() => {
        prismaMock.owners.findFirst.mockReturnValueOnce(ownerMock); // owner found by id
        // another owner has the same phone number
        prismaMock.owners.findFirst.mockReturnValueOnce(secondOwnerMock);
        await expect(ownersDatasource.update({ id: ownerMock.id, phone_number: secondOwnerMock.phone_number }))
            .rejects.toThrow(CustomError.badRequest('Phone number already exists'))
    });
});

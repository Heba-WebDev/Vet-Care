import { vi, it, describe, beforeEach, expect } from 'vitest';
import { prismaMock } from '../../../../tests/mocks';
import { OwnersDatasourceImpl } from '../../infrastructure/datasources';
import { OwnerMapper } from '../../infrastructure/mapper';
import { CustomError } from '../../../../domain';
import {
    ownerMapped,
    ownerMock,
    registerOwnerDtoMock,
} from '../mocks/owner.mock';

describe('Register a pet owner', () => {
    let ownersDatasource: OwnersDatasourceImpl;

    beforeEach(() => {
        ownersDatasource = new OwnersDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should successfully register an owner', async () => {
        prismaMock.owners.findFirst.mockReturnValueOnce(null); // no email
        prismaMock.owners.findFirst.mockReturnValueOnce(null); // no phone
        prismaMock.owners.create.mockReturnValue(ownerMock);
        OwnerMapper.ownerEntityFromObject(ownerMapped);
        const result = await ownersDatasource.register(registerOwnerDtoMock);
        expect(typeof result).toEqual('object');
        expect(prismaMock.owners.findFirst).toHaveBeenCalledTimes(2);
        expect(prismaMock.owners.create).toHaveBeenCalledOnce();
        expect(result?.email).toEqual(registerOwnerDtoMock.email);
    });

    it('should throw an error if email exists', async () => {
        prismaMock.owners.findFirst.mockReturnValueOnce(ownerMock);
        await expect(
            ownersDatasource.register(registerOwnerDtoMock),
        ).rejects.toThrow(CustomError.badRequest('Email already exists'));
    });

    it('should throw an error if phone number exists', async () => {
        prismaMock.owners.findFirst.mockReturnValueOnce(null); // email not found
        prismaMock.owners.findFirst.mockReturnValueOnce(ownerMock); // not unique phone number
        await expect(
            ownersDatasource.register({
                name: ownerMock.name,
                email: 'new@example.com',
                phone_number: ownerMock.phone_number,
            }),
        ).rejects.toThrow(
            CustomError.badRequest('Phone number already exists'),
        );
    });
});

import { vi, it, describe, beforeEach, expect } from 'vitest';

import { bcryptAdapter } from '../../../../config';
import { CustomError } from '../../../../domain';
import { VetMapper, VetsDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../tests/mocks';
import { vetEntityUnveriviedMock, vetEntityVerifiedMock, vetUpdateDtoMock } from '../mocks/vet.mock';

vi.mock('../../../../config') // mock bcrypt

describe('Vet update account', () => {
    let vetDatasource: VetsDatasourceImpl;

    beforeEach(() => {
        vetDatasource = new VetsDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should update a vet member account', async() => {
        prismaMock.veterinarians.findFirst.mockResolvedValue(vetEntityVerifiedMock);
        bcryptAdapter.hash = vi.fn().mockResolvedValue(vetUpdateDtoMock.password);
        prismaMock.veterinarians.update.mockResolvedValueOnce(vetEntityVerifiedMock);
        VetMapper.vetEntityFromObject = vi.fn().mockReturnValue(vetEntityVerifiedMock);

        const result = await vetDatasource.update(vetUpdateDtoMock);

        expect(result).toEqual(vetEntityVerifiedMock);
        expect(prismaMock.veterinarians.findFirst).toHaveBeenCalledWith({ where: { id: vetUpdateDtoMock.id } });
        expect(prismaMock.veterinarians.update).toHaveBeenCalledTimes(1);
        expect(bcryptAdapter.hash).toHaveBeenCalledWith(vetUpdateDtoMock.password);
    });

    it('should throw an error if the vet account does not exist', async() => {
        prismaMock.veterinarians.findFirst.mockResolvedValue(null);
        expect(vetDatasource.update(vetUpdateDtoMock)).rejects.toThrow(
            CustomError.badRequest('Invalid credentials')
        )
    })

    it('should throw an error if the vet account does not exist', async() => {
        prismaMock.veterinarians.findFirst.mockResolvedValue(vetEntityUnveriviedMock);
        expect(vetDatasource.update(vetUpdateDtoMock)).rejects.toThrow(
            CustomError.badRequest('Account has to be verified')
        )
    })
});
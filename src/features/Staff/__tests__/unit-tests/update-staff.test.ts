import { vi, it, describe, beforeEach, expect } from 'vitest';
import { StaffDatasourceImpl, StaffMapper } from '../../infrastructure';
import { prismaMock } from '../../../../tests/mocks';
import { bcryptAdapter } from '../../../../config';
import { CustomError } from '../../../../domain';
import { staffEntityMock, staffEntityUnveriviedMock, updateStaffMock } from '../mocks/staff.mock';

describe('Staff update account', () => {
    let staffDatasource: StaffDatasourceImpl;

    beforeEach(() => {
        staffDatasource = new StaffDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should update a staff member account', async() => {
        prismaMock.staff.findFirst.mockResolvedValue(staffEntityMock);
        bcryptAdapter.hash = vi.fn().mockResolvedValue(updateStaffMock.password);
        prismaMock.staff.update.mockResolvedValueOnce(updateStaffMock);
        StaffMapper.staffEntityFromObject = vi.fn().mockReturnValue(staffEntityMock);

        const result = await staffDatasource.update(updateStaffMock);

        expect(result).toEqual(staffEntityMock);
        expect(prismaMock.staff.findFirst).toHaveBeenCalledWith({ where: { id: updateStaffMock.id } });
        expect(prismaMock.staff.update).toHaveBeenCalledTimes(1);
        expect(bcryptAdapter.hash).toHaveBeenCalledWith(updateStaffMock.password);
    });

    it('should throw an error if the vet account does not exist', async() => {
        prismaMock.staff.findFirst.mockResolvedValue(null);
        expect(staffDatasource.update(updateStaffMock)).rejects.toThrow(
            CustomError.badRequest('Invalid credentials')
        )
    })

    it('should throw an error if the vet account does not exist', async() => {
        prismaMock.staff.findFirst.mockResolvedValue(staffEntityUnveriviedMock);
        expect(staffDatasource.update(updateStaffMock)).rejects.toThrow(
            CustomError.badRequest('Account has to be verified')
        )
    })
});
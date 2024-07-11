import { vi, it, describe, beforeEach, expect } from 'vitest';
import { StaffDatasourceImpl, StaffMapper } from '../../infrastructure';
import {
    prismaMock,
    staffEntityMock,
    updateStaffMock,
} from '../../../../tests/mocks';
import { bcryptAdapter } from '../../../../config';

vi.mock('../../../../config') // mock bcrypt

describe('Staff update account', () => {
    let staffDatasource: StaffDatasourceImpl;

    beforeEach(() => {
        staffDatasource = new StaffDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should update a staff member account', async() => {
     prismaMock.staff.findFirst.mockResolvedValueOnce(staffEntityMock);
        prismaMock.staff.update.mockResolvedValueOnce(staffEntityMock);
        prismaMock.staff.findFirst.mockResolvedValueOnce(staffEntityMock);
        StaffMapper.staffEntityFromObject = vi.fn().mockReturnValue(staffEntityMock);

        const result = await staffDatasource.update(updateStaffMock);

        expect(result).toEqual(staffEntityMock);
        expect(prismaMock.staff.findFirst).toHaveBeenCalledWith({ where: { id: updateStaffMock.id } });
        expect(prismaMock.staff.update).toHaveBeenCalledTimes(4); // there are four update conditions
        expect(bcryptAdapter.hash).toHaveBeenCalledWith(updateStaffMock.password);
    });
});
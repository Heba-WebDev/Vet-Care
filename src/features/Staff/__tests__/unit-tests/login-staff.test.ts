import { vi, it, describe, beforeEach, expect } from 'vitest';
import { StaffDatasourceImpl, StaffMapper } from '../../infrastructure';
import {
    prismaMock,
    staffEntityMock,
    staffLoginDtoMock
} from '../../../../tests/mocks';
import { bcryptAdapter } from '../../../../config';

vi.mock('../../../../config')

describe('Staff loggin in', () => {
    let staffDatasource: StaffDatasourceImpl;

    beforeEach(() => {
        staffDatasource = new StaffDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should login a staff member', async() => {
        prismaMock.staff.findFirst.mockResolvedValueOnce(staffEntityMock); //email found
        prismaMock.staff.findFirst.mockResolvedValueOnce(staffEntityMock); // account verified
        bcryptAdapter.compare = vi.fn().mockResolvedValue(true); // password match with pass in db
        prismaMock.staff.findFirst.mockResolvedValueOnce(staffEntityMock); // account info returned
        StaffMapper.staffEntityFromObject(staffEntityMock);
        const result = await staffDatasource.login(staffLoginDtoMock);
        expect(typeof result).toEqual('object');
        expect(prismaMock.staff.findFirst).toHaveBeenCalledWith({ where: { email: staffLoginDtoMock.email } });
        expect(bcryptAdapter.compare).toHaveBeenCalledOnce;
    });

    it('should throw an error if credentials are invalid', async () => {
    prismaMock.staff.findFirst.mockResolvedValueOnce(null);
    await expect(staffDatasource.login(staffLoginDtoMock)).rejects
        .toThrow()
  });
});
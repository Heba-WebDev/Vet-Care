import { vi, it, describe, beforeEach, expect } from 'vitest';
import { StaffDatasourceImpl, StaffMapper } from '../../infrastructure';
import { prismaMock } from '../../../../tests/mocks';
import { StaffEntity } from '../../domain/entities';
import { CustomError } from '../../../../domain';
import { staffEntityMock, staffLoginDtoMock } from '../mocks/staff.mock';


describe('Staff verification', () => {
    let staffDatasource: StaffDatasourceImpl;

    beforeEach(() => {
        staffDatasource = new StaffDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should verify a staff member', async() => {
        const staffMock =  new StaffEntity(
        staffEntityMock.id,
        staffEntityMock.name,
        staffEntityMock.job_title,
        'Staff',
        staffEntityMock.email,
        staffEntityMock.phone_number,
        false
        );
        prismaMock.staff.findFirst.mockResolvedValueOnce(staffMock); //email found
        prismaMock.staff.update.mockResolvedValueOnce(staffEntityMock); // account verified
        StaffMapper.staffEntityFromObject(staffEntityMock);
        const result = await staffDatasource.verify({ email: staffLoginDtoMock.email });
        expect(typeof result).toEqual('object');
        expect(prismaMock.staff.findFirst).toBeCalledWith({where: { email: staffMock.email }});
        expect(prismaMock.staff.update).toHaveBeenCalledOnce();
    });

    it('should throw an error if the staff member is already verified', async() => {
        prismaMock.staff.findFirst.mockResolvedValueOnce(staffEntityMock); // account not verified
        await expect(staffDatasource.verify({ email: staffEntityMock.email })).rejects
        .toThrow(CustomError.badRequest('Staff member already verified'));
    })
});
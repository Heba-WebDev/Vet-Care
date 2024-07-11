import { vi, it, beforeEach, describe, expect } from 'vitest';
import { StaffDatasourceImpl } from '../../infrastructure';
import { formerStaffMock, prismaMock, staffEntityMock } from '../../../../tests/mocks';
import { CustomError } from '../../../../domain';


describe('Staff Get-All-Former', () => {
    let staffDatasource: StaffDatasourceImpl;

    beforeEach(() => {
        staffDatasource = new StaffDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should return all former staff members'), async() => {
        prismaMock.staff.findMany.mockResolvedValueOnce(formerStaffMock);

        const result = await staffDatasource.getAllFormer({ page: 1, limit: 5 });

        expect(result).toEqual(formerStaffMock);
        expect(prismaMock.staff.findMany).toHaveBeenCalledWith({
            skip: (1 - 1) * 5,
            take: 5
        });
    };

})
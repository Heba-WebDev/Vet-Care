import { vi, it, beforeEach, describe, expect } from 'vitest';
import { StaffDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../tests/mocks';
import { CustomError } from '../../../../domain';
import { staffEntityMock } from '../mocks/staff.mock';


describe('Staff Get-All-Current', () => {
    let staffDatasource: StaffDatasourceImpl;

    beforeEach(() => {
        staffDatasource = new StaffDatasourceImpl(prismaMock);
        vi.clearAllMocks();
    });

    it('should return all current staff members'), async() => {
        prismaMock.staff.findMany.mockResolvedValueOnce(staffEntityMock);

        const result = await staffDatasource.getAll({ page: 1, limit: 5 });

        expect(result).toEqual(staffEntityMock);
        expect(prismaMock.staff.findMany).toHaveBeenCalledWith({
            skip: (1 - 1) * 5,
            take: 5
        });
    };

    it('should return an empty array if no staff member was found', async() => {
        prismaMock.staff.findMany.mockResolvedValueOnce([]);
        const result = await staffDatasource.getAll({ page: 1, limit: 5 });
        expect(result).toStrictEqual([]);
    });

    it('should throw an internal server error for unexpected errors', async() => {
        prismaMock.staff.findMany.mockRejectedValueOnce(new Error('Unexpected Error'));
        await expect(staffDatasource.getAll({ page: 1, limit: 5 })).rejects.toThrow(CustomError.internalServerError());
    });
})
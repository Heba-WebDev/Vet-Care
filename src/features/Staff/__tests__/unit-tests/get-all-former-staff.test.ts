import { PrismaClient } from '@prisma/client';
import { vi, it, beforeEach, describe, expect } from 'vitest';
import { StaffDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { formerStaffMock } from '../mocks/staff.mock';

describe('Staff Get-All-Former', () => {
  let staffDatasource: StaffDatasourceImpl;

  beforeEach(() => {
    staffDatasource = new StaffDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should return all former staff members', async () => {
    prismaMock.formerStaff.findMany?.mockResolvedValueOnce(formerStaffMock);

    const result = await staffDatasource.getAllFormer({ page: 1, limit: 5 });

    expect(result).toEqual(formerStaffMock);
    expect(prismaMock.formerStaff.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 5,
    });
  });

  //   it('should handle errors properly', async () => {
  //     prismaMock.formerStaff.findMany?.mockRejectedValueOnce(new Error('Database error'));

  //     await expect(staffDatasource.getAllFormer({ page: 1, limit: 5 })).rejects.toThrow('Internal Server Error');
  //   });
});

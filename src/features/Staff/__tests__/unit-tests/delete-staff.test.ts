import { PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { StaffDatasourceImpl, StaffMapper } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { CustomError } from '../../../../domain';
import { formerStaffMock, staffEntityMock } from '../mocks/staff.mock';

describe('Staff account deletion', () => {
  let staffDatasource: StaffDatasourceImpl;

  beforeEach(() => {
    staffDatasource = new StaffDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should delete a staff member', async () => {
    const member = {
      id: staffEntityMock.id,
      exit_reason: 'Contract ended',
    };
    prismaMock.staff.findFirst?.mockResolvedValue(staffEntityMock);
    prismaMock.formerStaff.create?.mockResolvedValue(formerStaffMock);
    prismaMock.staff.delete?.mockResolvedValue(formerStaffMock);
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    StaffMapper.staffEntityFromObject(staffEntityMock);
    const result = await staffDatasource.delete(member);
    expect(typeof result).toEqual('object');
    expect(prismaMock.staff.delete).toHaveBeenCalledOnce();
    expect(prismaMock.formerStaff.create).toHaveBeenCalledOnce();
  });

  it('should throw an error if staff id is invalid', async () => {
    prismaMock.staff.findFirst?.mockResolvedValue(null);
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    await expect(staffDatasource.delete({ id: 'fake-id', exit_reason: '' })).rejects.toThrow(
      CustomError.badRequest('Invalid credentials'),
    );
  });
});

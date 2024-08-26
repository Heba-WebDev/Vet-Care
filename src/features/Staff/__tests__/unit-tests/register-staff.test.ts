import { PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { StaffDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { StaffMapper } from '../../infrastructure';
import { CustomError } from '../../../../domain';
import { staffEntityMock, staffRegisterDtoMock } from '../mocks/staff.mock';

describe('Staff registration', () => {
    let staffDatasource: StaffDatasourceImpl;

    beforeEach(() => {
        staffDatasource = new StaffDatasourceImpl(prismaMock as unknown as PrismaClient);
        vi.clearAllMocks();
    });

    it('should register a new staff member', async() => {
        prismaMock.staff.findFirst
        ?.mockResolvedValueOnce(null) // No existing email
        .mockResolvedValueOnce(null); // No existing phone number
        prismaMock.jobs.findFirst?.mockResolvedValue({title: staffRegisterDtoMock.job_title })
        prismaMock.staff.create?.mockResolvedValue(staffEntityMock);
        StaffMapper.staffEntityFromObject(staffEntityMock);

        const result = await staffDatasource.register(staffRegisterDtoMock);
        expect(typeof result).toEqual('object');
        expect(prismaMock.staff.findFirst).toHaveBeenCalledWith({ where: { email: staffRegisterDtoMock.email } });
        expect(prismaMock.jobs.findFirst).toHaveBeenCalledWith({ where: { title: staffRegisterDtoMock.job_title } });
    });

    it('should throw an error if email already exists', async() => {
        prismaMock.staff.findFirst?.mockResolvedValueOnce(staffEntityMock);
        await expect(staffDatasource.register(staffRegisterDtoMock)).rejects
        .toThrow(CustomError.badRequest('Provide a different email'))
    });

    it('should throw an error if phone number already exists', async() => {
        prismaMock.staff.findFirst
        ?.mockResolvedValueOnce(null)
        .mockResolvedValueOnce(staffEntityMock);
        await expect(staffDatasource.register(staffRegisterDtoMock)).rejects
        .toThrow(CustomError.badRequest('Provide a different phone number'))
    });

    it('should throw an error if job title does not exist', async() => {
        const dtoMock = {
        name: staffRegisterDtoMock.name,
        email: 'email@example.com',
        password: staffRegisterDtoMock.password,
        phone_number: '1234567890',
        job_title: 'Invalid Job'
        }
        prismaMock.staff.findFirst?.mockResolvedValueOnce(null);
        prismaMock.jobs.findFirst?.mockResolvedValueOnce(null); // invalid job
        await expect(staffDatasource.register(dtoMock)).rejects
        .toThrow(CustomError.badRequest('Provide a valid job title [Receptionist, HR, or Manager]'))
    });

});
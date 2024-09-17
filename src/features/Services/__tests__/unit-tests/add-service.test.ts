import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ServicesDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import { serviceMock, servicesAddDtoMock } from '../mocks/services.mock';
import { CustomError } from '../../../../domain';

describe('Add a new services', () => {
  let datasource: ServicesDatasourceImpl;
  beforeEach(() => {
    datasource = new ServicesDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully add a new service', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.services.findFirst?.mockReturnValueOnce(null);
    prismaMock.services.create?.mockReturnValueOnce(serviceMock);
    const result = await datasource.add(servicesAddDtoMock);
    expect(typeof result).toBe('object');
    expect(result?.active).toEqual(true);
    expect(result?.type).toEqual(servicesAddDtoMock.type);
  });

  it('should throw an error if the service already exists', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.services.findFirst?.mockReturnValueOnce(serviceMock);
    await expect(datasource.add({ type: 'exists', price: 75 })).rejects.toThrow(
      CustomError.badRequest('Service already exists'),
    );
  });
});

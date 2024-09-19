import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ServicesDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import { serviceMock, serviceInactiveMock } from '../mocks/services.mock';
import { CustomError } from '../../../../domain';

describe('Deactivate a service', () => {
  let datasource: ServicesDatasourceImpl;
  beforeEach(() => {
    datasource = new ServicesDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully deactivate a service', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.services.findFirst?.mockReturnValueOnce(serviceMock);
    prismaMock.services.update?.mockReturnValueOnce(serviceInactiveMock);
    const result = await datasource.deactivate({ id: 1 });
    expect(typeof result).toBe('object');
    expect(result?.active).toEqual(false);
  });

  it('should throw an error if the service already deactivated', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.services.findFirst?.mockReturnValueOnce(serviceInactiveMock);
    await expect(datasource.deactivate({ id: 1 })).rejects.toThrow(
      CustomError.badRequest('Service already deactivated'),
    );
  });
});

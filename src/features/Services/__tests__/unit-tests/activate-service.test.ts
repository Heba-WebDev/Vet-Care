import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ServicesDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import { serviceMock, serviceInactiveMock } from '../mocks/services.mock';
import { CustomError } from '../../../../domain';

describe('Activate a service', () => {
  let datasource: ServicesDatasourceImpl;
  beforeEach(() => {
    datasource = new ServicesDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully activate a service', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.services.findFirst?.mockReturnValueOnce(serviceInactiveMock);
    prismaMock.services.update?.mockReturnValueOnce(serviceMock);
    const result = await datasource.activate({ id: 1 });
    expect(typeof result).toBe('object');
    expect(result?.active).toEqual(true);
  });

  it('should throw an error if the service already activated', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.services.findFirst?.mockReturnValueOnce(serviceMock);
    await expect(datasource.activate({ id: 1 })).rejects.toThrow(
      CustomError.badRequest('Service already activated'),
    );
  });
});

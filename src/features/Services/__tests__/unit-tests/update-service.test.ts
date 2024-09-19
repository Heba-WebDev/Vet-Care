import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ServicesDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import { serviceMock, serviceUpdateMock } from '../mocks/services.mock';
import { CustomError } from '../../../../domain';

describe('Update a service', () => {
  let datasource: ServicesDatasourceImpl;
  beforeEach(() => {
    datasource = new ServicesDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully update a service', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.services.findFirst?.mockReturnValueOnce(serviceMock);
    prismaMock.services.update?.mockReturnValueOnce(serviceUpdateMock);
    const result = await datasource.update({
      id: serviceUpdateMock.id,
      type: serviceUpdateMock.type,
    });
    expect(typeof result).toBe('object');
    expect(result?.type).toEqual(serviceUpdateMock.type);
  });

  it('should throw an error if the service does not exist', async () => {
    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback(prismaMock);
    });
    prismaMock.services.findFirst?.mockReturnValueOnce(null);
    await expect(datasource.update({ id: 1, type: 'fake-type' })).rejects.toThrow(
      CustomError.badRequest('No serivce found'),
    );
  });
});

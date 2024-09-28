import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ServicesDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { PrismaClient } from '@prisma/client';
import { serviceMock } from '../mocks/services.mock';
import { CustomError } from '../../../../domain';

describe('get all services', () => {
  let datasource: ServicesDatasourceImpl;
  beforeEach(() => {
    datasource = new ServicesDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully return all services', async () => {
    prismaMock.$transaction.mockResolvedValue([[serviceMock], 1]);
    const result = await datasource.getAll({ page: 1, limit: 1 });
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    expect(typeof result).toBe('object');
    expect(result.pagination.currentPage).toEqual(1);
    expect(result.pagination.itemsPerPage).toEqual(1);
  });

  it('should handle internal server errors', async () => {
    prismaMock.$transaction.mockRejectedValueOnce(new Error('Database error'));
    expect(datasource.getAll({ page: 1, limit: 1 })).rejects.toThrow(
      CustomError.internalServerError(),
    );
  });
});

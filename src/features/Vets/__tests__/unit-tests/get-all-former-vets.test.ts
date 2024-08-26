import { PrismaClient } from '@prisma/client';
import { vi, it, beforeEach, describe, expect } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { VetsDatasourceImpl } from '../../infrastructure';
import { formerVetMock } from '../mocks/vet.mock';

describe('Vets Get-All-Current', () => {
  let vetsDatasource: VetsDatasourceImpl;

  beforeEach(() => {
    vetsDatasource = new VetsDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should return all former vets members', async () => {
    const formerVets = [formerVetMock];
    prismaMock.formerVets.findMany?.mockReturnValueOnce(formerVets);
    const result = await vetsDatasource.GetAllFormer({ page: 1, limit: 5 });
    expect(result).toEqual(formerVets);
    expect(prismaMock.formerVets.findMany).toHaveBeenCalledOnce();
  });

  it('should return an empty array if no former vet member was found', async () => {
    prismaMock.formerVets.findMany?.mockResolvedValueOnce([]);
    const result = await vetsDatasource.GetAllFormer({ page: 1, limit: 5 });
    expect(result).toEqual([]);
  });
});

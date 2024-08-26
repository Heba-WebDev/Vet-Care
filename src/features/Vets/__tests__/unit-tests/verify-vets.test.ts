import { PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { VetMapper, VetsDatasourceImpl } from '../../infrastructure';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { vetEntityUnveriviedMock, vetEntityVerifiedMock } from '../mocks/vet.mock';
import { CustomError } from '../../../../domain';

describe('Vet verification', () => {
  let vetDatasource: VetsDatasourceImpl;

  beforeEach(() => {
    vetDatasource = new VetsDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should verify a new vet member', async () => {
    prismaMock.veterinarians.findFirst?.mockResolvedValueOnce(vetEntityUnveriviedMock); //email found
    prismaMock.veterinarians.update?.mockResolvedValueOnce(vetEntityVerifiedMock); // account verified
    VetMapper.vetEntityFromObject(vetEntityVerifiedMock);
    const result = await vetDatasource.verify({ email: vetEntityUnveriviedMock.email });
    expect(typeof result).toEqual('object');
    expect(prismaMock.veterinarians.findFirst).toBeCalledWith({
      where: { email: vetEntityUnveriviedMock.email },
    });
    expect(prismaMock.veterinarians.update).toHaveBeenCalledOnce();
  });

  it('should throw an error if the vet member is already verified', async () => {
    prismaMock.veterinarians.findFirst?.mockResolvedValueOnce(vetEntityVerifiedMock); // account is verified
    await expect(vetDatasource.verify({ email: vetEntityVerifiedMock.email })).rejects.toThrow(
      CustomError.badRequest('Vet member already verified'),
    );
  });
});

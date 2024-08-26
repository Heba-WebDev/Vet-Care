import { PrismaClient } from '@prisma/client';
import { vi, it, describe, beforeEach, expect } from 'vitest';
import { prismaMock } from '../../../../__tests__/__mocks__';
import { bcryptAdapter } from '../../../../config';
import { VetMapper, VetsDatasourceImpl } from '../../infrastructure';
import {
  vetEntityUnveriviedMock,
  vetEntityVerifiedMock,
  vetLoginDtoMock,
  vetRegisterDtoMock,
} from '../mocks/vet.mock';
import { CustomError } from '../../../../domain';

describe('Vet logging in', () => {
  let vetsDatasource: VetsDatasourceImpl;

  beforeEach(() => {
    vetsDatasource = new VetsDatasourceImpl(prismaMock as unknown as PrismaClient);
    vi.clearAllMocks();
  });

  it('should successfully login a vet member', async () => {
    prismaMock.veterinarians.findFirst?.mockResolvedValue(vetEntityVerifiedMock); //email found
    prismaMock.veterinarians.findFirst?.mockResolvedValue(vetEntityVerifiedMock); // account verified
    bcryptAdapter.compare = vi.fn().mockResolvedValue(true); // password match with pass in db
    prismaMock.veterinarians.findFirst?.mockResolvedValue(vetEntityVerifiedMock); // account info returned
    VetMapper.vetEntityFromObject(vetEntityVerifiedMock);
    const result = await vetsDatasource.login(vetLoginDtoMock);
    expect(typeof result).toEqual('object');
    expect(prismaMock.veterinarians.findFirst).toHaveBeenCalledWith({
      where: { email: vetRegisterDtoMock.email },
    });
    expect(bcryptAdapter.compare).toHaveBeenCalledOnce();
  });

  it('should throw an error if the vet member is unverified', async () => {
    prismaMock.veterinarians.findFirst?.mockResolvedValue(vetEntityUnveriviedMock); //email found
    prismaMock.veterinarians.findFirst?.mockResolvedValue(vetEntityUnveriviedMock); // account verified
    await expect(vetsDatasource.login(vetLoginDtoMock)).rejects.toThrow(
      CustomError.badRequest('Account has to be verified'),
    );
  });

  it('should throw an error if email does not exist', async () => {
    prismaMock.veterinarians.findFirst?.mockResolvedValue(null);
    await expect(vetsDatasource.login(vetLoginDtoMock)).rejects.toThrow(
      CustomError.badRequest('Invalid credentials'),
    );
  });

  it('should throw an error if password is invalid', async () => {
    prismaMock.veterinarians.findFirst?.mockResolvedValue(vetEntityVerifiedMock);
    bcryptAdapter.compare = vi.fn().mockResolvedValue(false);
    await expect(
      vetsDatasource.login({ email: vetEntityVerifiedMock.email, password: 'fake-password' }),
    ).rejects.toThrow(CustomError.badRequest('Invalid credentials'));
  });
});

import { PrismaClient } from '@prisma/client';
import { vi } from 'vitest';
import { MockInstance } from 'vitest';

type MockPrismaClient = {
  [K in keyof PrismaClient]: {
    [M in keyof PrismaClient[K]]?: MockInstance;
  };
} & {
  $transaction: MockInstance;
};

export const prismaMock: MockPrismaClient = {
  staff: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  jobs: {
    findFirst: vi.fn(),
  },
  veterinarians: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  owners: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    count: vi.fn(),
    update: vi.fn(),
  },
  pets: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  animals: {
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  permissions: {},
  appointments: {},
  services: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  transactions: {},
  notifications: {},
  publicHolidays: {},
  formerStaff: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
  formerVets: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
  $on: vi.fn(),
  $connect: vi.fn(),
  $disconnect: vi.fn(),
  $use: vi.fn(),
  $executeRaw: vi.fn(),
  $executeRawUnsafe: vi.fn(),
  $queryRaw: vi.fn(),
  $queryRawUnsafe: vi.fn(),
  $transaction: vi.fn(),
  $extends: {},
};

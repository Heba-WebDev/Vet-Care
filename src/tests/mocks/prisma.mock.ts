import { vi } from "vitest";


export const prismaMock = {
    staff: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
    jobs: {
        findFirst: vi.fn()
    },
    veterinarians: {},
    owners: {},
    pets: {},
    animals: {},
    permissions: {},
    appointments: {},
    services: {},
    transactions: {},
    notifications: {},
    publicHolidays: {},
    formerStaff: {
        create: vi.fn(),
        findMany: vi.fn(),
    },
    formerVets: {},
    // $on: vi.fn(),
    // $connect: vi.fn(),
    // $disconnect: vi.fn(),
    // $use: vi.fn(),
    // $executeRaw: vi.fn(),
    // $executeRawUnsafe: vi.fn(),
    // $queryRaw: vi.fn(),
    // $queryRawUnsafe: vi.fn(),
    // $transaction: vi.fn(),
    // $extends: vi.fn(),
}
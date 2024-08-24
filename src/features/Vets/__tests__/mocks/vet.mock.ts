import { LoginVetsDto, RegisterVetsDto, UpdateVetsDto } from '../../domain';
import { VetEntity, FormerVetEntity } from '../../domain/entities';

export const vetRegisterDtoMock: RegisterVetsDto = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone_number: '1234567890',
    job_title: 'Veterinarian',
};

export const vetLoginDtoMock: LoginVetsDto = {
    email: 'john.doe@example.com',
    password: 'password123',
};

export const vetEntityVerifiedMock = new VetEntity(
    '1',
    vetRegisterDtoMock.name,
    vetRegisterDtoMock.job_title,
    'Staff',
    vetRegisterDtoMock.email,
    vetRegisterDtoMock.phone_number,
    true,
);

export const vetEntityUnveriviedMock = new VetEntity(
    '1',
    vetRegisterDtoMock.name,
    vetRegisterDtoMock.job_title,
    'Staff',
    vetRegisterDtoMock.email,
    vetRegisterDtoMock.phone_number,
    false,
);

export const vetUpdateDtoMock = {
    id: vetEntityVerifiedMock.id,
    email: vetEntityVerifiedMock.email,
    password: vetRegisterDtoMock.password,
    phone_number: vetEntityVerifiedMock.phone_number,
};

export const formerVetMock = new FormerVetEntity(
    vetEntityVerifiedMock.id,
    vetEntityVerifiedMock.name,
    vetEntityVerifiedMock.email,
    vetEntityVerifiedMock.phone_number,
    vetEntityVerifiedMock.job_title,
    new Date(),
    'Contract ended',
);

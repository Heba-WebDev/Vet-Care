import { RegisterVetsDto } from "../../domain";
import { VetEntity } from "../../domain/entities";


export const vetRegisterDtoMock: RegisterVetsDto = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone_number: '1234567890',
    job_title: 'Veterinarian'
}


export const vetEntityVerifiedMock = new VetEntity(
    '1',
    vetRegisterDtoMock.name,
    vetRegisterDtoMock.job_title,
    'Staff',
    vetRegisterDtoMock.email,
    vetRegisterDtoMock.phone_number,
    true
);

export const vetEntityUnveriviedMock = new VetEntity(
    '1',
    vetRegisterDtoMock.name,
    vetRegisterDtoMock.job_title,
    'Staff',
    vetRegisterDtoMock.email,
    vetRegisterDtoMock.phone_number,
    false
);

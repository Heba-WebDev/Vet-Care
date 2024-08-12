import { RegisterStaffDto, LoginStaffDto } from "../..";
import { StaffEntity } from "../../domain/entities";

export const staffRegisterDtoMock: RegisterStaffDto = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone_number: '1234567890',
    job_title: 'HR'
}

export const staffLoginDtoMock: LoginStaffDto = {
    email: 'john.doe@example.com',
    password: 'password123',
}

export const staffEntityMock = new StaffEntity(
    '1',
    staffRegisterDtoMock.name,
    staffRegisterDtoMock.job_title,
    'Staff',
    staffRegisterDtoMock.email,
    staffRegisterDtoMock.phone_number,
    true
);

export const staffEntityUnveriviedMock = new StaffEntity(
    '1',
    staffRegisterDtoMock.name,
    staffRegisterDtoMock.job_title,
    'Staff',
    staffRegisterDtoMock.email,
    staffRegisterDtoMock.phone_number,
    false
);

export const formerStaffMock = {
    id: staffEntityMock.id,
    name: staffEntityMock.name,
    email: staffEntityMock.email,
    phone_number: staffEntityMock.phone_number,
    job_title: staffEntityMock.job_title,
    exit_date: Date,
}

export const updateStaffMock = {
    id: staffEntityMock.id,
    name: staffEntityMock.name,
    email: staffEntityMock.email,
    password: staffRegisterDtoMock.password,
    phone_number: staffEntityMock.phone_number,
}
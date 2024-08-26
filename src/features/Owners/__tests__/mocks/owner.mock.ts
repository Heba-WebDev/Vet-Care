import { RegisterOwnerDto, GetAllOwnersDto, OwnerEntity } from '../../domain';

export const registerOwnerDtoMock: RegisterOwnerDto = {
  name: 'John',
  email: 'john@example.com',
  phone_number: '068226266',
};

export const ownerMock = {
  id: 'bd9f9bbc-b25a-4b90-a60a-ef7ba589a2b2',
  name: registerOwnerDtoMock.name,
  email: registerOwnerDtoMock.email,
  phone_number: registerOwnerDtoMock.phone_number,
};

export const secondOwnerMock = {
  id: 'bd9f9bbc-b25a-4b90-a60a-ef7ba589a2b3',
  name: 'Jack',
  email: 'jack@example.com',
  phone_number: '0434527987',
};

export const updatedOwnerMock = {
  id: 'bd9f9bbc-b25a-4b90-a60a-ef7ba589a2b2',
  name: registerOwnerDtoMock.name,
  email: 'updated@example.com',
  phone_number: registerOwnerDtoMock.phone_number,
};

export const getAllOwnersDtoMock: GetAllOwnersDto = {
  id: ownerMock.id,
  name: 'John',
  email: 'john@example.com',
  phone_number: '068226266',
};

export const AllOwnersMock: OwnerEntity[] = [ownerMock, secondOwnerMock];

export const ownerMapped = {
  name: registerOwnerDtoMock.name,
  email: registerOwnerDtoMock.email,
  phone_number: registerOwnerDtoMock.phone_number,
};

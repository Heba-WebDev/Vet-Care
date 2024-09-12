import { Gender } from '@prisma/client';
import { PetEntity, RegisterPetDto } from '../../domain';
import { ownerMock } from '../../../Owners/__tests__/mocks/owner.mock';

export const petDtoMock: RegisterPetDto = {
  name: 'Negrito',
  gender: Gender.Male,
  animal_id: 1,
  owner_id: ownerMock.id,
};

export const petMock: PetEntity = {
  name: 'Negrito',
  gender: Gender.Male,
  animal_id: 1,
  owner_id: ownerMock.id,
};

export const petUpdateMock: PetEntity = {
  name: 'Loui',
  gender: Gender.Male,
  animal_id: 1,
  owner_id: ownerMock.id,
};

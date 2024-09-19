import { Decimal } from '@prisma/client/runtime/library';
import { AddServiceDto, ServiceEntity } from '../../domain';

export const servicesAddDtoMock: AddServiceDto = {
  type: 'Immunization',
  price: 75,
};

export const serviceMock: ServiceEntity = {
  id: 1,
  type: 'Immunization',
  price: new Decimal(75),
  active: true,
};

export const serviceInactiveMock: ServiceEntity = {
  id: 1,
  type: 'Immunization',
  price: new Decimal(75),
  active: false,
};

export const serviceUpdateMock: ServiceEntity = {
  id: 1,
  type: 'Dental Care',
  price: new Decimal(75),
  active: false,
};

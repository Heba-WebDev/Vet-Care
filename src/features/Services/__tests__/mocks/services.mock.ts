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

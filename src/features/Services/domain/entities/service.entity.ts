import { Decimal } from '@prisma/client/runtime/library';

export class ServiceEntity {
  constructor(
    public id: number,
    public type: string,
    public price: Decimal,
    public active: boolean,
  ) {}
}

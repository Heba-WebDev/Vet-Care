export class AnimalEntity {
  constructor(
    public type: string,
    public isSupported: boolean,
    public isDeleted: boolean,
  ) {}
}

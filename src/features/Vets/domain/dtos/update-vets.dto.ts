import { VetsInputValidation } from '../../infrastructure';

export class UpdateVetsDto {
  private constructor(
    public id: string,
    public email: string,
    public password: string,
    public phone_number: string,
  ) {}

  static upate(object: { [key: string]: string }): [string?, UpdateVetsDto?] {
    const { id, email, password, phone_number } = object;
    if (!email && !password && !phone_number)
      return ['Provide an email, a password or a phone number to update', undefined];
    const vetsDto = new UpdateVetsDto(id, email, password, phone_number);
    const err = new VetsInputValidation().update(vetsDto);
    if (err) return [err, undefined];
    return [undefined, vetsDto];
  }
}

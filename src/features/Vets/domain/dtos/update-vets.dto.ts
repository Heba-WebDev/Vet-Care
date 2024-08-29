import { VetsInputValidation } from '../../infrastructure';

export class UpdateVetsDto {
  private constructor(
    public readonly id: string,
    public readonly email?: string,
    public readonly password?: string,
    public readonly phone_number?: string,
  ) {}

  static upate(id: string, object: { [key: string]: string }): [string?, UpdateVetsDto?] {
    const { email, password, phone_number } = object;
    if (!email && !password && !phone_number)
      return ['Provide an email, a password or a phone number to update', undefined];
    const vetsDto = new UpdateVetsDto(id, email, password, phone_number);
    const err = new VetsInputValidation().update(vetsDto);
    if (err) return [err, undefined];
    return [undefined, vetsDto];
  }
}

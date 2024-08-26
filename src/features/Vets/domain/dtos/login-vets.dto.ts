import { VetsInputValidation } from '../../infrastructure';

export class LoginVetsDto {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  static login(object: { [key: string]: string }): [string?, LoginVetsDto?] {
    const { email, password } = object;
    const loginDto = new LoginVetsDto(email, password);
    const error = new VetsInputValidation().login(loginDto);
    if (error) return [error, undefined];
    return [undefined, loginDto];
  }
}

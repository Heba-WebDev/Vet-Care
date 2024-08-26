import { VetsInputValidation } from '../../infrastructure';

export class VerifyVetDto {
  private constructor(public email: string) {}

  static verify(object: { [key: string]: string }): [string?, VerifyVetDto?] {
    const { email } = object;
    const vetDto = new VerifyVetDto(email);
    const error = new VetsInputValidation().verify(vetDto);
    if (error) return [error, undefined];
    return [undefined, vetDto];
  }
}

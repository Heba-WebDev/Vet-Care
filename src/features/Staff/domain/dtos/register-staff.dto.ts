import { StaffInputValidation } from '../../infrastructure/validation';

export class RegisterStaffDto {
  private constructor(
    public name: string,
    public job_title: string,
    public email: string,
    public password: string,
    public phone_number: string,
  ) {}

  static register(object: { [key: string]: string }): [string?, RegisterStaffDto?] {
    const { name, job_title, email, password, phone_number } = object;
    const staffDto = new RegisterStaffDto(name, job_title, email, password, phone_number);
    const err = new StaffInputValidation().register(staffDto);
    if (err) return [err, undefined];
    return [undefined, staffDto];
  }
}

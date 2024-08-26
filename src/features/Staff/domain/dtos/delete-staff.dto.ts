import { StaffInputValidation } from '../../infrastructure/validation';

export class DeleteStaffDto {
  private constructor(
    public id: string,
    public exit_reason: string,
  ) {}

  static delete(object: { [key: string]: string }): [string?, DeleteStaffDto?] {
    const { id, exit_reason } = object;
    const staffDto = new DeleteStaffDto(id, exit_reason);
    const err = new StaffInputValidation().delete(staffDto);
    if (err) return [err, undefined];
    return [undefined, staffDto];
  }
}

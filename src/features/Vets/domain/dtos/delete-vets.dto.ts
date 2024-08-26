import { VetsInputValidation } from '../../infrastructure';

export class DeleteVetsDto {
  private constructor(
    public id: string,
    public exit_reason: string,
  ) {}

  static delete(object: { [key: string]: string }): [string?, DeleteVetsDto?] {
    const { id, exit_reason } = object;
    const deleteDto = new DeleteVetsDto(id, exit_reason);
    const error = new VetsInputValidation().delete(deleteDto);
    if (error) return [error, undefined];
    return [undefined, deleteDto];
  }
}

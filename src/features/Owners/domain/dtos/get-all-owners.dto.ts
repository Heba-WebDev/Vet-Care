import { ParsedQs } from 'qs';

export class GetAllOwnersDto {
  private constructor(
    public readonly id?: string | null,
    public readonly name?: string | null,
    public readonly email?: string | null,
    public readonly phone_number?: string | null,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}

  static getAll(object: ParsedQs): [string?, GetAllOwnersDto?] {
    const page = parseInt(object.page as string) || 1;
    const limit = parseInt(object.limit as string) || 15;
    const { id, name, email, phone_number } = object;
    const getOwnerDto = new GetAllOwnersDto(
      id as string,
      name as string,
      email as string,
      phone_number as string,
      page,
      limit,
    );
    return [undefined, getOwnerDto];
  }
}

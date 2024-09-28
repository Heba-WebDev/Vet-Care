import { ParsedQs } from 'qs';
import { ServicesInputValidation } from '../../infrastructure/validation';

export class GetAllServicesDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly active?: boolean | null,
  ) {}

  static get(object: ParsedQs): [string?, GetAllServicesDto?] {
    const page = parseInt(object.page as string) || 1;
    const limit = parseInt(object.limit as string) || 5;
    if (object.active && object.active !== 'true' && object.active !== 'false')
      return ['Active must be true or false', undefined];
    const active = object.active === 'true' ? true : false;
    const dto = new GetAllServicesDto(page, limit, object.active ? active : null);
    const error = new ServicesInputValidation().getAll(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}

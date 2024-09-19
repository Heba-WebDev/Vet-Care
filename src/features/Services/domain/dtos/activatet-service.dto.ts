export class ActivateServiceDto {
  private constructor(public id: number) {}

  static activate(id: string): [string?, ActivateServiceDto?] {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return ['Invalid id', undefined];
    const dto = new ActivateServiceDto(parsedId);
    return [undefined, dto];
  }
}

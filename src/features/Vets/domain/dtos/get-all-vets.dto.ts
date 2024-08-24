import { ParsedQs } from 'qs';
import { VetsInputValidation } from '../../infrastructure';

export class GetAllVetsDto {
    constructor(
        public readonly page?: number,
        public readonly limit?: number,
    ) {}

    static get(object: ParsedQs): [string?, GetAllVetsDto?] {
        const page = parseInt(object.page as string) || 1;
        const limit = parseInt(object.limit as string) || 15;
        const vetsDto = new GetAllVetsDto(page, limit);
        const err = new VetsInputValidation().getAll(vetsDto);
        if (err) return [err, undefined];
        return [undefined, vetsDto];
    }
}

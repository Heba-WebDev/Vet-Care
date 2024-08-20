import { ParsedQs } from 'qs';

export class GetAllOwnersDto {
    private constructor(
        public id: string | null,
        public name: string | null,
        public email: string | null,
        public phone_number: string | null,
    ) {}

    static getAll(object: ParsedQs): [string?, GetAllOwnersDto?] {
        const { id, name, email, phone_number } = object;
        const getOwnerDto = new GetAllOwnersDto(
            id as string, name as string, email as string, phone_number as string
        );
        return [undefined, getOwnerDto]
    }
}
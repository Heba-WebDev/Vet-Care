import { OwnersInputValidation } from '../../infrastructure';

export class UpdateOwnerDto {
    private constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly email?: string,
        public readonly phone_number?: string,
    ) {}

    static update(
        id: string,
        object: { [key: string]: string },
    ): [string?, UpdateOwnerDto?] {
        const { name, email, phone_number } = object;
        if (!name && !email && !phone_number) {
            const error =
                'Please provide a name, an email or a phone number to update';
            return [error, undefined];
        }
        const ownerDto = new UpdateOwnerDto(id, name, email, phone_number);
        const error = new OwnersInputValidation().update(ownerDto);
        if (error) return [error, undefined];
        return [undefined, ownerDto];
    }
}

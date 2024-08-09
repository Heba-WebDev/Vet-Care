
export class VerifyVetDto {
    private constructor(
        public email: string
    ) {}

    static verify(object: {[key: string]: any}): [string?, VerifyVetDto?] {
       const { email } = object;
       const vetDto = new VerifyVetDto(email);
       return [undefined, vetDto];
    }
}
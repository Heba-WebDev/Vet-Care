

export class VetEntity {
    constructor(
        public id: string,
        public name: string,
        public job_title: string,
        public permission_type: string,
        public email: string,
        public phone_number: string,
        public verified: boolean
    ) {}
}
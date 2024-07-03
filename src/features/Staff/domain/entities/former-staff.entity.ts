

export class FormerStaffEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone_number: string,
        public job_title: string,
        public exit_date: Date,
        public exit_reason: string,
    ) {}
}
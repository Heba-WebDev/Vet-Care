
export class AddWorkingHoursDto {
    private constructor(
        public vet_id: string,
        public day_id : number,
        public start_time: string,
        public end_time: string,
    ) {}

    static add(vet_id: string, object: {[key: string]: string | number}): [string?, AddWorkingHoursDto?] {
        const { day_id, start_time, end_time } = object;
        const dto = new AddWorkingHoursDto(vet_id, day_id as number, start_time as string, end_time as string);
        return [undefined, dto];
    }
}
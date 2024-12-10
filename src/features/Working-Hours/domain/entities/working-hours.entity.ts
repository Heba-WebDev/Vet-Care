export class WorkingHoursEntity {
  constructor(
    public id: string,
    public vet_id: string,
    public day_id: number,
    public start_time: string,
    public end_time: string,
    public break_start_time: string,
    public break_end_time: string,
  ) {}
}

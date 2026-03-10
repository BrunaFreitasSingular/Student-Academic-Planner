export class Assessment {
  constructor(
    public id: number | null,
    public subjectId: number,
    public title: string,
    public grade: number,
    public weight: number
  ) {}
}
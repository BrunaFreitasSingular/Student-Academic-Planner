export class Subject {
  constructor(
    public id: number | null,
    public name: string,
    public credits: number,
    public year: number,
    public semester: number,
    public status: string
  ) {}

  isValidCredits() {
    return [2, 4, 6].includes(this.credits);
  }

  isValidSemester() {
    return [1, 2].includes(this.semester);
  }
}
export class Progress {
  constructor(
    public readonly id: number | null,
    public subjectId: number,
    public completedLessons: number,
    public totalLessons: number
  ) {}

  // mostra o percentual de provas concluidas dessa cadeira em relacao a todas
  get percentage(): number {
    if (this.totalLessons === 0) return 0;
    return (this.completedLessons / this.totalLessons) * 100;
  }

  updateLessons(completed: number, total: number) {
    if (completed > total) {
      throw new Error("Completed lessons cannot exceed total lessons");
    }

    this.completedLessons = completed;
    this.totalLessons = total;
  }
}
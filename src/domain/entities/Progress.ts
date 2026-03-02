import { Subject  } from "./Subject.ts";

export class Progress {
  constructor(
      private subjects: Subject[]
  ){}

  // retorna o total de creditos concluidos
  get completedCredits(): number {
    return this.subjects
      .filter(s => s.status === "CONCLUIDA")
      .reduce((sum, s) => sum + s.credits, 0);
  }

  // passando o total como paramento pro progress nao depender da entidade Course
  calculatePercentage(totalCredits: number): number {
    if (totalCredits === 0) return 0;
    return (this.completedCredits / totalCredits) * 100;
  }
}
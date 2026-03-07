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

  get subjectsTotalInProgress(): number {
    return this.subjects
      .filter(s => s.status === "EM ANDAMENTO").length;
  }

  get subjectsTotalPlanned(): number {
    return this.subjects
      .filter(s => s.status === "PLANEJADA").length;
  }

  // total de disciplinas cadastradas
  get SubjectsTotal():number {
    return this.subjects.length;
  }

  // passando o total como paramento pro progress nao depender da entidade Course
  calculatePercentage(credits: number, totalCredits: number): number {
    if (totalCredits === 0) return 0;
    return (credits / totalCredits) * 100;
  }
}
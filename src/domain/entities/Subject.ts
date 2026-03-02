import { Assessment } from "./Assessment.ts";

export class Subject {
  constructor(
    public id: number | null,
    public name: string,
    public credits: number,
    public year: number,
    public semester: number,
    public status: string,
    public id_user: number,
    public totalLessons: number,
    public assessments: Assessment[] = []
  ) {}

  isValidCredits() {
    return [2, 4, 6].includes(this.credits);
  }

  isValidSemester() {
    return [1, 2].includes(this.semester);
  }

  hasValidTotalLessons(){
    return this.totalLessons >= 0;
  }

  // calcula e retorna a media a partir das avaliações das disciplinas
  // media ponderada
  get average(): number {
    // se ainda não houver alguma avaliacao ele retorna 0 
    if (this.assessments.length === 0) return 0;

    // soma os pesos para a media ponderada
    const totalWeight = this.assessments.reduce(
      (sum, assessmentAtual) => sum + assessmentAtual.weight, 0
    );
    // multiplica os pesos com cada avaliação
    const weightedSum = this.assessments.reduce(
      (sum, assessmentAtual) => sum + assessmentAtual.grade * assessmentAtual.weight, 0
    );
    
    return weightedSum / totalWeight;
  }

  get concept(): string {
    const avg = this.average;

    if (avg >= 9) return "A";
    if (avg >= 7.5) return "B";
    if (avg >= 6) return "C";
    return "D";
  }
}

import { Assessment } from "./Assessment.ts";
import { SubjectType } from "@prisma/client"

export type AssessmentProps = {
  grade: number
  weight: number
}

export type SubjectProps = {
  id: number | null
  name: string
  credits: number
  year: number
  semester: number
  status: string
  id_user: number
  totalAssessments: number
  assessments: AssessmentProps[]
  type : SubjectType
}

export class Subject {
  public assessments: Assessment[] = [];

  private constructor(private props: SubjectProps) {
    this.assessments = props.assessments.map((a, index) =>
      new Assessment(
        index + 1,
        props.id ?? 0,
        `Assessment ${index + 1}`,
        a.grade,
        a.weight
      )
    );
  }

  get id() { return this.props.id }
  get name() { return this.props.name }
  get credits() { return this.props.credits }
  get year() { return this.props.year }
  get semester() { return this.props.semester }
  get status() { return this.props.status }
  get id_user() { return this.props.id_user }
  get totalAssessments() { return this.props.totalAssessments }
  get assessmentsData() { return this.props.assessments }
  get type() { return this.props.type }

  static create(props: Omit<SubjectProps, "id">): Subject {
    const subject = new Subject({
      ...props,
      id: null
    });

    subject.validate();
    return subject;
  }

  static restore(props: SubjectProps): Subject {
    return new Subject(props)
  }

  private validate(): void {
    const currentYear = new Date().getFullYear();

    if (![2, 4, 6].includes(this.credits)) {
      throw new Error("Numero de creditos invalido.");
    }

    if (![1, 2].includes(this.semester)) {
      throw new Error("Adicione um semestre valido (1) ou (2).");
    }

    if (typeof this.name !== "string" || this.name.trim().length === 0) {
      throw new Error("Nome invalido.");
    }

    if (!["CONCLUIDA", "EM ANDAMENTO", "PLANEJADA"].includes(this.status)) {
      throw new Error("Status invalido.");
    }

    if (this.year > currentYear || this.year < 2000) {
      throw new Error("Ano invalido");
    }

    if (!this.assessments || this.assessments.length === 0) {
      throw new Error("A disciplina precisa ter pelo menos uma avaliação.");
    }

    const totalWeight = this.assessments.reduce(
      (sum, a) => sum + a.weight,
      0
    );

    if (Math.abs(totalWeight - 10) > 0.01) {
      throw new Error("A soma dos pesos deve ser 10.");
    }
  }

  get average(): number {
    if (this.assessments.length === 0) return 0;

    const totalWeight = this.assessments.reduce(
      (sum, a) => sum + a.weight,
      0
    );

    const weightedSum = this.assessments.reduce(
      (sum, a) => sum + a.grade * a.weight,
      0
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

import { SubjectRepository

 } from "../../../domain/repositories/subjects.repository.ts";
export class GetSubjectConceptUseCase {

  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number) {

    const subject = await this.subjectRepository.findById(id);

    if (!subject) {
      throw new Error("Disciplina não encontrada");
    }

    return {
      id: subject.id,
      name: subject.name,
      average: subject.average,
      concept: subject.concept
    };
  }
}

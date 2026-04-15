import { SubjectRepository } from "../../../domain/repositories/subjects.repository.ts";

export class GetSubjectByIdUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const subject = await this.subjectRepository.findById(id);

    if (!subject) {
      throw new Error("Disciplina não encontrada");
    }

    return subject;
  }
}

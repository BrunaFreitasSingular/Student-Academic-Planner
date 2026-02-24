import { SubjectRepository } from "../../domain/repositories/subjects.repository.js";

export class DeleteSubjectUseCase {

  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number) {

    if (!id) {
      throw new Error("ID é obrigatório");
    }

    await this.subjectRepository.deleteById(id);
  }
}

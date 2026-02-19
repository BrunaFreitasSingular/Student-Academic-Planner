import { SubjectRepository } from "../../domain/repositories/subjects.repository.js";
import { CreateSubjectDTO } from "../../domain/entities/Subjects.js";

export class UpdateSubjectUseCase {

  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number, data: CreateSubjectDTO) {

    if (!id) {
      throw new Error("ID é obrigatório");
    }

    return this.subjectRepository.update(id, data);
  }
}

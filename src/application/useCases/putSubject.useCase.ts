import { SubjectRepository } from "../../domain/repositories/subjects.repository.js";
import type { CreateSubjectDTO } from "../../application/dtos/Subject.DTO/CreateSubjectDTO.ts";

export class UpdateSubjectUseCase {

  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number, data: CreateSubjectDTO) {

    if (!id) {
      throw new Error("ID é obrigatório");
    }

    return this.subjectRepository.update(id, data);
  }
}

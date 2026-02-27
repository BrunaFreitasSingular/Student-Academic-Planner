import { SubjectRepository } from "../../domain/repositories/subjects.repository.js";
import { UpdateSubjectDTO } from "../dtos/Subject.DTO/UpdateSubjectDTO.ts";

export class UpdateSubjectUseCase {

  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number, data: UpdateSubjectDTO) {

    if (!id) {
      throw new Error("ID é obrigatório");
    }

    // Validações de negócio básicas
    if (!data.name) {
      throw new Error("Nome é obrigatório");
    }

    if (![2, 4, 6].includes(data.credits)) {
      throw new Error("Número de créditos inválido");
    }

    if (![1, 2].includes(data.semester)) {
      throw new Error("Semestre inválido");
    }

    return this.subjectRepository.update(id, data);
  }
}
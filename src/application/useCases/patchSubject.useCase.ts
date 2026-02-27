import { SubjectRepository } from "../../domain/repositories/subjects.repository.js";
import { UpdateSubjectDTO } from "../dtos/Subject.DTO/PartialUpdateSubjectDTO.ts";

export class PatchSubjectUseCase {

  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number, data: UpdateSubjectDTO) {

    if (!id) {
      throw new Error("ID é obrigatório");
    }

    if (Object.keys(data).length === 0) {
      throw new Error("Nenhum campo enviado para atualização");
    }

    // Validações de negócio opcionais
    if (data.credits && ![2,4,6].includes(data.credits)) {
      throw new Error("Número de créditos inválido");
    }

    if (data.semester && ![1,2].includes(data.semester)) {
      throw new Error("Semestre inválido");
    }

    return this.subjectRepository.update(id, data);
  }
}
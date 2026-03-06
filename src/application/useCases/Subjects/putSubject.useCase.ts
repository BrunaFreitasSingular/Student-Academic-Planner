import { SubjectRepository } from "../../../domain/repositories/subjects.repository.ts";
import type { CreateSubjectDTO } from "../../dtos/SubjectDTO.ts";

export class UpdateSubjectUseCase {

  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number, data: CreateSubjectDTO) {

    if (!id) {
      throw new Error("ID é obrigatório");
    }
    if (
      !data.name ||
      !data.credits ||
      !data.year ||
      !data.semester ||
      !data.status ||
      !data.id_user ||
      !data.totalAssessments ||
      !data.assessmentsWeights
    ) {
      throw new Error("Todos os campos são obrigatórios no PUT");
    }

    return this.subjectRepository.update(id, data);
  }
}

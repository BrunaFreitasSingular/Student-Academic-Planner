import { SubjectRepository } from "../../../domain/repositories/subjects.repository.ts";
import type { CreateSubjectDTO } from "../../dtos/SubjectDTO.ts";

export class PatchSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number, data: Partial<CreateSubjectDTO>) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    if (Object.keys(data).length === 0) {
      throw new Error("Nenhum campo enviado para atualização");
    }

    return this.subjectRepository.update(id, data);
  }
}

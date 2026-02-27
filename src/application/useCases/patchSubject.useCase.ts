import { SubjectRepository } from "../../domain/repositories/subjects.repository.js";
import { CreateSubjectDTO } from "../../domain/entities/Subject.js";

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

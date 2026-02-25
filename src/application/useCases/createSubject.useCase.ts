import { Subject } from "../../domain/entities/Subject.js";
import { SubjectRepository } from "../../domain/repositories/subjects.repository.ts";
import { CreateSubjectDTO } from "../dtos/CreateSubjectDTO.js";

export class CreateSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(data: CreateSubjectDTO) {

    const subject = new Subject(
      null,
      data.name,
      data.credits,
      data.year,
      data.semester,
      data.status
    );

    if (!subject.name) {
      throw new Error("Nome é obrigatório");
    }

    if (!subject.isValidCredits()) {
      throw new Error("Número de créditos inválido");
    }

    if (!subject.isValidSemester()) {
      throw new Error("Semestre inválido");
    }

    return this.subjectRepository.create(subject);
  }
}
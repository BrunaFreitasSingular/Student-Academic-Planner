import { SubjectRepository } from "../../../domain/repositories/subjects.repository.ts";

export class ListSubjectsUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id_student: number) {
    return this.subjectRepository.findByStudentId(id_student);
  }
}
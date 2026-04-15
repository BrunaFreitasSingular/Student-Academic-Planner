import { StudentRepository } from "../../../domain/repositories/student.repository.ts";

export class ListStudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute() {
    return this.studentRepository.findAll();
  }
}

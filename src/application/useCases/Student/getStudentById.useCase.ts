import { StudentRepository } from "../../../domain/repositories/student.repository.ts";

export class getStudentByIdUseCase {

  constructor(private studentRepository: StudentRepository) {}

  async execute(id: number) {

    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new Error("Student not found");
    }

    return student;
  }
}
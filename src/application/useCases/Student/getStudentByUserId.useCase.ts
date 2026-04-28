import type { StudentRepository } from "../../../domain/repositories/student.repository.ts";

export class GetStudentByUserIdUseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(user_id: string) {
    const student = await this.studentRepository.findByUserId(user_id);

    if (!student) {
      throw new Error("Student not found");
    }

    return student;
  }
}

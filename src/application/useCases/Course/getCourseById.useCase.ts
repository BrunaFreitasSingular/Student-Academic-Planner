import { CourseRepository } from "../../../domain/repositories/course.repository.ts";

export class getCourseByIdUseCase {
  constructor(private studentRepository: CourseRepository) {}

  async execute(id: number) {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new Error("Course not found");
    }

    return student;
  }
}

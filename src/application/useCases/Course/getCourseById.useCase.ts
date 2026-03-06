import { CourseRepository } from "../../../domain/repositories/course.repository.ts";

export class getCourseByIdUseCase {

  constructor(private userRepository: CourseRepository) {}

  async execute(id: number) {

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Course not found");
    }

    return user;
  }
}
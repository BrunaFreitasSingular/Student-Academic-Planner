import { CourseRepository } from "../../../domain/repositories/course.repository.ts";
import { CreateCourseDTO } from "../../dtos/CourseDTO.ts";
import { Course } from "../../../domain/entities/Course.ts";

export class CreateCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(data: CreateCourseDTO): Promise<Course> {
    const course = Course.create(data);

    return await this.courseRepository.create(course);
  }
}

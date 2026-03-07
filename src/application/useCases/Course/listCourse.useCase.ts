import { CourseRepository } from "../../../domain/repositories/course.repository.ts";

export class ListCourseUseCase {

  constructor(private subjectRepository: CourseRepository) {}

    async execute() {
      return this.subjectRepository.findAll();
    }
}

import { Progress } from "../../../domain/entities/Progress.ts";
import { UserRepository } from "../../../domain/repositories/users.repository.ts";
import { SubjectRepository } from "../../../domain/repositories/subjects.repository.ts"
import { CourseRepository } from "../../../domain/repositories/course.repository.ts";

export class getProgressByUserIdUseCase {

  constructor(
    private userRepository: UserRepository,
    private subjectRepository: SubjectRepository,
    private courseRepository: CourseRepository
  ) {}

  async execute(user_id: number) {

    // busca usuario
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error("Usuario nao encontrado.");
    }

    // busca disciplinas do usuario
    const subjects = await this.subjectRepository.findByUserId(user_id);

    // busca curso do usuario
    const course = await this.courseRepository.findById(user.course_id);

    if (!course) {
      throw new Error("Curso nao encontrado.");
    }

    const progress = new Progress(subjects);

    return {
      completedRequiredCredits: progress.completedCredits,
      percentage: progress.calculatePercentage(course.requiredCredits),
      totalRequiredCredits: course.requiredCredits
    };
  }
}
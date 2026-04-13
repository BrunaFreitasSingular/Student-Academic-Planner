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

    if (subjects.length === 0) {
  return {
    completedRequiredCredits: 0,
    finishedPercentage: 0,
    requiredPercentage: 0,
    electivePercentage: 0,
    complementary: 0,
    totalRequiredCredits: course.requiredCredits,
    totalSubjects: 0
    }
  }else{
      return {
        completedRequiredCredits: progress.completedCredits,
        //general progress
        finishedPercentage: progress.calculatePercentage(progress.completedCredits, course.requiredCredits),
        //required
        requiredPercentage: progress.calculatePercentage(progress.requiredSubject, course.requiredCredits),
        //eletive
        electivePercentage: progress.calculatePercentage(progress.electiveSubject, course.electiveCredits),
        //complementary
        complementary: progress.calculatePercentage(progress.complementarySubject, course.complementaryCredits),
        totalRequiredCredits: course.requiredCredits,
        totalSubjects: progress.SubjectsTotal,
        progressUser_id: user.course_id,
        progressCourse_id: course.id
      };
    }
  }
}
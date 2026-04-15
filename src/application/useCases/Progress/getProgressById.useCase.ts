import { Progress } from "../../../domain/entities/Progress.ts";
import { StudentRepository } from "../../../domain/repositories/student.repository.ts";
import { SubjectRepository } from "../../../domain/repositories/subjects.repository.ts";
import { CourseRepository } from "../../../domain/repositories/course.repository.ts";

export class getProgressByStudentIdUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private subjectRepository: SubjectRepository,
    private courseRepository: CourseRepository,
  ) {}

  async execute(student_id: number) {
    // busca usuario
    const student = await this.studentRepository.findById(student_id);

    if (!student) {
      throw new Error("Usuario nao encontrado.");
    }

    // busca disciplinas do usuario
    const subjects = await this.subjectRepository.findByStudentId(student_id);

    // busca curso do usuario
    const course = await this.courseRepository.findById(student.course_id);

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
        totalSubjects: 0,
      };
    } else {
      return {
        completedRequiredCredits: progress.completedCredits,
        //general progress
        finishedPercentage: progress.calculatePercentage(
          progress.completedCredits,
          course.requiredCredits,
        ),
        //required
        requiredPercentage: progress.calculatePercentage(
          progress.requiredSubject,
          course.requiredCredits,
        ),
        //eletive
        electivePercentage: progress.calculatePercentage(
          progress.electiveSubject,
          course.electiveCredits,
        ),
        //complementary
        complementary: progress.calculatePercentage(
          progress.complementarySubject,
          course.complementaryCredits,
        ),
        totalRequiredCredits: course.requiredCredits,
        totalSubjects: progress.SubjectsTotal,
        progressStudent_id: student.course_id,
        progressCourse_id: course.id,
      };
    }
  }
}

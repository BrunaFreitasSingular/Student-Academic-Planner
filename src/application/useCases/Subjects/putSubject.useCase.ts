import {
  SubjectRepository,
  SubjectUpdateData,
} from "../../../domain/repositories/subjects.repository.ts";
import type { CreateSubjectDTO } from "../../dtos/SubjectDTO.ts";

export class UpdateSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(id: number, data: CreateSubjectDTO & { grades: number[] }) {
    if (!id) throw new Error("ID é obrigatório");

    if (
      !data.name ||
      !data.credits ||
      !data.year ||
      !data.semester ||
      !data.status ||
      !data.id_student ||
      !data.grades
    ) {
      throw new Error("Todos os campos são obrigatórios no PUT");
    }

    const updateData: SubjectUpdateData = {
      name: data.name,
      credits: data.credits,
      year: data.year,
      semester: data.semester,
      status: data.status,
      id_student: data.id_student,
      totalAssessments: data.totalAssessments,
      type: data.type,
      assessments: data.grades.map((grade, i) => ({
        grade,
        weight: data.assessmentsWeights?.[i] ?? 1,
      })),
    };

    return this.subjectRepository.update(id, updateData);
  }
}

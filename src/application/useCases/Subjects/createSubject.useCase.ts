import { SubjectRepository } from "../../../domain/repositories/subjects.repository.js"

import type { CreateSubjectDTO } from "../../dtos/SubjectDTO.ts";

import { Subject } from "../../../domain/entities/Subject.ts";

export class CreateSubjectUseCase {
  constructor(private subjectRepository: SubjectRepository) {}

    async execute(data: CreateSubjectDTO): Promise<Subject> {

    const subject = Subject.create({
      ...data,
      assessments: data.assessmentsWeights.map(weight => ({
        grade: 0,
        weight
      }))
    });

    return this.subjectRepository.create(subject);
  }
}

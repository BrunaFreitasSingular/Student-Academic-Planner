import { SubjectRepository } from "../../../domain/repositories/subjects.repository.ts";

export class ListSubjectsUseCase {

  constructor(private subjectRepository: SubjectRepository) {}

    async execute() {
      return this.subjectRepository.findAll();
    }
}

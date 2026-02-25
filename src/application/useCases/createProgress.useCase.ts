import { Progress } from "../../domain/entities/Progress.js";
import { ProgressRepository } from "../../domain/repositories/progress.repository.js";

interface CreateProgressInput {
  subjectId: number;
  completedLessons: number;
  totalLessons: number;
}

export class CreateProgressUseCase {

  constructor(private progressRepository: ProgressRepository) {}

  async execute(data: CreateProgressInput): Promise<Progress> {

    if (!data.subjectId) {
      throw new Error("SubjectId is required");
    }

    if (data.completedLessons > data.totalLessons) {
      throw new Error("Completed lessons cannot exceed total lessons");
    }

    const progress = new Progress(
      null,
      data.subjectId,
      data.completedLessons,
      data.totalLessons
    );

    return this.progressRepository.create(progress);
  }
}
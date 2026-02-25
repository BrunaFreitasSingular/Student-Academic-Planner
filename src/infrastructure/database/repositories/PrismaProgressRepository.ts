import { prisma } from "../prismaClient.js";
import { Progress } from "../../../domain/entities/Progress.js";
import { ProgressRepository } from "../../../domain/repositories/progress.repository.js";

export class PrismaProgressRepository implements ProgressRepository {

  async create(progress: Progress): Promise<Progress> {

    const created = await prisma.progress.create({
      data: {
        subjectId: progress.subjectId,
        completedLessons: progress.completedLessons,
        totalLessons: progress.totalLessons
      }
    });

    return new Progress(
      created.id,
      created.subjectId,
      created.completedLessons,
      created.totalLessons
    );
  }

  async findAll(): Promise<Progress[]> {

    const list = await prisma.progress.findMany();

    return list.map(item =>
      new Progress(
        item.id,
        item.subjectId,
        item.completedLessons,
        item.totalLessons
      )
    );
  }

  async findById(id: number): Promise<Progress | null> {

    const found = await prisma.progress.findUnique({
      where: { id }
    });

    if (!found) return null;

    return new Progress(
      found.id,
      found.subjectId,
      found.completedLessons,
      found.totalLessons
    );
  }

  async update(progress: Progress): Promise<Progress> {

    if (!progress.id) {
      throw new Error("Progress ID is required for update");
    }

    const updated = await prisma.progress.update({
      where: { id: progress.id },
      data: {
        subjectId: progress.subjectId,
        completedLessons: progress.completedLessons,
        totalLessons: progress.totalLessons
      }
    });

    return new Progress(
      updated.id,
      updated.subjectId,
      updated.completedLessons,
      updated.totalLessons
    );
  }

  async deleteById(id: number): Promise<void> {
    await prisma.progress.delete({
      where: { id }
    });
  }
}
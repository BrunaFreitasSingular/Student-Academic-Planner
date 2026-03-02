import { prisma } from "../prismaClient.ts";
import { Subject } from "../../../domain/entities/Subject.js";
import { SubjectRepository } from "../../../domain/repositories/subjects.repository.js";

export class PrismaSubjectRepository implements SubjectRepository {

  async create(subject: Subject): Promise<Subject> {
    const created = await prisma.subject.create({
      data: {
        name: subject.name,
        credits: subject.credits,
        year: subject.year,
        semester: subject.semester,
        status: subject.status,
        id_user: subject.id_user,
        totalLessons: subject.totalLessons
      }
    });

    return new Subject(
      created.id,
      created.name,
      created.credits,
      created.year,
      created.semester,
      created.status,
      created.id_user,
      created.totalLessons
    );
  }

  async findAll(): Promise<Subject[]> {
    const subjects = await prisma.subject.findMany();

    return subjects.map(s =>
      new Subject(
        s.id,
        s.name,
        s.credits,
        s.year,
        s.semester,
        s.status,
        s.id_user,
        s.totalLessons
      )
    );
  }

  async update(id: number, data: Partial<Subject>): Promise<Subject> {
  const updated = await prisma.subject.update({
    where: { id },
    data: {
      name: data.name,
      credits: data.credits,
      year: data.year,
      semester: data.semester,
      status: data.status
    }
  });

  return new Subject(
    updated.id,
    updated.name,
    updated.credits,
    updated.year,
    updated.semester,
    updated.status,
    updated.id_user,
    updated.totalLessons
  );
}

  async partialUpdate(id: number, data: Partial<Subject>): Promise<Subject> {

    const updated = await prisma.subject.update({
      where: { id },
      data: {
        name: data.name,
        credits: data.credits,
        year: data.year,
        semester: data.semester,
        status: data.status,
        totalLessons: data.totalLessons
      }
    });

    return new Subject(
      updated.id,
      updated.name,
      updated.credits,
      updated.year,
      updated.semester,
      updated.status,
      updated.id_user,
      updated.totalLessons
    );
  }

  async deleteById(id: number): Promise<void> {
    await prisma.subject.delete({
      where: { id }
    });
  }
}
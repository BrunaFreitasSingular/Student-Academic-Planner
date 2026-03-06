import { prisma } from "../prismaClient.js";
import { Subject, SubjectProps } from "../../../domain/entities/Subject.js";
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
        totalAssessments: subject.assessments.length,
        assessments: {
          create: subject.assessments.map(a => ({
            title: a.title,
            grade: a.grade,
            weight: a.weight
          }))
        }
      },
      include: {
        assessments: true
      }
    });

    return Subject.restore({
      id: created.id,
      name: created.name,
      credits: created.credits,
      year: created.year,
      semester: created.semester,
      status: created.status,
      id_user: created.id_user,
      totalAssessments: created.totalAssessments,
      assessmentsWeights: created.assessments.map(a => a.weight)
    });
  }

  async findAll(): Promise<Subject[]> {
    const subjects = await prisma.subject.findMany({
      include: { assessments: true }
    });

    return subjects.map(s =>
      Subject.restore({
        id: s.id,
        name: s.name,
        credits: s.credits,
        year: s.year,
        semester: s.semester,
        status: s.status,
        id_user: s.id_user,
        totalAssessments: s.totalAssessments,
        assessmentsWeights: s.assessments.map(a => a.weight)
      })
    );
  }

  async update(id: number, data: Partial<Omit<SubjectProps, "id">>): Promise<Subject> {

  const updated = await prisma.subject.update({
    where: { id },
    data: {
      name: data.name,
      credits: data.credits,
      year: data.year,
      semester: data.semester,
      status: data.status,

      id_user: data.id_user,

      totalAssessments: data.totalAssessments,

      assessments: data.assessmentsWeights
        ? {
            deleteMany: {},
            create: data.assessmentsWeights.map(weight => ({
              title: "Assessment",
              grade: 0,
              weight
            }))
          }
        : undefined
    },
    include: {
      assessments: true
    }
  });

  return Subject.restore({
    id: updated.id,
    name: updated.name,
    credits: updated.credits,
    year: updated.year,
    semester: updated.semester,
    status: updated.status,
    id_user: updated.id_user,
    totalAssessments: updated.totalAssessments,
    assessmentsWeights: updated.assessments.map(a => a.weight)
  });
}

  async deleteById(id: number): Promise<void> {
    await prisma.subject.delete({
      where: { id }
    });
  }
}
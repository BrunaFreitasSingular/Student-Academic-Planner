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
        id_student: subject.id_student,
        totalAssessments: subject.assessments.length,
        assessments: {
          create: subject.assessments.map(a => ({
            title: a.title,
            grade: a.grade,
            weight: a.weight
          }))
        },
        type: subject.type
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
      id_student: created.id_student,
      totalAssessments: created.totalAssessments,
      assessments: created.assessments.map(a => ({
        grade: a.grade,
        weight: a.weight
      })),
      type: subject.type
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
        id_student: s.id_student,
        totalAssessments: s.totalAssessments,
        assessments: s.assessments.map(a => ({
          grade: a.grade,
          weight: a.weight
        })),
        type: s.type
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

        id_student: data.id_student,

        totalAssessments: data.totalAssessments,

        assessments: data.assessments
        ? {
            deleteMany: {},
            create: data.assessments.map(a => ({
              title: "Assessment",
              grade: a.grade,
              weight: a.weight
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
    id_student: updated.id_student,
    totalAssessments: updated.totalAssessments,
    assessments: updated.assessments.map(a => ({
      grade: a.grade,
      weight: a.weight
    })),
    type: updated.type
  });
}
// busca as disciplinas de cada usuário, para fazer as metricas de progresso
  async deleteById(id: number): Promise<void> {
    await prisma.subject.delete({
      where: { id }
    });
  }

  async findByStudentId(student_id: number): Promise<Subject[]> {
    const subjects = await prisma.subject.findMany({
      where: {
        id_student: student_id
      },
      include: {
        assessments: true
      }
    });

    return subjects.map(subject =>
      Subject.restore({
        id: subject.id,
        name: subject.name,
        credits: subject.credits,
        year: subject.year,
        semester: subject.semester,
        status: subject.status,
        id_student: subject.id_student,
        totalAssessments: subject.totalAssessments,
        assessments: subject.assessments.map(a => ({
          grade: a.grade,
          weight: a.weight
        })),
        type: subject.type
    })
  );
  }
  async findById(id: number): Promise<Subject | null> {

  const subject = await prisma.subject.findUnique({
    where: { id },
    include: {
      assessments: true
    }
  });

  if (!subject) return null;

  return Subject.restore({
    id: subject.id,
    name: subject.name,
    credits: subject.credits,
    year: subject.year,
    semester: subject.semester,
    status: subject.status,
    id_student: subject.id_student,
    totalAssessments: subject.totalAssessments,
    assessments: subject.assessments.map(a => ({
      grade: a.grade,
      weight: a.weight
    })),
    type: subject.type
  });
}
}

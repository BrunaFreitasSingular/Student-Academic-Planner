import { prisma } from "../prismaClient.ts";
import { Student } from "../../../domain/entities/Student.ts";
import { StudentRepository } from "../../../domain/repositories/student.repository.ts";

export class PrismaStudentRepository implements StudentRepository {
  async create(student: Student): Promise<Student> {
    const created = await prisma.student.create({
      data: {
        user_id: student.user_id,
        name: student.name,
        course_id: student.course_id,
        semester: student.semester,
      },
    });

    return Student.restore({
      id: created.id,
      user_id: created.user_id,
      name: created.name,
      course_id: created.course_id,
      semester: created.semester,
    });
  }

  async findAll(): Promise<Student[]> {
    const student = await prisma.student.findMany();
    return student.map((u) =>
      Student.restore({
        id: u.id,
        user_id: u.user_id,
        name: u.name,
        course_id: u.course_id,
        semester: u.semester,
      }),
    );
  }

  async findById(id: number): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) return null;

    return Student.restore({
      id: student.id,
      user_id: student.user_id,
      name: student.name,
      semester: student.semester,
      course_id: student.course_id,
    });
  }

  async findByName(name: string): Promise<Student | null> {
    const student = await prisma.student.findFirst({
      where: { name },
    });

    if (!student) return null;

    return Student.restore({
      id: student.id,
      user_id: student.user_id,
      name: student.name,
      course_id: student.course_id,
      semester: student.semester,
    });
  }

  async findByUserId(user_id: string): Promise<Student | null> {
    const student = await prisma.student.findFirst({
      where: { user_id },
    });

    if (!student) return null;

    return Student.restore({
      id: student.id,
      user_id: student.user_id,
      name: student.name,
      course_id: student.course_id,
      semester: student.semester,
    });
  }
}

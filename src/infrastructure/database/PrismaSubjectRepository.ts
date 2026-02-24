import { prisma } from "../../prismaClient.js";
import { SubjectRepository } from "../../domain/repositories/subjects.repository.js";

import { CreateSubjectDTO } from "../../domain/entities/Subjects.js";


export class PrismaSubjectRepository implements SubjectRepository {

  async create(data: CreateSubjectDTO) {
    return prisma.subject.create({ data });
  }

  async findAll() {
    return prisma.subject.findMany();
  }

  async update(id: number, data: CreateSubjectDTO) {
    return prisma.subject.update({
      where: { id },
      data
    });
  }

  async partialUpdate(id: number, data: Partial<CreateSubjectDTO>) {
  return prisma.subject.update({
    where: { id },
    data
  });
}


  async deleteById(id: number) {
    await prisma.subject.delete({
      where: { id }
    });
  }
}

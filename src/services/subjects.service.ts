import { prisma } from "../prismaClient.js";
import type { CreateSubjectDTO, UpdateSubjectDTO } from "../models/Subjects.js";

export async function createSubject(data: CreateSubjectDTO) {
  return prisma.subject.create({ data });
}

export async function listSubjects() {
  return prisma.subject.findMany();
}

export async function updateSubject(id: number, data: CreateSubjectDTO) {
  return prisma.subject.update({
    where: { id },
    data
  });
}

export async function patchSubject(id: number, data: UpdateSubjectDTO) {
  return prisma.subject.update({
    where: { id },
    data
  });
}

export async function deleteSubject(id: number) {
  return prisma.subject.delete({
    where: { id }
  });
}

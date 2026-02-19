import { prisma } from "../../prismaClient.js"

import { CreateSubjectDTO } from "../entities/Subjects.js";

export async function create(data: CreateSubjectDTO){
    return prisma.subject.create({ data })
}

export async function deleteById(id: number){
    return prisma.subject.delete({
        where: { id }
    })
}

export async function findAll() {
  return prisma.subject.findMany();
}

export async function update(id: number, data: Partial<CreateSubjectDTO>) {
  return prisma.subject.update({
    where: { id },
    data
  });
}
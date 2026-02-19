import { prisma } from "../../prismaClient.js";
import type { CreateSubjectDTO } from "../../domain/entities/Subjects.js";



export async function countSubject(id: number, data: CreateSubjectDTO) {
    const total = await prisma.subject.count();
    
}
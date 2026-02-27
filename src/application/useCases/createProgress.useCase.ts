import { prisma } from "../../infrastructure/database/prismaClient.js";
import type { CreateSubjectDTO } from "../../domain/entities/Subject.js";



export async function countSubject(id: number, data: CreateSubjectDTO) {
    const total = await prisma.subject.count();
    
}
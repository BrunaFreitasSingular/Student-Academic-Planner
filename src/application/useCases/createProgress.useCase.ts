import { prisma } from "../../infrastructure/database/prismaClient.js";
import type { CreateSubjectDTO } from "../../application/dtos/Subject.DTO/CreateSubjectDTO.ts";



export async function countSubject(id: number, data: CreateSubjectDTO) {
    const total = await prisma.subject.count();
    
}
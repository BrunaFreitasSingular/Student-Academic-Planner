import { prisma } from "../../../infrastructure/database/prismaClient.ts";
import type { CreateSubjectDTO } from "../../dtos/SubjectDTO.ts";



export async function countSubject(id: number, data: CreateSubjectDTO) {
    const total = await prisma.subject.count();
    
}
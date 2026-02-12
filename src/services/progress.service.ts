import { prisma } from "../prismaClient.js";
import type { CreateSubjectDTO, UpdateSubjectDTO } from "../models/Subjects.js";



export async function countSubject(id: number, data: CreateSubjectDTO) {
    const total = await prisma.subject.count();
    
}
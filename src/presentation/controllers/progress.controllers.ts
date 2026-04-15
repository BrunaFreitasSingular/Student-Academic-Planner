import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaSubjectRepository } from "../../infrastructure/database/repositories/PrismaSubjectRepository.ts";
import { PrismaStudentRepository } from "../../infrastructure/database/repositories/PrismaStudentRepository.ts";
import { PrismaCourseRepository } from "../../infrastructure/database/repositories/PrismaCourseRepository.ts";
import { getProgressByStudentIdUseCase } from "../../application/useCases/Progress/getProgressById.useCase.ts"

export async function getProgressByStudentIdController(
  req: FastifyRequest<{ Params: { student_id: number } }>,
  reply: FastifyReply
) {

  const studentId = Number(req.params.student_id);
  const studentRepository = new PrismaStudentRepository();
  const subjectRepository = new PrismaSubjectRepository();
  const courseRepository = new PrismaCourseRepository();

  const useCase = new getProgressByStudentIdUseCase(
    studentRepository,
    subjectRepository,
    courseRepository
  );

  const progress = await useCase.execute(studentId);

  return reply.send(progress);
}
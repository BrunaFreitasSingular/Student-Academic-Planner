import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaSubjectRepository } from "../../infrastructure/database/repositories/PrismaSubjectRepository.ts";
import { PrismaStudentRepository } from "../../infrastructure/database/repositories/PrismaStudentRepository.ts";
import { PrismaCourseRepository } from "../../infrastructure/database/repositories/PrismaCourseRepository.ts";
import { getProgressByStudentIdUseCase } from "../../application/useCases/Progress/getProgressById.useCase.ts";

export async function getProgressController(
  req: FastifyRequest<{ Querystring: { user_id?: string } }>,
  reply: FastifyReply,
) {
  const user_id = req.query.user_id;
  if (!user_id) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "user_id é obrigatório",
    });
  }

  const studentRepository = new PrismaStudentRepository();
  const subjectRepository = new PrismaSubjectRepository();
  const courseRepository = new PrismaCourseRepository();

  const student = await studentRepository.findByUserId(user_id);
  if (!student) {
    return reply.status(404).send({
      statusCode: 404,
      error: "Not Found",
      message: "Estudante não encontrado.",
    });
  }

  const useCase = new getProgressByStudentIdUseCase(
    studentRepository,
    subjectRepository,
    courseRepository,
  );

  const progress = await useCase.execute(Number(student.id));

  return reply.send(progress);
}

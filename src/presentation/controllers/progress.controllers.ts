import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaSubjectRepository } from "../../infrastructure/database/repositories/PrismaSubjectRepository.ts";
import { PrismaStudentRepository } from "../../infrastructure/database/repositories/PrismaStudentRepository.ts";
import { PrismaCourseRepository } from "../../infrastructure/database/repositories/PrismaCourseRepository.ts";
import { getProgressByStudentIdUseCase } from "../../application/useCases/Progress/getProgressById.useCase.ts";

export async function getProgressByStudentIdController(
  req: FastifyRequest<{ Params: { user_id: string } }>,
  reply: FastifyReply,
) {
  const user_id = req.params.user_id;

  
  const studentRepository = new PrismaStudentRepository();
  const subjectRepository = new PrismaSubjectRepository();
  const courseRepository = new PrismaCourseRepository();


  const student = await studentRepository.findByUserId(user_id)
  if (!student) {
      return reply.status(404).send({ error: "Estudante não encontrado." })
    }
  const useCase = new getProgressByStudentIdUseCase(
    studentRepository,
    subjectRepository,
    courseRepository,
  );

  const progress = await useCase.execute(Number(student.id));

  console.log("USER_ID RECEBIDO:", user_id);
 console.log("STUDENT:", student);
 
  return reply.send(progress);
}

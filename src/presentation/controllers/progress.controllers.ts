import { prisma } from "../../infrastructure/database/prismaClient.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaSubjectRepository } from "../../infrastructure/database/repositories/PrismaSubjectRepository.ts";
import { PrismaUserRepository } from "../../infrastructure/database/repositories/PrismaUserRepository.ts";
import { PrismaCourseRepository } from "../../infrastructure/database/repositories/PrismaCourseRepository.ts";
import { getProgressByUserIdUseCase } from "../../application/useCases/Progress/getProgressById.useCase.ts"


export async function metrics(_: FastifyRequest, reply: FastifyReply){
    const total = await prisma.subject.count();
    console.log("Total de disciplinas" + total)

    const concluidas = await prisma.subject.count({
      where: { status: "CONCLUIDA" }
    });

    const emAndamento = await prisma.subject.count({
      where: { status: "EM ANDAMENTO" }
    });

    const planejadas = await prisma.subject.count({
      where: { status: "PLANEJADA" }
    });

    const percentual =
      total === 0 ? 0 : Math.round((concluidas / total) * 100);

    return {
      total,
      concluidas,
      emAndamento,
      planejadas,
      percentual
    };
}
export async function getProgressByUserIdController(
  req: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {

  const userId = Number(req.params.userId);
  const userRepository = new PrismaUserRepository();
  const subjectRepository = new PrismaSubjectRepository();
  const courseRepository = new PrismaCourseRepository();

  const useCase = new getProgressByUserIdUseCase(
    userRepository,
    subjectRepository,
    courseRepository
  );

  const progress = await useCase.execute(userId);

  return reply.send(progress);
}
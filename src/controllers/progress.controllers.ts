import { prisma } from "../prismaClient.js";
import type { FastifyReply, FastifyRequest } from "fastify";


export async function metrics(_: FastifyRequest, reply: FastifyReply){
    const total = await prisma.subject.count();
    console.log("Total de disciplinas" + total)

    const concluidas = await prisma.subject.count({
      where: { status: "Concluída" }
    });

    const emAndamento = await prisma.subject.count({
      where: { status: "Cursando" }
    });

    const planejadas = await prisma.subject.count({
      where: { status: "Planejada" }
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

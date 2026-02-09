import { FastifyInstance } from "fastify";
import { prisma } from "../prismaClient.js";


//Visao geral do progresso
export async function gradesRoutes(app: FastifyInstance) {

  app.get("/", async () => {

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
  });

}

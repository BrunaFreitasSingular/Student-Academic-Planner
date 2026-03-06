import { FastifyInstance } from "fastify";
import * as progressController from "../controllers/progress.controllers.js"
import { getProgressByUserIdController } from "../controllers/progress.controllers.ts"

export async function progressRoutes(app: FastifyInstance) {
  app.get("/", progressController.metrics);
  app.get("/:userId", getProgressByUserIdController);
}

import { FastifyInstance } from "fastify";
import * as progressController from "../controllers/progress.controllers.js"

export async function progressRoutes(app: FastifyInstance) {
  app.get("/", progressController.metrics);
}

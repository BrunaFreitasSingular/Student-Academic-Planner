import type { FastifyInstance } from "fastify";
import * as progressController from "../controllers/progress.controllers.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { JwtTokenService } from "../../infrastructure/auth/JwtTokenService.ts";

export async function progressRoutes(app: FastifyInstance) {
  app.addHook(
    "preHandler",
    authMiddleware(new JwtTokenService(process.env.JWT_SECRET!)),
  );
  app.get("/", progressController.getProgressController);
}

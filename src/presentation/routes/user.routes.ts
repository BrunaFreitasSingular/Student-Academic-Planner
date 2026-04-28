import type { FastifyInstance } from "fastify";

import * as userController from "../controllers/user.controllers.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { JwtTokenService } from "../../infrastructure/auth/JwtTokenService.ts";

export async function userRoutes(app: FastifyInstance) {
  app.addHook(
    "preHandler",
    authMiddleware(new JwtTokenService(process.env.JWT_SECRET!)),
  );
  app.get("/", userController.listUsersController);
}

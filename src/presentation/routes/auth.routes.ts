import type { FastifyInstance } from "fastify";

import * as authController from "../controllers/auth.controllers.ts";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", authController.loginController);
  app.post("/register", authController.registerController);
}

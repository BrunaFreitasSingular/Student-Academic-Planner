import { FastifyInstance } from "fastify";
import { loginService } from "../../application/useCases/Auth/auth.service.ts";

import * as loginController from "../controllers/login.controllers.ts";

export async function loginRoutes(app: FastifyInstance) {
  app.post("/", loginController.createLoginController);
}
